<?php 
	
	get_header(); 
	
?>
	<section id="notes" class="page text content-x">
		<?php 
			
			if (have_posts()) : while (have_posts()) : the_post(); 
			
			$type = get_field('type');
			
			
			
		?>
		<div class="container">
			<div class="category">
			<?php
			
				$notes = new WP_Query( array(
					'post_type' 		=> 'notes',
					'posts_per_page'	=> '-1',
					'orderby'			=> 'menu_order',
					'order'				=> 'ASC',
				));

				if ($notes->have_posts() ) : 
				
				echo '<ol>';
				$count = 1;

					while ($notes->have_posts()) : $notes->the_post();

						echo	'<li class="item">'
								.	'<a data-title="'.get_the_title().'" href="'.get_the_permalink().'" class="ajax-notes cf" data-notes-id="'.get_the_ID().'">'
								.		'<span class="number">'.$count.'</span>'
								.		'<span class="title">'.get_the_title().'</span>'
								.		'<span class="category">'.get_field('description').'</span>'
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
		
			<a data-title="Notes" class="close-btn ajax-page" id="link-notes" href="<?php echo get_permalink(10); ?>" data-page="notes"></a>
			<div id="notes-content-container" class="init">
				<div class="content <?php echo 'notes-'.$type; ?> document" data-notes-id="<?php the_ID(); ?>">
					<iframe src="<?php echo get_field('url') ?>" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
				</div>
			</div>
		</div>
		<?php endwhile; endif; ?>
	</section>
<?php get_footer(); ?>