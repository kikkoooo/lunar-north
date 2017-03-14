		<footer class="footer">
			<div class="container cf">
				<div class="info cf">
					<div class="inner">
						<div class="logo">
							<a class="align-v" href="#"><?php echo file_get_contents(get_stylesheet_directory_uri().'/images/ln-logo.svg'); ?></a>
						</div>
						<div class="contact">
							<p class="">hello@lunarnorth.tv <br>645 Griswold St, Suite 2300<br> Detroit, MI 48226</p>
						</div>
						<div class="social-media">
							<ul class="align-v cf">
								<li><a href="https://www.facebook.com/lunarnorthdesign/" target="_blank"><?php echo file_get_contents(get_stylesheet_directory_uri().'/images/ln-social-fb.svg');?></a></li>
								<li><a href="https://www.instagram.com/lunarnorthdesign/" target="_blank"><?php echo file_get_contents(get_stylesheet_directory_uri().'/images/ln-social-ig.svg');?></a></li>
							</ul>
	 					</div>
					</div>
				</div>
				<div class="copyright">
					<p class="align-v">Space Camp LLC &copy; <?php echo date("Y"); ?></p>
				</div>
			</div>
		</footer>
	</div>
	<?php wp_footer(); ?>	
</body>
</html>
