<?php 

	/*
	Template Name: VS
	*/

	get_header(); 
	if (have_posts()) : while (have_posts()) : the_post(); 

?>

<div id="vs">
	<section class="left col">
		<div class="content">
			<div class="scale">
				<iframe src="<?php echo get_field('document_left') ?>" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
			</div>
		</div>
	</section>
	<section class="right col">
		<div class="content">
			<div class="scale">
				<iframe src="<?php echo get_field('document_right') ?>" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
			</div>
		</div>
	</section>
</div>

<div class="trigger">
	<div class="resize-bar"></div>		
	<div class="tolerance"></div>		
</div>





<!-- <div class="resize-bar"></div> -->

<?php 
	
	endwhile;
	endif;
	get_footer(); 
	
?>