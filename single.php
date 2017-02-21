<?php 

	// old = https://dummyimage.com/1920x1080/ffd1fa/fff.jpg&text=LN
	function testImage() {
		echo get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
	}

get_header(); ?>

	<section id="project-detail-container" class="project page">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>


			<?php
				echo	'<div class="video-main video-project">'.
							'<img src="'.$testImage.'" data-error="'.$testImage.'" class="vimeo-thumb" data-vimeo-id="128843408">'.
						'</div>';
			?>

			<div class="content-container">

				<div class="info cf col-2">
					<div class="col meta">
						<h3 class="title">Project Title</h3>
						<div class="credits">
							<p>CLIENT: Free Age Productions</p>
						</div>
					</div>			
					<div class="col description meta">
						<p>It’s impossible not to get excited about a project brief when it includes images of Sylvester Stallone, mirror-like aviators, and sci-  dystopian worlds. Detroit based production studio FreeAge approached us to create a new identity system for them so we got to work making grimey and gritty logos and  eshed out some well-worn corridors for their logo to wash a healthy coat of neon over.</p>
					</div>			
				</div>

				<div class="images col-2 cf">
					<div class="col">
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>
					<div class="col">
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>  
				</div>	

				<div class="images col-1">
					<div>
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>
				</div>	

				<div class="images col-2 cf">
					<div class="col">
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>
					<div class="col">
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>  
				</div>	

				<div class="images col-2 cf">
					<div class="col">
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>
					<div class="col">
						<img src="https://dummyimage.com/1920x1080/ff00ff/fff.jpg">
					</div>  
				</div>	
				

			</div>


		<?php endwhile; endif; ?>

	</section>

<?php get_footer(); ?>