<?php 

	// old = https://dummyimage.com/1920x1080/ffd1fa/fff.jpg&text=LN
	function testImage() {
		echo get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
	}

	function thumbSvg() {
		echo '<div class="svg-container">'.file_get_contents(get_stylesheet_directory_uri().'/images/rollover-thumbnail.svg').'</div>';	
	}

?>	
<?php get_header(); ?>

	<section id="projects-container">


		<div class="row left cf">
			<div class="case-study col">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>

		</div>

		<div class="row right cf">
			<div class="case-study col">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>
		</div>

		<div class="row left cf">
			<div class="case-study col">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>

		</div>

		<div class="row right cf">
			<div class="case-study col">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
				<div class="project">
					<a href="<?php echo get_permalink(1); ?>" class="link" data-animated="false">
						<!-- <span class="animation-rollover"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
						<?php thumbSvg() ?>
					</a>
				</div>
			</div>
		</div>


	</section>


 <?php get_footer(); ?>