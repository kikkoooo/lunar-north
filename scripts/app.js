$(document).ready(function(){     
	ln.init();
});

$(window).resize(function(){     
 	ln.resize();
});

var ln = {
    page: {
	    current  : null,
	    incoming : null,	    
    },
    init : function() {

		// this.ajaxPagess();
		this.pos();
		// this.navigation();

		// fontSpy('Rational-Regular', {
		//   success: function() {
		//   	ln.movingLine.resize();
		//   	$('.line').fadeIn(200);
		//   },
		//   failure: function() {
		//   	console.log('uh oh!')
		//   }
		// });
		
	}, 
	


	navigation : function() {

		// $('.close-btn').click(function() {
		// 	$('#notes-content-container').animate({
		// 		top: '100%'
		// 	}, 500)
		// })
	},
	
	pos : function() {

        var h = $(window).height(),
            w = $(window).width(),
            $header = $(".header"),
            $navBar = $(".header .nav-bar"),
			$featured = $(".header .featured"),
            navBarH = $navBar.outerHeight(false);

		// Header
		$header.css({
			height: h
		});

		// Featured Box
		$featured.css({
			height: h-navBarH
		});

		$(".header .meta-text").css({
			width : ($(".header .container").innerWidth() - $(".header .logo").outerWidth()) / 2
		});
		
		$(".footer .copyright").css({
			width : ($(".footer").innerWidth() - $(".footer .info").outerWidth()) / 2
		});


		$(".case-study").css({
			width: $(".row").width() * (2/3)
		});


		$(".normal").css({
			width: $(".row").width()/3
		});

		$(".normal .project").height(($(".normal .project").parent().siblings(".case-study").height() - 20) / 2);



	},
	
	resize : function() {

		this.pos();
		// this.movingLine.resize();
		
		
		// if (('#vs .left').length) this.resizeBar.resize();

	},
	
	loadingBar : function(option) {
		
		var $lb = $('.loading-bar'),
			s = 300;
	
		if (option == false) {
			$lb.delay(s).fadeOut(s);
		} else {
			$lb.fadeIn(s);		
		}
			
	},


    waypoints : function() {
	    
	    var $segment = $('.segment');
	    
//	    $('#test').html(ln.page.current);

        $segment.waypoint(function(direction) {
            if (direction === 'down') {

				var la 		= $(this.element).data('latitude'),
					lo 		= $(this.element).data('longitude'),
					mode	= $(this.element).data('mode'),
					imgNum 	= $(this.element).data('image-number'),
					title 	= $(this.element).data('title');
					

				if (ln.page.current == 'work') {

					if (mode == 'day') {
						$('body').stop(true, true).addClass('day').removeClass('night');					
					} else {
						$('body').stop(true, true).addClass('night').removeClass('day');					
					}; 
						
					$('.latitude').html('<span class="direction">N</span>' + la);
					$('.longitude').html('<span class="direction">W</span>' + lo);
					$('.opponent').text(title);
					$('.count .current').text(imgNum);
					$('.tags').hide();
					$('#tag-image-'+imgNum).show();
					
					ln.segment.active = $(this.element);
				}

            }
        }, {
            offset: '25%',
            context: '#work .container'
        });
        
        $segment.waypoint(function(direction) {
            if (direction === 'up') {

				var la 		= $(this.element).data('latitude'),
					lo 		= $(this.element).data('longitude'),
					mode	= $(this.element).data('mode'),
					imgNum 	= $(this.element).data('image-number'),
					title 	= $(this.element).data('title');
					
				if (ln.page.current == 'work') {

					if (mode == 'day') {
						$('body').stop(true, true).addClass('day').removeClass('night');					
					} else {
						$('body').stop(true, true).addClass('night').removeClass('day');					
					}; 
						
					$('.latitude').html('<span class="direction">N</span>' + la);
					$('.longitude').html('<span class="direction">W</span>' + lo);
					$('.opponent').text(title);
					$('.count .current').text(imgNum);
					$('.tags').hide();
					$('#tag-image-'+imgNum).show();
					
					ln.segment.active = $(this.element);
				}

            }
        }, {
            offset: '-25%',
            context: '#work .container'
        });
        
        
		var mouseY;

		$('#work').mousemove(function(e) {
		
	        var h = $(window).height(),
	            w = $(window).width(),
				mouseY = e.pageY;

			if (ln.segment.active.hasClass('first')) {
				$('#work').addClass('bottom').removeClass('top');
				ln.mousePosY = 'down';
			} else if (ln.segment.active.hasClass('last') && ln.segment.last == false ) {
				if (mouseY >= h/2) {
					$('#work').addClass('bottom').removeClass('top');
					ln.mousePosY = 'down';
				} else {
					$('#work').addClass('top').removeClass('bottom');			
					ln.mousePosY = 'up';					
				}
		    } else if (ln.segment.active.hasClass('last') && ln.segment.last == true) {
				$('#work').addClass('top').removeClass('bottom');			
				ln.mousePosY = 'up';
			} else { 
				if (mouseY >= h/2) {
					$('#work').addClass('bottom').removeClass('top');
					ln.mousePosY = 'down';
				} else {
					$('#work').addClass('top').removeClass('bottom');			
					ln.mousePosY = 'up';					
				}
			}
		
		}).mouseover();

        $(document).keydown(function(e) {
			
			if (e.keyCode == 40) { // Down Arrow
				e.stopImmediatePropagation();
				e.preventDefault();
				var next = ln.segment.active.next();
	            if (ln.segment.active.hasClass('last')) {
		            $('#work .container').stop(true).scrollTo($('#work .container footer'), {
		                duration: 200,
		                onAfter: function() {
							ln.segment.last = true;
		                }
		            });
	            } else {
		            $('#work .container').stop(true).scrollTo(next, {
		                duration: 200
		            });
	            }
	            
            } else if (e.keyCode == 38) { // Up Arrow
				e.stopImmediatePropagation();
				e.preventDefault();
	            if (!ln.segment.active.hasClass('first')) {
					var prev = ln.segment.active.prev();
		            $('#work .container').stop(true).scrollTo(prev, {
		                duration: 200,
		                onAfter: function() {
							ln.segment.last = false;
		                }
		            });
	            }
			}
        })

        
		//Slide images
		$('#work .container').click(function(e) {

			e.stopImmediatePropagation();
			e.preventDefault();

			if (ln.page.current == 'work') {
				if (ln.mousePosY != 'up') {
					var next = ln.segment.active.next();
		            if (ln.segment.active.hasClass('last')) {
			            $('#work .container').stop(true).scrollTo($('#work .container footer'), {
			                duration: 200,
			                onAfter: function() {
								ln.segment.last = true;
			                }
			            });
		            } else {
			            $('#work .container').stop(true).scrollTo(next, {
			                duration: 200
			            });
		            }
				} else {
					var prev = ln.segment.active.prev();
		            if (!ln.segment.active.hasClass('first')) {
			            $('#work .container').stop(true).scrollTo(prev, {
			                duration: 200,
			                onAfter: function() {
								ln.segment.last = false;
			                }
			            });
		            }
				}
			}			
		});
	},
	
	ajaxPages : function() {

	    siteUrl = "http://" + top.location.host.toString();
	
		var History			= window.History,
			State 			= History.getState(),
			ajaxContent		= '',
			incomingId		= null,
			clickTarget		= null,
			siteTitle		= 'You VS Jesus';

	    $(document).on('click', '.ajax-page, .ajax-notes', "[href^='" + siteUrl + "']:not([href*='/wp-admin/']):not([href*='/wp-login.php']):not([href$='/feed/'])", function (e) {

			e.preventDefault();

			var path = $(this).attr('href'),
				title = $(this).data('title');
			
			clickTarget = $(this).data('page');
			
			if ($(this).is('.ajax-notes')) {

				path = $(this).data('url');

				ajaxContent = 'notes';
				ln.notes.url = path;


				$('#link-notes').attr('href', ln.notes.url);
				incomingId = $(this).data('notes-id');
				
			} else if ($(this).is('.close-btn')) {
				ajaxContent = 'close';				
				org = $('#link-notes').attr('url');
				$('#link-notes').attr('href', org);
			} else {
				ajaxContent = 'page';								
			}

			if (title != siteTitle) title += ' - ' + siteTitle; 

			History.pushState('ajax', title, path);

		});

		$('.ajax-notes a').click(function(e) { e.stopPropagation(); })

		function currentPage() {
			currentState = History.getState();
	        activeUrl = currentState.url; 
			$activeContent = $('.page-link[href="' + activeUrl + '\"]');
			$('.page-link').removeClass('active');
			$activeContent.addClass('active');
		}

		// Load Data Images if landing homepage
		if ($('#work').hasClass('init')) {
			ln.page.current = 'work';
			ln.getFlickrData();
			ln.pageLoaded.hp = true;
		}

		if (!$('#work').length) {
			ln.loadingBar(false);
		}

		// Init for single notes landing
		if ($('#notes-content-container').hasClass('init') && ln.notes.init != true) {
		
			ln.notes.init = true;
			ln.notes.toggle = true;
			
			currentState = History.getState(); // Note: Using History.getState() instead of event.state
			ln.notes.url = currentState.url;

			$('#link-notes').attr('href', ln.notes.url);
			
// 			ln.loadingBar(false);
			
			initIframe();
			$('#site-header').addClass('notes-x');

			
// 			$('#notes-content-container .content').attr('notes-id');
			ln.notes.current = $('#notes-content-container .content').data('notes-id');

			$('.close-btn').fadeIn(100);			

			
		}





	    History.Adapter.bind(window, 'statechange', function() {
	        if (ajaxContent == 'page') { 
		        loadPageAjax();
	        } else if (ajaxContent == 'notes') { 
		        loadNotesAjax();
	        } else {
		        closeNotes();
			}
	    });
		
		function closeNotes() {
			State = History.getState();
			$('.close-btn').fadeOut(100);			
			$('#notes-content-container').stop(true).animate({
				top: '100%'
			}, { 
				duration: 150,
				queue: false,
				complete: function() {
					ln.loadingBar(false);
					$('#site-header').removeClass('notes-x');
				}
			});
		}
		
		function loadContent(iframeContent) {
			$('.close-btn').fadeIn(100);			
			if (ln.notes.current != incomingId) {
				$('#notes-content-container').html(iframeContent);
				initIframe();
/*
				$('#notes-content-container').html(iframeContent).promise().done(function(){
					initIframe();
			    });
*/
				ln.notes.current = $('#notes-content-container .content').data('notes-id');		    
			}
		}

	    function initIframe() {
/*
			$iframe = $('#notes-content-container').find('iframe');				
			$('iframe').attr('src', $iframe.attr('data-url'));
			$('iframe').attr('src', $iframe.data('url'));
*/
			$('iframe').load(function() {
				$('iframe').show();
				ln.loadingBar(false);
			});
	    }

		function loadNotesAjax() {
			State = History.getState();
			$.ajax({
	            url: State.url,
			    tryCount : 0,
			    retryLimit : 3,
				beforeSend: function() {

					if (ln.notes.current != incomingId) {
						$('#notes-content-container').html('');
						ln.loadingBar(true);						
					}
				},

				success: function(respond){

					content = $(respond).find('.content');


					if (ln.notes.init != true && $('#notes-content-container .content').length == 0) {
						
						$('#notes-content-container').stop().animate({
							top: 0
						}, { 
							duration: 250,
							complete: function() {
								$('#site-header').addClass('notes-x');
								loadContent(content);
							}
						});

					} else {

						$('#notes-content-container').stop().animate({
							top: 0							
						}, { 
							duration: 250,
							complete: function() {
								$('#site-header').addClass('notes-x');								
								loadContent(content);
							}
						});
					}

//					ln.notes.current = content.data('notes-id');

					ln.notes.toggle = true;
					ln.notes.init = true;
					ln.pos();
				}
			});	
	
		};

		function slideThis(objId) {

			// Slide and hide the outgoing pages
			$('#'+objId).css('opacity', 1).stop().animate({
				left: '0'
			}, { 
				duration: 200,
				queue: false,
			});

			// Slide incoming page
			$('.page').not('#'+objId).stop().animate({
				left: '-100%'
			}, { 
				duration: 200,
				queue: false,
				beforeSend: function() {
				},
				complete: function() {

					$(this).css({
						left: '100%',
						opacity: 0
					});
					if ($(this).not('#work')) {
						$(this).scrollTop(0);
					}
					
					if (ln.notes.toggle == true && objId != 'notes') {
						$('#site-header').removeClass('notes-x');								
					} else if (ln.notes.toggle == true && objId == 'notes') {
						$('#site-header').addClass('notes-x');
					} else if (ln.notes.toggle == false) {
						$('#site-header').removeClass('notes-x');								
					}
															
				}
			});
			ln.pos();
			
			// Scroll to current
			if (objId == 'work' && ln.segment.active.length) {
	            $('#work .container').stop().scrollTo(ln.segment.active, {
	                duration: 500
	            });
			}
			
			
		}

		// Load Ajax
		function loadPageAjax() {

			if (clickTarget == 'work' && ln.pageLoaded.hp == true) {
				slideThis('work');
				ln.page.current = 'work';
				
			} else if (clickTarget == 'notes' && ln.pageLoaded.notes == true) {	
				slideThis('notes');
				ln.page.current = 'notes';
				
			} else if (clickTarget == 'info' && ln.pageLoaded.info == true) {
				slideThis('info');					
				ln.page.current = 'info';

			} else {
				
				ln.loadingBar(true);
											
				State = History.getState();
				$.ajax({
		            url: State.url,
				    tryCount : 0,
				    retryLimit : 3,
					beforeSend: function() {
					},
					success: function(respond){
	
						var content	= $(respond).find('.page'),
							objId	= content.attr('id');
						
						//Homepage
						if (content.is('#work') && ln.pageLoaded.hp != true) {
							$('#content-container').append(content);
							ln.getFlickrData();
							ln.pageLoaded.hp = true;
													
						} else if (content.is('#info') && ln.pageLoaded.info != true) {
							$('#content-container').append(content);
							ln.pageLoaded.info = true;
	
						} else if (content.is('#notes') && ln.pageLoaded.notes != true) {
							$('#content-container').append(content);
							ln.notes.init = true;
							ln.pageLoaded.notes = true;
						}				
						
						ln.page.current = objId;
						slideThis(objId);
						currentPage();
	
					},
					complete: function() {
						if (clickTarget != 'work') ln.loadingBar(false);
					},
				});	
			}
		}
	}
}