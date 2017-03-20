<?php 

	get_header(); 

?>
	<section id="page-404" class="page" data-page-id="error" style="position:relative;" data-page-load="true">
		<div class="error">
			<h3>We're sorry but the page you are looking for can't be found...</h3>
			<p>Click here to visit our <a href="<?php echo esc_url(home_url('/'));?>">homepage</a> or this will auto redirect in <span class="countdown">10</span></p>
			<div>
	</section>
<?php get_footer(); ?>