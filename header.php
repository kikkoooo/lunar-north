<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php if (is_home()) { echo bloginfo('name'); } else { wp_title('-','true','right'); }?></title>
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
	<?php wp_head(); ?>
</head>	
<body>

	<?php

	// if (is_home()) { 

		$vimeoUrl = get_field('reel', options, false, false);			

		if (preg_match("/(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/", $vimeoUrl, $id)) {
		    $videoId = $id[3];
		}

		echo 	'<div id="featured">'.
					'<div class="reel-container">'.
						'<img src="'.getPlaceHolder().'" data-error="'.getPlaceHolder().'" class="video vimeo-thumb" data-vimeo-id="'.$videoId.'">'.
					'</div>'.
				'</div>';
	// } 

	?>

	<div class="progress"></div>
	<div id="main">
		<header class="header">
			<div class="ln-container cf">
				<div class="tagline align-right"><h3>Design and Animation</h3></div>
				<div class="tagline align-left"><h3>Detroit, Michigan</h3></div>
				<div class="logo"><a href="<?php echo esc_url(home_url('/'));?>" class="ajax link url-home" data-page-id="home" data-title="Home"><?php echo file_get_contents(get_stylesheet_directory_uri().'/images/ln-logo.svg');?></a></div>
			</div>
			<div class="menu-button"><a href="#" class="nav-toggle icon-btn" data-animated="false"><span></span></a></div>	
			<nav class="menu-box">
				<ul>
					<li><h2><a href="#" class="ajax link url-reel" data-page-id="reel">Reel</a></h2></li>
					<li><h2><a href="<?php echo esc_url(home_url('/'));?>" class="ajax link url-home" data-page-id="home" data-title="Home">Work</a></h2></li>
					<li><h2><a href="<?php echo get_permalink(get_page_by_path('about'))?>" class="ajax link url-about" data-page-id="about" data-title="About">About</a></h2></li>
					<li class="social-media">
						<ul class="cf">
							<li><a href="https://www.facebook.com/lunarnorthdesign/" target="_blank"><?php echo file_get_contents(get_stylesheet_directory_uri().'/images/ln-social-fb.svg');?></a></li>
							<li><a href="https://www.instagram.com/lunarnorthdesign/" target="_blank"><?php echo file_get_contents(get_stylesheet_directory_uri().'/images/ln-social-ig.svg');?></a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>