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

	function testIntroImage() {
		echo get_stylesheet_directory_uri().'/images/test-intro.jpg'; 
	}
	
	?>

	<div id="featured">
		<div class="preview-intro-image" data-intro-image="<?php testIntroImage(); ?>"></div>
	</div>

	<div id="main">

		<header class="header">

			<div class="container cf">
				<div class="meta-text align-right"><h3>Design and Animation</h3></div>
				<div class="meta-text align-left"><h3>Detroit, Michigan</h3></div>
				<div class="logo"><a href="#"></a></div>
			</div>

			<div class="menu-button">
				<a href="#" class="icon-btn"></a>
			</div>	

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

