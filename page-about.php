<?php 

	/* Template Name: About */


	function testImage() {
		return get_stylesheet_directory_uri().'/images/placeholder.jpg'; 
	}

	get_header(); 


?>

	<section id="projects-container" class="project page x data-home" data-page-loaded="false" data-page-id="home"></section>
	<section id="project-detail-container" class="project page x data-work" data-page-loaded="false"></section>
	<section id="about-container" class="project page x data-about" data-page-loaded="true" data-page-id="about">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<div class="image-studio">
				<img src="<?php echo testImage() ?>" class=""/>
			</div>

			<div class="content-container">
				
				<div class="info cf col-2">
					<div class="credits col meta">
						<?php the_field('contact');?>
					</div>			
					<div class="col description meta">
						<?php the_field('description');?>
					</div>			
				</div>

			<div id="map" class="section image large col-1">
<!-- 				<iframe
					width="100%"
					height="800"
					frameborder="0" style="border:0"
					src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBHu_lNJ8fLenPf3QuHMjvWdneGijvgoCM&q=645+Griswold+St,+Detroit,+MI+48226" allowfullscreen>
				</iframe>
 -->			</div>

				<script type="text/javascript">

				  $(function() {
				    $("#map").googleMap({
				      zoom: 10, // Initial zoom level (optional)
				      coords: [48.895651, 2.290569], // Map center (optional)
				      type: "ROADMAP" // Map type (optional)
				    });
				  })

				</script>

				<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHu_lNJ8fLenPf3QuHMjvWdneGijvgoCM&callback=ln.initMap"></script> -->

				<!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHu_lNJ8fLenPf3QuHMjvWdneGijvgoCM"></script> -->


				<?php

					// echo 	'<div class="section image large col-1">'.
					// 			'<div>'.
					// 				'<img src="'.get_sub_field('image').'">'.
					// 			'</div>'.
					// 		'</div>';


				// if (have_rows('custom_content')):

				//     while (have_rows('custom_content')) : the_row();

				//         if (get_row_layout() == 'image_full'):

				// 			echo 	'<div class="section image large col-1">'.
				// 						'<div>'.
				// 							'<img src="'.get_sub_field('image').'">'.
				// 						'</div>'.
				// 					'</div>';

				//         elseif (get_row_layout() == 'image_small'): 

				// 			$rows = get_sub_field('images');

				// 			echo 	'<div class="section image small col-2 cf">'.
				// 						'<div class="col">'.
				// 							'<img src="'.$rows[0]['image_1'].'">'.
				// 						'</div>'.
				// 						'<div class="col">'.
				// 							'<img src="'.$rows[0]['image_2'].'">'.
				// 						'</div>'.
				// 					'</div>';

				//         elseif (get_row_layout() == 'video'): 

				// 			$vimeoUrl = get_field('video', false, false);			

				// 			if (preg_match("/(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/", $vimeoUrl, $id)) {
				// 			    $videoId = $id[3];
				// 			} else if (preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $vimeoUrl, $id)) {
				// 			    $videoId = $id[1];
				// 			}

				// 			echo	'<div class="section video">'.
				// 						'<img src="'.$testImage.'" data-error="'.$testImage.'" class="vimeo-thumb" data-vimeo-id="'.$videoId.'">'.
				// 					'</div>';

				//         elseif (get_row_layout() == 'text'): 

				// 			echo 	'<div class="section text large col-1">'.
				// 						'<div>'.get_sub_field('text').'</div>'.
				// 					'</div>';

				//         endif;

				//     endwhile;

				// else :

				//     // no layouts found

				// endif;

				?>

			</div>


		<?php endwhile; endif; ?>

	</section>

<?php get_footer(); ?>