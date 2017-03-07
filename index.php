<?php 

	// old = https://dummyimage.com/1920x1080/ffd1fa/fff.jpg&text=LN
	function testImage() {
		return get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
	}

	function thumbSvg() {
		return file_get_contents(get_stylesheet_directory_uri().'/images/rollover-thumbnail.svg');
	}

?>	
<?php get_header(); ?>

	<section id="project-detail-container" class="x" data-page-loaded="false"></section>
	<section id="about-container" class="x" data-page-loaded="false"></section>
	<section id="projects-container" class="x" data-page-loaded="true" data-page-id="home">

		<div class="row left cf">

	<?php 

		//$posts = get_field('work_case_studies', options);

		$caseStudies = get_field('work_case_studies', options);
		// print_r ($caseStudies);

		echo '<br/>';
		$normal = get_field('work_normal', options);
		// print_r($normal);

		echo '<div style="background:red">x</div>';



		$original = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		$inserted = array('x','y'); // Not necessarily an array

		// print_r($original);
		// echo '<br/>';
		// print_r($inserted);
		// echo '<br/>';

		// array_splice($original, 3, 0, $inserted ); // splice in at position 3
		// print_r($original);

		$count = 0;
		$left = true; 

		foreach($original as $index=>$value): // variable must be called $post (IMPORTANT)

			// echo $index.' '.$value[0].'<br/>';
			// echo $value[0].'<br/>';

			if ($count == 0) {
				echo $index.'-x'.'<br/>';
				$count++;

			} else if ($count == 1) {
				echo $index.'<br/>';
				$count++;

			} else if ($count == 2) {
				echo $index.'<br/>';
				$left = !$left;
				echo '<br><br/>';
				$count = 0;

			}


		endforeach;

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


	</div>



	</section>



 <?php get_footer(); ?>