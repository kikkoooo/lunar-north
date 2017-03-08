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

				<?php 

				$location = get_field('map');

				if ( !empty($location) ):

					echo '<div id="map" class="section image large" data-lat="'.$location['lat'].'" data-lng="'.$location['lng'].'>"></div>';

				endif;

				?>



			</div>


		<?php endwhile; endif; ?>

	</section>

<?php get_footer(); ?>