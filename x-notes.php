<?php 
	
	/*
	Template Name: Notessss
	*/

	get_header(); 
	
?>
	<section id="notes" class="page text content-x">
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
								.	'<div data-title="'.get_the_title().'" data-url="'.get_the_permalink().'" class="ajax-notes cf" data-notes-id="'.get_the_ID().'">'
								.		'<span class="number">'.$count.'</span>'
								.		'<span class="title">'.get_the_title().'</span>';

						echo '<span class="category"><a class="external-url" href="'.get_field('url').'" target="_blank" data-description="'.get_field('description').'">'.get_field('description').'</a></span>';

								
/*
					if (get_field('type') == 'external') {
						echo '<span class="category"><a class="external-url" href="'.get_field('url').'" target="_blank" data-description="'.get_field('description').'">'.get_field('description').'</a></span>';
					} else {
						echo '<span class="category">'.get_field('description').'</span>';
					}
*/
						echo			'<span class="year">'.get_field('year').'</span>'
								.	'</div>'							
								.'</li>';

					$count++;
				    endwhile; 

				echo '</ol>';
			    
			    endif;

				wp_reset_postdata(); 
					
			?>
			</div>

		</div>
		<a data-title="Notes" class="close-btn ajax-page" id="link-notes" href="<?php echo get_permalink(10); ?>" data-page="notes"></a>
		<div id="notes-content-container" class="re-init"></div>
	</section>
<?php get_footer(); ?>