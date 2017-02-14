<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php if (is_home()) { echo bloginfo('name'); } else { wp_title('-','true','right'); }?></title>
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/normalize.css">	
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
	<?php wp_head(); ?>
</head>
<body>

	<?php

	$testImage = get_stylesheet_directory_uri().'/images/test-intro.jpg';

	function testIntroImage() {
		echo get_stylesheet_directory_uri().'/images/test-intro.jpg'; 
	}
	
	?>

	<?php if (!is_single()) { ?>

		<div id="featured">
			<div class="preview-intro-image" data-intro-image="<?php testIntroImage(); ?>"></div>

			<?php 

				echo	'<div class="video-content">'.
							'<img src="'.$testImage.'" data-error="'.$testImage.'" class="vimeo-thumb" data-vimeo-id="128843408">'.
						'</div>';

			?>

		</div>

	<?php } ?>

	<div id="main">
		<header class="header">
			<div class="container cf">
				<div class="sub-text align-right"><h3>Design and Animation</h3></div>
				<div class="sub-text align-left"><h3>Detroit, Michigan</h3></div>
				<div class="logo"><a href="<?php echo esc_url(home_url('/'));?>"></a></div>
			</div>
			<div class="menu-button"><a href="#" class="icon-btn" data-animated="false"></a></div>	
			<nav class="menu-box">
				<ul>
					<li><h2><a href="#">Reel</a></h2></li>
					<li><h2><a href="#">Link 2</a></h2></li>
					<li><h2><a href="#">Link 3</a></h2></li>
					<li><h2><a href="#">Link 4</a></h2></li>
				</ul>
			</nav>
		</header>
 		
 		<div id="content">
