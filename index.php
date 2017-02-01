<?php 

	// old = https://dummyimage.com/1920x1080/ffd1fa/fff.jpg&text=LN
	function testImage() {
		echo get_stylesheet_directory_uri().'/images/test-1920.jpg'; 
	}

?>	
<?php get_header(); ?>
	<section class="projects index">

		<div id="first" class="row left cf">
			<div class="case-study col">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

		</div>

		<div class="row right cf">
			<div class="case-study col">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

		</div>

		<div class="row left cf">
			<div class="case-study col">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

		</div>

		<div class="row right cf">
			<div class="case-study col">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

			<div class="normal col cf">
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
				<div class="project">
					<a href="#" class="link" data-animated="false">
						<span class="animation-rollover"></span>
						<!-- <span class="thumbnail"></span> -->
						<img class="thumbnail" src="<?php testImage()?>"/>
					</a>
				</div>
			</div>

		</div>



	</section>


 <?php get_footer(); ?>