<?php 

	/* Template Name: About */

	get_header(); 

?>
	<section id="projects-container" class="page page-home data-home" data-page-id="home" style="display:none" data-page-active="false" data-page-load="false"></section>
	<section id="project-detail-container" class="page page-work data-work" data-page-id="work" style="display:none" data-page-active="false"  data-page-load="false"></section>
	<section id="about-container" class="page page-about data-about" data-page-id="about" style="position:relative;" data-page-active="true" data-page-load="true">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<div class="image-studio">

			<?php

				$image = get_field('image');
				$imageW = $image['widtŽ'];

				if ($image['width'] > 1600) {
					$imageUrl = aq_resize($image['url'], 1600);
				} else {
					$imageUrl = $image['url'];
				}

				// echo '<img class="lazy" data-original="'.$imageUrl.'"/>';
				echo '<img class="lazy" src="'.$imageUrl.'"/>';



			?>

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

				<?php echo '<div id="map" class="section image large" data-lat="'.$location['lat'].'" data-lng="'.$location['lng'].'>"></div>'; ?>

			</div>

		<?php endwhile; endif; ?>

	</section>

<?php get_footer(); ?>