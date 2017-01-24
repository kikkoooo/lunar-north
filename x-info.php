<?php 
	/*
	Template Name: Info
	*/

	get_header(); 
?>
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<section id="info" class="page text content-x">
		<div class="container cf">
			<div class="col contact-info">
				<div class="section contact">
					<ul>
						<li>Graphic Design, Research &&nbsp;Code</li>
						<li>1501 Division<br/>Detroit, MI 48207 USA</li>
						<li><a href="#" class="cf">kikko@youvsjesus.com</a></li>
						<li>+1 (313) 450-5644</li>						
					</ul>
				</div>
				<div class="image">
					<img src="<?php echo get_template_directory_uri(); ?>/images/infoxx.png">
				</div>
				<div class="section social">
					<ul>
						<li><a href="https://twitter.com/youvskikko" target="_blank">Twitter</a></li>
						<li><a href="https://www.instagram.com/kikkkkooooo/" target="_blank">Instagram</a></li>
					</ul>
				</div>
			</div>
			<div class="col description">
				<?php the_content(); ?>					
			</div>
		</div>
	</section>
	<?php endwhile; endif; ?>
<?php get_footer(); ?>