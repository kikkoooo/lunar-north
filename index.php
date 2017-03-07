<?php 

	function testImage() {
//		return get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
		return get_stylesheet_directory_uri().'/images/placeholder.jpg'; 
	}


	function thumbSvg() {
		return file_get_contents(get_stylesheet_directory_uri().'/images/rollover-thumbnail.svg');
	}

?>	
<?php get_header(); ?>

	<section id="project-detail-container" class="x page data-work" data-page-loaded="false"></section>
	<section id="about-container" class="x page data-about" data-page-loaded="false"></section>
	<section id="projects-container" class="x page data-home" data-page-loaded="true" data-page-id="home">

	<?php 

		$caseStudiesObj = get_field('work_case_studies', options);
		$normalObj = get_field('work_normal', options);
		$caseStudiesElements = [];
		$normalElements = [];

		if ($caseStudiesObj): 
			foreach($caseStudiesObj as $post):
		        setup_postdata($post);
		        $e 	=	'<div class="case-study col">'
							.'<div class="project">'
								.'<a href="'.get_permalink().'" class="ajax link url-work" data-animated="false">'
									.'<img class="thumbnail" src="'.get_field('thumbnail').'"/>'
									.'<div class="hover-card">'
										.'<div class="svg-container">'.thumbSvg().'</div>'
										.'<div class="text-container">'
											.'<h2 class="client">'.get_field('client').'</h2>'
											.'<h2 class="title">'.get_the_title().'</h2>'
										.'</div>'
									.'</div>'
								.'</a>'
							.'</div>'
						.'</div>';
				$caseStudiesElements[] = $e;
		    	endforeach; 
			wp_reset_postdata();
		endif; 

		if ($normalObj): 
			foreach($normalObj as $post):
		        setup_postdata($post);
				$e 	=	'<div class="project">'
						.	'<a href="'.get_permalink().'" class="ajax link url-work" data-animated="false">'
						.		'<img class="thumbnail" src="'.get_field('thumbnail').'"/>'
						.		'<div class="hover-card">'
						.			'<div class="svg-container">'
						.				thumbSvg()
						.			'</div>'
						.			'<div class="text-container">'
						.				'<h2 class="client">'.get_field('client').'</h2>'
						.				'<h2 class="title">'.get_the_title().'</h2>'
						.			'</div>'
						.		'</div>'
						.	'</a>'
						.'</div>';
				$normalElements[] = $e;
		    	endforeach; 
			wp_reset_postdata();
		endif; 

		$count = 0;
		$projects;

		foreach($caseStudiesElements as $index=>$value): // variable must be called $post (IMPORTANT)

			$projects 	.=	'<div class="row left cf">'
						.		$value
						.		'<div class="normal col cf">'
			 			.			$normalElements[$count];
			$count++; 			
			$projects 	.=			$normalElements[$count]; 
			$count++; 			
			$projects 	.=		'</div>'
						.	'</div>';

		endforeach;

		echo $projects;






		// $original = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		// $inserted = array('x','y'); // Not necessarily an array

		// $count = 0;
		// $left = true; 

		// $html;

		// foreach($original as $index=>$value): // variable must be called $post (IMPORTANT)

		// 	if ($count == 0) {
		// 		echo $index.'-x'.'<br/>';
		// 		$count++;

		// 	} else if ($count == 1) {
		// 		echo $index.'<br/>';
		// 		$count++;

		// 	} else if ($count == 2) {
		// 		echo $index.'<br/>';
		// 		$left = !$left;
		// 		echo '<br><br/>';
		// 		$count = 0;

		// 	}

		// endforeach;

		/*
		
		+ Create the arrays for case study w/ html values
		+ Create the arrays for normal w/ html values

		for each based on the total length if we added the caseStudy.legnth + normal.legnth 
		
		create (row)

		0 		= caseStudy 
		1 & 2 	= normal

		switch sides
		reset back to 0







	



		*/




		// $posts = get_field('work_normal', options);

		// if ($posts): 

		// 	foreach($posts as $post): // variable must be called $post (IMPORTANT)
		//         setup_postdata($post);

		//         echo 	'<div class="case-study col">'
		// 					.'<div class="project">'
		// 						.'<a href="'.get_permalink().'" class="ajax link url-work" data-animated="false">'
		// 							.'<img class="thumbnail" src="'.testImage().'"/>'
		// 							.'<div class="hover-card">'
		// 								.'<div class="svg-container">'.thumbSvg().'</div>'
		// 								.'<div class="text-container">'
		// 									.'<h2 class="client">'.get_field('client').'</h2>'
		// 									.'<h2 class="title">'.get_the_title().'</h2>'
		// 								.'</div>'
		// 							.'</div>'
		// 						.'</a>'
		// 					.'</div>'
		// 				.'</div>';
		    	
		//     	endforeach; 
			
		// 	wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly
		
		// endif; 

	?>





	</section>



 <?php get_footer(); ?>