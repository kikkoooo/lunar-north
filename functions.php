<?php
	
	// Add RSS links to <head> section
	automatic_feed_links();
	
	// Load jQuery
	if ( !is_admin() ) {
		
		$url = get_stylesheet_directory_uri() . '/scripts/';

		
		wp_deregister_script('jquery');
		wp_register_script('jquery', ($url.'jquery.min.js'), true, '2.0.0', true );
		wp_register_script('jquery-ui', ($url.'jquery-ui.min.js'), true, '', true );

		wp_enqueue_script('jquery');
		//	   wp_enqueue_script('jquery-ui');


		wp_enqueue_script('google-maps', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBRgNewsIotsE5KXK8KElfTZohRurpTjbY', true, null, true );
		wp_enqueue_script('google-jsapi','https://www.google.com/jsapi', true, null, true );

		wp_enqueue_script( 'plugins', "{$url}plugins.js", array('jquery'), null, true );

		wp_enqueue_script( 'app', "{$url}app.js", array('jquery'), null, true );
	}

	// function add_scripts() {
	//   wp_enqueue_script('google-maps', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBRgNewsIotsE5KXK8KElfTZohRurpTjbY');
	//   // wp_enqueue_script('google-jsapi','https://www.google.com/jsapi');     
	// }
	// add_action('wp_enqueue_scripts', 'add_scripts');



	$ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

	
	// Clean up the <head>
	function removeHeadLinks() {
    	remove_action('wp_head', 'rsd_link');
    	remove_action('wp_head', 'wlwmanifest_link');
    }
    add_action('init', 'removeHeadLinks');
    remove_action('wp_head', 'wp_generator');
    
	function createWorkPostType() {

		$workLabels = array(
	 		'name'					=> 'Work',
	    	'singular_name'			=> 'Work',
	    	'add_new' 				=> 'Add Work',
	    	'add_new_item' 			=> 'Add New Work',
	    	'edit_item' 			=> 'Edit Work',
	    	'new_item' 				=> 'New Work',
	    	'all_items'				=> 'All Work',
	    	'view_item' 			=> 'View Work',
	    	'search_items' 			=> 'Search Work',
	    	'not_found' 			=> 'No Work Found',
	    	'not_found_in_trash' 	=> 'No Work Found in Trash', 
	    	'parent_item_colon' 	=> '',
	    	'menu_name' 			=> 'Work',
	    	
	    );

		register_post_type('work', array(
			'labels' 				=> $workLabels,
			'hierarchical' 			=> true,
			'has_archive' 			=> false,
	 		'public' 				=> true,
			'supports' 				=> array('title', 'editor', 'thumbnail', 'revisions' ),
	        'show_ui' 				=> true,			
			'menu_position'       	=> 1,
			'exclude_from_search' 	=> false,
			'capability_type' 		=> 'post',
			'taxonomies'			=> array('category'),
			'rewrite' 				=> array('slug' => 'work', 'with_front' => false),
			)
		);

	}
	
	add_action( 'init', 'createWorkPostType');


	/**
	 * Remove the slug from published post permalinks. Only affect our custom post type, though.
	 */
	function gp_remove_cpt_slug( $post_link, $post, $leavename ) {
	    if ( 'work' != $post->post_type || 'publish' != $post->post_status ) {
	        return $post_link;
	    }
	    $post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );
	    return $post_link;
	}
	add_filter( 'post_type_link', 'gp_remove_cpt_slug', 10, 3 );

	function gp_parse_request_trick( $query ) {
	    // Only noop the main query
	    if ( ! $query->is_main_query() )
	        return;
	    // Only noop our very specific rewrite rule match
	    if ( 2 != count( $query->query ) || ! isset( $query->query['page'] ) ) {
	        return;
	    }
	    // 'name' will be set if post permalinks are just post_name, otherwise the page rule will match
	    if ( ! empty( $query->query['name'] ) ) {
	        $query->set( 'post_type', array( 'post', 'page', 'work' ) );
	    }
	}
	add_action( 'pre_get_posts', 'gp_parse_request_trick' );

	/* Aqua Image Resizer */
	require_once('aq_resizer.php');



	// function my_mce4_options($init) {
	//   $custom_colours =  '"2BAAE2", "Blue"';
	//   $init['textcolor_map'] = '['.$custom_colours.']';
	//   $init['textcolor_rows'] = 6;
	//   return $init;
	// }
	// add_filter('tiny_mce_before_init', 'my_mce4_options');

	// Add styles/classes to the "Styles" drop-down
	add_filter( 'tiny_mce_before_init', 'fb_mce_before_init' );

	function fb_mce_before_init( $settings ) {
	    $style_formats = array(
	        array(
	            'title' => 'Heading',
	            'block' => 'h4',
	            'classes' => 'section',
	        ),
	        array(
	            'title' => 'Normal',
	            'inline' => '',
	            'classes' => '',
	        )
	    );

	    $settings['style_formats'] = json_encode( $style_formats );
	    return $settings;
	}

	add_filter('tiny_mce_before_init', 'tiny_mce_remove_unused_formats' );
	/*
	 * Modify TinyMCE editor to remove H1.
	 */
	function tiny_mce_remove_unused_formats($init) {
		// Add block format elements you want to show in dropdown
		$init['block_formats'] = 'Paragraph=p;Heading 4=h4';
		return $init;
	}


	// Apply styles to the visual editor
	add_filter( 'mce_css', 'fb_mcekit_editor_style');
	function fb_mcekit_editor_style($url) {
	    if ( ! empty( $url ) )
	        $url .= ',';
	    $url .= get_template_directory_uri().'/my-editor-styles.css';
	    return $url;
	}


	/* Add Footer to Admin menu */
	if (function_exists('acf_add_options_page')) {
	    acf_add_options_page(array(
	        'page_title'	=> 'Homepage',
	        'menu_title'	=> 'Homepage',
	        'menu_slug'		=> 'homepage',
	        'redirect'		=> false,
			'position' 		=> 1,	        
	    ));
	}
	function remove_menus() {
	    remove_menu_page('edit.php'); //Posts
	    remove_menu_page('edit-comments.php'); //Comments
	}
	add_action('admin_menu', 'remove_menus');



	function getThumbSvg() {
		return file_get_contents(get_stylesheet_directory_uri().'/images/rollover-thumbnail.svg');
	}

	function getPlaceHolder() {
		return get_stylesheet_directory_uri().'/images/placeholder.jpg'; 
	}


	// function my_acf_init() {
	// 	acf_update_setting('google_api_key', 'AIzaSyBRgNewsIotsE5KXK8KElfTZohRurpTjbY');
	// }
	// add_action('acf/init', 'my_acf_init');





?>