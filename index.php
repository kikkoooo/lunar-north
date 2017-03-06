<?php 

	// old = https://dummyimage.com/1920x1080/ffd1fa/fff.jpg&text=LN
	function testImage() {
		echo get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
	}

	function thumbSvg() {
		echo file_get_contents(get_stylesheet_directory_uri().'/images/rollover-thumbnail.svg');
	}

?>	
<?php get_header(); ?>

	<section id="project-detail-container" class="x" data-page-loaded="false"></section>
	<section id="about-container" class="x" data-page-loaded="false"></section>
	<section id="projects-container" class="x" data-page-loaded="true" data-page-id="home">


		<div class="row left cf">

	<?php 

	$posts = get_field('work_case_studies');

	if ($posts): 

		foreach($posts as $p): // variable must be called $post (IMPORTANT)
	        // setup_postdata($post);

	        echo "hoy";

	        echo 	'<div class="case-study col">'
						.'<div class="project">'
							.'<a href="'.get_permalink($p->ID).'" class="ajax link url-work" data-animated="false">'
								.'<img class="thumbnail" src="'.testImage().'"/>'
								.'<div class="hover-card">'
									.'<div class="svg-container">'.thumbSvg().'</div>'
									.'<div class="text-container">'
										.'<h2 class="client">Client</h2>'
										.'<h2 class="title">'.the_title($p->ID).'</h2>'
									.'</div>'
								.'</div>'
							.'</a>'
						.'</div>'
					.'</div>';
	    	
	    	endforeach; 
		
		wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly
	
	endif; 

	?>


	</div>



	</section>



 <?php get_footer(); ?>