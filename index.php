<?php 

	function getThumbSvg() {
		return file_get_contents(get_stylesheet_directory_uri().'/images/rollover-thumbnail.svg');
	}

	get_header(); 

?>
 
	<section id="project-detail-container" class="page page-work data-work" style="display:none" data-page-id="work" data-page-active="false"></section>
	<section id="about-container" class="page page-about data-about" style="display:none" data-page-id="about" data-page-active="false"></section>
	<section id="projects-container" class="page page-home data-home" style="position:relative" data-page-id="home" data-page-active="true">

	<?php 

		$caseStudiesObj = get_field('work_case_studies', options);
		$normalObj = get_field('work_normal', options);

		//Init arrays
		$caseStudiesElements = [];
		$normalElements = [];

		//Get all the Case Study works and make an array with of their html elements
		if ($caseStudiesObj): 
			foreach($caseStudiesObj as $post):
		        setup_postdata($post);

				$image = get_field('thumbnail');
				$imageW = $image['width'];
				if ($imageW > 1200): $imageUrl = aq_resize($image['url'], 1200); endif;

		        $e 	=	'<div class="case-study col">'
							.'<div class="project">'
								.'<a href="'.get_permalink().'" class="ajax link url-work" data-animated="false" data-page-id="work">'
									.'<img class="thumbnail" src="'.$imageUrl.'"/>'
									.'<div class="hover-card">'
										.'<div class="svg-container">'.getThumbSvg().'</div>'
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

		//Get all the Normal works and make an array with of their html elements

		if ($normalObj): 
			foreach($normalObj as $post):
		        setup_postdata($post);

				$image = get_field('thumbnail');
				$imageW = $image['width'];
				if ($imageW > 600): $imageUrl = aq_resize($image['url'], 600); endif;

				$e 	=	'<div class="project">'
						.	'<a href="'.get_permalink().'" class="ajax link url-work" data-animated="false" data-page-id="work">'
						.		'<img class="thumbnail" src="'.$imageUrl.'"/>'
						.		'<div class="hover-card">'
						.			'<div class="svg-container">'
						.				getThumbSvg()
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

		//For each Case Study make the row element and add two Normal works
		foreach($caseStudiesElements as $index=>$value): // variable must be called $post (IMPORTANT)

			$projects 	.=	'<div class="row cf">'
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

	?>
	</section>
 <?php get_footer(); ?>