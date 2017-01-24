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

	   wp_enqueue_script( 'plugins', "{$url}plugins.js", array('jquery'), '', true );
	   wp_enqueue_script( 'app', "{$url}app.js", array('jquery'), '', true );
	}


	$ajax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

	
	// Clean up the <head>
	function removeHeadLinks() {
    	remove_action('wp_head', 'rsd_link');
    	remove_action('wp_head', 'wlwmanifest_link');
    }
    add_action('init', 'removeHeadLinks');
    remove_action('wp_head', 'wp_generator');
    
	function createNotesPostType() {

		$notesLabels = array(
	 		'name'					=> 'Notes',
	    	'singular_name'			=> 'Notes Article',
	    	'add_new' 				=> 'Add Notes Article',
	    	'add_new_item' 			=> 'Add New Notes Article',
	    	'edit_item' 			=> 'Edit Notes Article',
	    	'new_item' 				=> 'New Notes Article',
	    	'all_items'				=> 'All Notes Articles',
	    	'view_item' 			=> 'View Notes Article',
	    	'search_items' 			=> 'Search Notes Articles',
	    	'not_found' 			=> 'No Notes Articles Found',
	    	'not_found_in_trash' 	=> 'No Notes Articles Found in Trash', 
	    	'parent_item_colon' 	=> '',
	    	'menu_name' 			=> 'Notes',
	    	
	    );

		register_post_type('notes', array(
			'labels' 				=> $notesLabels,
			'hierarchical' 			=> true,
			'has_archive' 			=> false,
	 		'public' 				=> true,
			'supports' 				=> array('title', 'editor'),
// 			'menu_position'       	=> 1,
			'exclude_from_search' 	=> false,
			'capability_type' 		=> 'post',
			'rewrite' 				=> array( 'slug' => 'notes' ),
			'taxonomies'			=> array('category'),
			)
		);

	}
	
	flush_rewrite_rules();
	add_action( 'init', 'createNotesPostType');



?>