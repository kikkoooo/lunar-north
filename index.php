<?php 


	get_header(); 

?>
 
	<section id="project-detail-container" class="page page-work data-work" style="display:none" data-page-id="work" data-page-active="false" data-page-load="false"></section>
	<section id="about-container" class="page page-about data-about" style="display:none" data-page-id="about" data-page-active="false" data-page-load="false"></section>
	<section id="projects-container" class="page page-home data-home" style="position:relative" data-page-id="home" data-page-active="true"  data-page-load="true">

	<?php 

		$caseStudiesObj = get_field('work_case_studies', options);
		$count = 1;

		foreach($caseStudiesObj as $p):

			if ($count == 1) {

				$image = get_field('thumbnail', $p->ID);
				$imageW = $image['width'];
				if ($imageW > 1200): $imageUrl = aq_resize($image['url'], 1100); endif;

				echo '<div class="row cf">';
		        echo 	'<div class="case-study col">'
							.'<div class="project">'
								.'<a href="'.get_permalink($p->ID).'" class="ajax link url-work" data-animated="false" data-page-id="work" data-title="'.get_the_title($p->ID).'">'
									.'<img class="thumbnail lazy" data-original="'.$imageUrl.'"/>'
									.'<div class="hover-card">'
										.'<div class="svg-container">'.getThumbSvg().'</div>'
										.'<div class="text-container">'
											.'<h2 class="client">'.get_field('client', $p->ID).'</h2>'
											.'<h2 class="title">'.get_the_title().'</h2>'
										.'</div>'
									.'</div>'
								.'</a>'
							.'</div>'
						.'</div>';


			} else if ($count == 2) {

				$image = get_field('thumbnail', $p->ID);
				$imageW = $image['width'];
				if ($imageW > 600): $imageUrl = aq_resize($image['url'], 500); endif;

				echo '<div class="normal col cf">';
				echo	'<div class="project">'
						.	'<a href="'.get_permalink($p->ID).'" class="ajax link url-work" data-animated="false" data-page-id="work" data-title="'.get_the_title($p->ID).'">'
						.		'<img class="thumbnail lazy" data-original="'.$imageUrl.'"/>'
						.		'<div class="hover-card">'
						.			'<div class="svg-container">'.getThumbSvg().'</div>'
						.			'<div class="text-container">'
						.				'<h2 class="client">'.get_field('client', $p->ID).'</h2>'
						.				'<h2 class="title">'.get_the_title($p->ID).'</h2>'
						.			'</div>'
						.		'</div>'
						.	'</a>'
						.'</div>';

			} else if ($count == 3) {

				$image = get_field('thumbnail', $p->ID);
				$imageW = $image['width'];
				if ($imageW > 600): $imageUrl = aq_resize($image['url'], 500); endif;

				echo	'<div class="project">'
						.	'<a href="'.get_permalink($p->ID).'" class="ajax link url-work" data-animated="false" data-page-id="work" data-title="'.get_the_title($p->ID).'">'
						.		'<img class="thumbnail lazy" data-original="'.$imageUrl.'"/>'
						.		'<div class="hover-card">'
						.			'<div class="svg-container">'.getThumbSvg().'</div>'
						.			'<div class="text-container">'
						.				'<h2 class="client">'.get_field('client', $p->ID).'</h2>'
						.				'<h2 class="title">'.get_the_title($p->ID).'</h2>'
						.			'</div>'
						.		'</div>'
						.	'</a>'
						.'</div>';

				echo '</div>';
				echo '</div>';

				$count = 0;

			}

			$count++;

    	endforeach; 

	?>
	</section>
 <?php get_footer(); ?>