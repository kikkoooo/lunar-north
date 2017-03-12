<?php 

get_header(); 


?>

	<section id="about-container" class="page page-about data-about" data-page-loaded="false"></section>
	<section id="projects-container" class="page page-home data-home" data-page-loaded="false" data-page-id="home"></section>
	<section id="project-detail-container" class="page page-work data-work" data-page-id="<?php echo "work-".get_the_ID(); ?>" data-page-loaded="true">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<?php

				$videoUrl = get_field('video_url', false, false);

				if (preg_match("/(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/", $videoUrl, $id)) {
				    $videoId = $id[3];
					echo	'<div class="video-main video-project">'.
								'<img src="'.getPlaceHolder().'" data-error="'.getPlaceHolder().'" class="video-vimeo" data-vimeo-id="'.$videoId.'"/>'.
							'</div>';
				} else if (preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $videoUrl, $id)) {
				    $videoId = $id[1];
					echo '<div class="video-main video-project video-youtube" data-youtube-id="'.$videoId.'"></div>';

				}

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

				// Flexible content
				if (have_rows('custom_content')):

				    while (have_rows('custom_content')) : the_row();

						// Full image
				        if (get_row_layout() == 'image_full'):

							// Aqua resize
							$image = get_sub_field('image');
							$imageW = $image['width'];

							if ($image['width'] > 1600) {
								$imageUrl = aq_resize($image['url'], 1600);
							} else {
								$imageUrl = $image['url'];
							}

							echo 	'<div class="section image large col-1">'.
										'<img src="'.$imageUrl.'">'.
									'</div>';

				        elseif (get_row_layout() == 'image_small'): 

							$rows = get_sub_field('images');

							$image1 = $rows[0]['image_1'];
							$image1W = $image1['width'];

							if ((pathinfo($image1['url'], PATHINFO_EXTENSION)) != 'gif' && $image1W > 820) {
								$image1Url = aq_resize($image1['url'], 820);
							} else {
								$image1Url = $image1['url'];
							}

							$image2 = $rows[0]['image_2'];
							$image2W = $image2['width'];

							if ((pathinfo($image2['url'], PATHINFO_EXTENSION)) != 'gif' && $image2W > 820) {
								$image2Url = aq_resize($image2['url'], 820);
							} else {
								$image2Url = $image2['url'];
							}

							echo 	'<div class="section image small col-2 cf">'.
										'<div class="col">'.
											'<img src="'.$image1Url.'">'.
										'</div>'.
										'<div class="col">'.
											'<img src="'.$image2Url.'">'.
										'</div>'.
									'</div>';

						// Video

				        elseif (get_row_layout() == 'video'): 

							$videoUrl = get_sub_field('video', false, false);

							if (preg_match("/(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/", $videoUrl, $id)) {
							     $videoId = $id[3];
								echo	'<div class="section video">'.
											'<img src="'.getPlaceHolder().'" data-error="'.getPlaceHolder().'" class="video-vimeo" data-vimeo-id="'.$videoId.'"/>'.
										'</div>';
							} else if (preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $videoUrl, $id)) {
							    $videoId = $id[1];
								echo '<div class="section video video-youtube" data-youtube-id="'.$videoId.'"></div>';
							} else {
								echo "POOP";
							}

						// Text block			
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