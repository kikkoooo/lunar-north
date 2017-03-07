<?php 

	function testImage() {
//		return get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
		return get_stylesheet_directory_uri().'/images/placeholder.jpg'; 
	}

get_header(); ?>

	<section id="about-container" class="project page x data-about" data-page-loaded="false"></section>
	<section id="projects-container" class="project page x data-home" data-page-loaded="false" data-page-id="home"></section>
	
	<section id="project-detail-container" class="project page x data-work" data-page-id="<?php echo "work-".get_the_ID(); ?>" data-page-loaded="true">

		<?php 

			// function testImage() {
			// 	return get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
			// }


		?>
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>


			<?php

				$vimeoUrl = get_field('video_url', false, false);			

				if (preg_match("/(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/", $vimeoUrl, $id)) {
				    $videoId = $id[3];
				} else if (preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $vimeoUrl, $id)) {
				    $videoId = $id[1];
				}

				echo	'<div class="video-main video-project">'.
							'<img src="'.testImage().'" data-error="'.testImage().'" class="vimeo-thumb" data-vimeo-id="'.$videoId.'">'.
						'</div>';
			?>

			<div class="content-container">

				<div class="info cf col-2">
					<div class="col meta">
						<h3 class="title"><?php the_title(); ?></h3>
						<div class="credits">
						<?php
							$rows = get_field('info');
							echo $rows[0]['credits'];
						?>
						</div>
					</div>			
					<div class="col description meta">
						<?php
							$rows = get_field('info');
							echo $rows[0]['description'];
						?>
					</div>			
				</div>

				<?php

				if (have_rows('custom_content')):

				    while (have_rows('custom_content')) : the_row();

				        if (get_row_layout() == 'image_full'):

							echo 	'<div class="section image large col-1">'.
										'<div>'.
											'<img src="'.get_sub_field('image').'">'.
										'</div>'.
									'</div>';

				        elseif (get_row_layout() == 'image_small'): 

							$rows = get_sub_field('images');

							echo 	'<div class="section image small col-2 cf">'.
										'<div class="col">'.
											'<img src="'.$rows[0]['image_1'].'">'.
										'</div>'.
										'<div class="col">'.
											'<img src="'.$rows[0]['image_2'].'">'.
										'</div>'.
									'</div>';

				        elseif (get_row_layout() == 'video'): 

							$vimeoUrl = get_field('video', false, false);			

							if (preg_match("/(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/", $vimeoUrl, $id)) {
							    $videoId = $id[3];
							} else if (preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $vimeoUrl, $id)) {
							    $videoId = $id[1];
							}

							echo	'<div class="section video">'.
										'<img src="'.$testImage.'" data-error="'.$testImage.'" class="vimeo-thumb" data-vimeo-id="'.$videoId.'">'.
									'</div>';

				        elseif (get_row_layout() == 'text'): 

							echo 	'<div class="section text large col-1">'.
										'<div>'.get_sub_field('text').'</div>'.
									'</div>';

				        endif;

				    endwhile;

				else :

				    // no layouts found

				endif;

				?>

			</div>


		<?php endwhile; endif; ?>

	</section>

<?php get_footer(); ?>