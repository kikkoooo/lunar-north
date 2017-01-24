<?php 
	
	get_header(); 
	
?>
	<section id="notes" class="page text content-x">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div class="container">
			<div class="category">
			<?php
			
				$notes = new WP_Query( array(
					'post_type' 		=> 'notes',
					'posts_per_page'	=> '-1',
					'orderby'			=> 'menu',
					'order'				=> 'ASC',
				));

				if ($notes->have_posts() ) : 
				
				echo '<ol>';
				$count = 1;

					while ($notes->have_posts()) : $notes->the_post();

						echo	'<li class="item">'
								.	'<a href="'.get_the_permalink().'" class="cf">'
								.		'<span class="number">'.$count.'</span>'
								.		'<span class="title">'.get_the_title().'</span>'
								.		'<span class="year">'.get_field('year').'</span>'
								.	'</a>'							
								.'</li>';

					$count++;
				    endwhile; 

				echo '</ol>';
			    
			    endif;

				wp_reset_postdata(); 
					
			?>
			</div>
		</div>
		<div class="notes-content-container">
			<div class="content">
				<div class="close-btn">&times;</div>
				<iframe data-url="http://omg.kikkoooo.com/interaction-2/" src="<?php get_field('google_document') ?>" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>				
			</div>
		</div>
		<footer>&copy; 2016 You VS Jesus</footer>		
			<?php endwhile; endif; ?>

	</section>
<?php get_footer(); ?>