$(document).ready(function(){     
	ln.init();
});

$(window).resize(function(){     
 	ln.resize();
});

var ln = {
	gutter: 20,
	featured: true,
    page: {
	    current  : null,
	    incoming : null,	    
    },
    screen: {
    	mode	: null
    },

    init : function() {

		// this.ajaxPagess();

		this.detectSize();
		this.pos();

		this.initImages();
		this.introImage();
		this.initSticky();
		this.navigation();
		this.initReel();



		$(".video-project").fitVids();
        // $('.vimeo-project').smartVimeoEmbed({
        //     width: 1280,
        //     onComplete: function() {
        //         $(this).fitVids();
        //     },
        //   onError: function() {
	       //    // Fallback image
	       //    var bi = $(this).attr('data-error');
	       //    $(this).attr('src', bi);
        //   }
        // });




	}, 
	
	initImages : function () {

		// Might not be necessary for now
		var count = 1;

		$(".case-study .thumbnail").one("load", function() {
			h = $(this).closest(".case-study").height();
			$project = $(this).closest(".case-study").siblings(".normal").find(".project");
			console.log($project.length);
			count++;
		}).each(function() {
			if(this.complete) $(this).load();
		});

	},

    initReel : function() {

        $('.vimeo-thumb').smartVimeoEmbed({
            width: 1280,
            onComplete: function() {
                // $('#featured').fitVids();
                $(this).parent().fitVids();
            },
          onError: function() {
	          // Fallback image
	          var bi = $(this).attr('data-error');
	          $(this).attr('src', bi);
          }
        });

    },

    introImage : function() {

		var $introImage = $('.preview-intro-image'),
			introImageObj = $introImage.data('intro-image');
		// if ($introImage.length) $introImage.backstretch(introImageObj, {fade: 100});
		if ($introImage.length) $introImage.backstretch(introImageObj);


    },

	navigation : function() {

		// Menu
		$(".menu-button a").click(function(e) {
			e.preventDefault();
			var $menu = $(".menu-box");

			if ($menu.is(":visible")) {
				$menu.fadeOut(200);
			} else {
				$menu.fadeIn(200);
			}
		});

		// NAV 
		$(".menu-button a").hover(function () {

			$btn = $(this);

			if ($btn.data("animated") == false){
				$btn.animateSprite({
				    fps: 15,
					loop: false,
				    complete: function () {
				        $btn.animateSprite('frame', 0);
				    }
				});
				$btn.data("animated", true);
			} else {
				$btn.animateSprite("restart");
			}

		}, function () {
			$(this).animateSprite('stop').animateSprite('frame', 0);
		});

		// PROJECT 

		$(".project .link").hover(function () {

			$tar = $(this).children(".animation-rollover");
			$link = $(this);

			console.log("hover");

			if ($link.data("animated") == false) {
				$tar.animateSprite({
				    fps: 15,
					loop: false,
				    complete: function () {
				        $link.animateSprite('frame', 0);
				    }
				});
				$link.data("animated", true);
			} else {
				$tar.animateSprite("restart");
			}

		}, function () {
			console.log("out");			
			$(this).find(".animation-rollover").animateSprite('stop').animateSprite('frame', 0);
		});		


	},
	
	pos : function() {

        var h = $(window).height(),
            w = $(window).width(),
            $header = $(".header"),
			$featured = $("#featured"),
			$main = $("#main"),
            headerH = $header.outerHeight(false);


        // if (ln.featured == true) {
			// Featured
			$featured.css({
				height: h-headerH
			});

			// $main.css({
			// 	top: h-headerH
			// });
		// }

		// Header sub text
		$(".header .sub-text").css({
			width : ($(".header .container").innerWidth() - $(".header .logo").outerWidth()) / 2
		});
		
		$(".footer .copyright").css({
			width : ($(".footer").innerWidth() - $(".footer .info").outerWidth()) / 2
		});


		// Thumbnails
		var caseStudyColW = ($(".row").width() * (2/3)) - (ln.gutter * 1.5),
			normalColW = ($(".row").width()/3) - (ln.gutter * 1.5);

		// case-study col
		$(".case-study").css({
			width: caseStudyColW,
			height: (caseStudyColW) * (9/16)
		});

		// case-study .thumbs
		$(".case-study .thumbnail").css({
			width: caseStudyColW,
			height: (caseStudyColW) * (9/16)
		});


		// normal col
		$(".normal").css({
			width: normalColW,
			height: (caseStudyColW) * (9/16)			
		});

		// normal .thumbs
		$(".normal .thumbnail").css({
			width: normalColW,
			height: ((caseStudyColW) * (9/16) / 2) - ln.gutter/2
		});



		// gutter
		// horizontal gutter
		$(".row.right .case-study, .row.left .normal").css({
			marginTop : ln.gutter/2,
			marginRight : ln.gutter,
			marginBottom : ln.gutter/2,
			marginLeft : ln.gutter/2,
		});

		$(".row.right .normal, .row.left .case-study").css({
			marginTop : ln.gutter/2,
			marginRight : ln.gutter/2,
			marginBottom : ln.gutter/2,
			marginLeft : ln.gutter,
		});

		// vertical gutter for normal column
		$(".normal .project:first-child").css({
			marginBottom : ln.gutter/2,
		});		

		$(".normal .project:last-child").css({
			marginTop : ln.gutter/2,
		});		

		$(".content .images").css({
			marginBottom : ln.gutter
		})

		$(".col-2 .col").each(function() {

			var cw = $(this).parent().width()/2;

			$(this).css({
				width : cw - ln.gutter/2
			});

			if ($(this).is(':first-child')) {
				$(this).css({
					marginRight : ln.gutter
				});
			}
		});






		// Make Vimeo proportional and responsive on Width
		var videoContent = $('.video-content'),
			videoW = 1920,
			videoH = 1080,
			videoRatio = videoW/videoH;

		videoContent.css({
			//maxWidth: videoContent.parent().height() * videoRatio
			// width: videoContent.parent().height() * videoRatio
			maxHeight: videoContent.parent().width() * videoRatio			
		});


	},

	detectSize : function() {

		ww = $(window).width();

		if (ww <= 500) {
	        ln.screenMode = "mobile";
        /* Tablet */
		} else if (ww <= 900) {
	        ln.screenMode = "mobile";
        /* Desktop */
        } else {
	        ln.screenMode = "desktop";
        }

		if (ln.screenMode == "mobile") {
			ln.gutter = 6;
		} else {
			ln.gutter = 20;
		}

	},
	
	resize : function() {


		this.detectSize();
		this.pos();


		// Resize normal project thumbnails to compensate for the margins
		// $(".normal .project").each(function() {
		// 	$(this).height(($(this).closest(".normal").siblings(".case-study").height() - 20) / 2);
		// });
		// this.movingLine.resize();
	},
	
	// loadingBar : function(option) {
		
	// 	var $lb = $('.loading-bar'),
	// 		s = 300;
	
	// 	if (option == false) {
	// 		$lb.delay(s).fadeOut(s);
	// 	} else {
	// 		$lb.fadeIn(s);		
	// 	}
			
	// },

	initSticky : function() {

		$navBar = $(".header");
		function sticky() {

			$navBar.sticky({ 
				topSpacing: 0,
				zIndex: 100 
			});

			$navBar.on('sticky-start', function() { 

				console.log("sticking");

				ln.featured = false;
				// $("#featured").hide();
				// $("#main").css({
				// 	top: 0
				// });
				// $(window).scrollTo(0);

			});

			$navBar.on('sticky-end', function() { 

				console.log("stop sticking");
				var $menuBox = $(".menu-box");
				$menuBox.fadeOut(200);

			});

		}

		sticky();

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