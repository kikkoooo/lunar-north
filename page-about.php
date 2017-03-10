<?php 

	/* Template Name: About */

	function testImage() {
		return get_stylesheet_directory_uri().'/images/placeholder.jpg'; 
	}

	get_header(); 

?>
	<section id="projects-container" class="page page-home data-home" data-page-id="home" data-init="false" data-page-loaded="false"></section>
	<section id="project-detail-container" class="page page-work data-work" data-init="false" data-page-loaded="false"></section>
	<section id="about-container" class="page page-about data-about" data-page-id="about" data-init="true" data-page-loaded="true" data-page-active="true">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<div class="image-studio">
				<img src="<?php echo get_field('image') ?>" class=""/>
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