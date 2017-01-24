<?php 
	
	/*
	Template Name: Notes Old
	*/

	get_header(); 
	
?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<section id="notes" class="page text content-x">


		<div class="container">
			<div class="category">
			<?php
			
			if( have_rows('notes') ):
				echo '<ol>';
				$count = 1;
			    while ( have_rows('notes') ) : the_row();
					echo	'<li class="item">'
							.	'<a href="#" class="cf">'
							.		'<span class="number">'.$count.'</span>'
							.		'<span class="title">'.get_sub_field('title').'</span>'
							.		'<span class="year">'.get_sub_field('year').'</span>'
							.	'</a>'							
							.'</li>';
					$count++;
			    endwhile;
				echo '</ol>';				
			else :
			endif;
			?>
			</div>
		</div>
		<div class="notes-content-container">
			<div class="content">
				<div class="close-btn">&times;</div>

<!-- 				<iframe data-url="http://omg.kikkoooo.com/interaction-2/" src="http://omg.kikkoooo.com/interaction-2/" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>				 -->
				<iframe data-url="https://docs.google.com/document/d/1uXDVvVk-BX93Kwhnk2aqLHcu3pQAMb5zrKAmiwR-yRg/preview" src="https://docs.google.com/document/d/1uXDVvVk-BX93Kwhnk2aqLHcu3pQAMb5zrKAmiwR-yRg/preview" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>				
			</div>
		</div>

		<footer>&copy; 2016 You VS Jesus</footer>		

	</section>
	<?php endwhile; endif; ?>
<?php get_footer(); ?>