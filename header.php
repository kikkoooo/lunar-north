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

<!-- <body class="notes-open"> -->
<body>
<?php if (!is_page_template('page-vs.php')) { ?>
	<header id="site-header">
		<h1><span class="you">You</span><span class="vs">VS</span><a data-title="You VS Jesus" class="opponent ajax-page" href="<?php echo get_home_url(); ?>" >Jesus</a></h1>
	</header>
	<nav id="site-nav">
		<ul class="cf">
			<li><a data-title="Notes" class="page-link ajax-page <?php if (is_page(10) || is_singular('notes')) echo 'active'; ?>" id="link-notes" href="<?php echo get_permalink(10); ?>" url="<?php echo get_permalink(10); ?>" data-page="notes">Notes</a></li>
			<li><a data-title="Info" class="page-link ajax-page <?php if (is_page(2)) echo 'active'; ?>" id="link-info" href="<?php echo get_permalink(2); ?>" data-page="info">Info</a></li>
			<li><a data-title="You VS Jesus" class="page-link ajax-page <?php if (is_home()) echo 'active'; ?>" id="link-work" href="<?php echo get_home_url(); ?>" data-page="work">Work</a></li>
		</ul>	
		<div class="line"></div>
	</nav>
	<div class="loading-bar rotating"></div>		
	<div id="content-container">
<?php } ?>




