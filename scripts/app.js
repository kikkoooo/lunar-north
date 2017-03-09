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
	    loaded 	 : {
	    	home : null,
	    	about : null,
	    	work : null,
	    }
    },
    screen: {
    	mode	: null
    },

    map : null,

    init : function() {




		this.detectSize();
		this.pos();


		this.reel.init();
		this.embedVideo($(".video-vimeo"));
		this.embedVideo($(".video-youtube"));

		this.initImages();
		this.initSticky();
		this.navigation();

		this.ajaxPages();

		this.initMap();

		// $(".video-project, .video, .reel-container").fitVids();

	}, 

    reel : {

    	el : $(".reel-container"),

    	init: function() {
    		this.ratio();
    		ln.embedVideo(this.el.find(".video"));
    	},

    	ratio : function() {

			var videoW = 1920,
				videoH = 1080,
				videoRatio = videoW/videoH,
				el = this.el;

			function setMax() {
				el.css({
					maxHeight: el.parent().width() * videoRatio,
					maxWidth: el.parent().height() * videoRatio,
				});
			}
			setMax();
			$(window).resize(setMax);

    	}
    
    },

    embedVideo : function(tar) {

    	// If Vimeo
    	if (tar.data("vimeo-id")) {

	        tar.smartVimeoEmbed({
	            width: 1280, //vimeo thumnail image
	            onComplete: function() {
	                $(this).parent().fitVids();
	            },

	          onError: function() {
		          // Fallback image
		          var bi = $(this).attr('data-error');
		          $(this).attr('src', bi);
	          }

	        });

    	// If Youtube
	     } else {

			var embedYoutube = function(el) {
				var v = el;
					$.each(v, function(n) {
						var i = getThumb($(this).data('youtube-id')),
						p = $('<div class="youtube-thumb-container">' + i + '</div>');
						p.appendTo($(this))
					p.click(makeIframe);
				});
			}

			embedYoutube(tar);

			svg = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 68 60" style="enable-background:new 0 0 68 60;" xml:space="preserve"><polygon fill="white" points="0,61 15,30.5 0,0 68.6,30.5 "/></svg>';
			
			function getThumb(id) {
				return '<img class="youtube-thumb" src="//i2.ytimg.com/vi/' + id + '/maxresdefault.jpg"><span class="play-icon">'+ svg +'</span>';
			}

			function makeIframe() {
				var url = '//www.youtube.com/embed/' + $(this).parent().data('youtube-id') + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=0&showinfo=0'
				var iframe = $('<iframe src="' + url + '" frameborder="0" scrolling="no" class="youtube-iframe"></iframe>');
				$(this).replaceWith(iframe);
				$('.video-youtube').fitVids();
			}

		}
    },













	initImages : function () {

		// Might not be necessary for now
		var count = 1;

		$(".case-study .thumbnail").one("load", function() {
			h = $(this).closest(".case-study").height();
			$project = $(this).closest(".case-study").siblings(".normal").find(".project");
			// console.log($project.length);
			count++;
		}).each(function() {
			if(this.complete) $(this).load();
		});

	},

	navigation : function() {

		// Menu
		$(".menu-button a").click(function(e) {
			e.preventDefault();
			var $menu = $(".menu-box");

			if ($menu.is(":visible")) {
				$menu.fadeOut(200);
			} else {
				
				//$menu.fadeIn(200);

				$menu.velocity("transition.slideDownIn", 500);

			}
		});

		$(".nav-toggle").click(function() {
			$(this).toggleClass("active");
		});

		// // NAV 
		// $(".menu-button a").hover(function () {

		// 	$btn = $(this);

		// 	if ($btn.data("animated") == false){
		// 		$btn.animateSprite({
		// 		    fps: 30,
		// 			loop: false,
		// 		    complete: function () {
		// 		        $btn.animateSprite('frame', 0);
		// 		    }
		// 		});
		// 		$btn.data("animated", true);
		// 	} else {
		// 		$btn.animateSprite("restart");
		// 	}

		// }, function () {
		// 	$(this).animateSprite('stop').animateSprite('frame', 0);
		// });



		// PROJECT 
		$(".project .link").mouseenter(function() {

			$(this).addClass('hover');
			$hover = $(".hover");

			// 2 seconds
			$hover.find(".thumbnail").velocity({width: "110%", height: "110%"}, {queue:false, duration: 1400, easing: "easeOutQuint"});
			$hover.find(".triangle-small").velocity({opacity: 0, scaleX: 0, scaleY: 0}, {queue:false, duration: 50}).velocity({opacity:1, scaleX: 1, scaleY: 1}, {delay: 0, queue:false, duration: 800});		
			$hover.find(".outer").velocity({opacity: 1}, {queue:false, duration: 100}).velocity({opacity:0, scaleX: 0, scaleY: 0}, {delay: 200, queue:false, duration: 400});		

			$hover.find(".divider-1").velocity({x1: 0}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});
			$hover.find(".divider-2").velocity({x2: "100%"}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});

			$hover.find(".client").velocity({opacity: 1, marginBottom: "2.5em"}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});
			$hover.find(".title").velocity({opacity: 1, marginTop: "3em"}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});

		}).mouseleave(function() {

			$hover = $(".hover");

			$hover.find(".thumbnail").velocity("stop").velocity({width: "100%", height: "100%"}, {queue:false, duration: 200, easing: "easeOutQuint"});
			$hover.find(".triangle-small").velocity("stop").velocity({opacity: 0, scaleX: 1, scaleY: 1}, {queue:false, duration: 200});
			$hover.find(".outer").velocity("stop").velocity({opacity:0, scaleX: 1, scaleY: 1}, {delay: 0, queue:false, duration: 200});		

			$hover.find(".divider-1").velocity("stop").velocity({x1: "40%"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});
			$hover.find(".divider-2").velocity("stop").velocity({x2: "60%"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});

			$hover.find(".client").velocity("stop").velocity({opacity: 0, marginBottom: "1em"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});
			$hover.find(".title").velocity("stop").velocity({opacity: 0, marginTop: "1em"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});

			$(this).removeClass('hover');
		});

		$(".logo a").mouseenter(function() {
			$(this).addClass('hover');
			$(".hover").find(".triangle").velocity({fill: "#00ADEE"}, {queue:false, duration: 200});
		}).mouseleave(function() {
			$(".hover").find(".triangle").velocity("stop").velocity({fill: "#585A5A"}, {queue:false, duration: 200});
			$(this).removeClass('hover');
		});


	},
	
	navSvg : function() {

		// PROJECT 
		$(".project .link").mouseenter(function() {

			$(this).addClass('hover');

			$hover = $(".hover");

			// 2 seconds
			$hover.find(".thumbnail").velocity({width: "110%", height: "110%"}, {queue:false, duration: 1400, easing: "easeOutQuint"});
			$hover.find(".triangle-small").velocity({opacity: 0, scaleX: 0, scaleY: 0}, {queue:false, duration: 50}).velocity({opacity:1, scaleX: 1, scaleY: 1}, {delay: 0, queue:false, duration: 800});		
			$hover.find(".outer").velocity({opacity: 1}, {queue:false, duration: 100}).velocity({opacity:0, scaleX: 0, scaleY: 0}, {delay: 200, queue:false, duration: 400});		

			$hover.find(".divider-1").velocity({x1: 0}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});
			$hover.find(".divider-2").velocity({x2: "100%"}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});

			$hover.find(".client").velocity({opacity: 1, marginBottom: "2.5em"}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});
			$hover.find(".title").velocity({opacity: 1, marginTop: "3em"}, {delay: 500, queue:false, duration: 400, easing: "easeOutQuint"});

		}).mouseleave(function() {

			$hover = $(".hover");

			$hover.find(".thumbnail").velocity("stop").velocity({width: "100%", height: "100%"}, {queue:false, duration: 200, easing: "easeOutQuint"});
			$hover.find(".triangle-small").velocity("stop").velocity({opacity: 0, scaleX: 1, scaleY: 1}, {queue:false, duration: 200});
			$hover.find(".outer").velocity("stop").velocity({opacity:0, scaleX: 1, scaleY: 1}, {delay: 0, queue:false, duration: 200});		

			$hover.find(".divider-1").velocity("stop").velocity({x1: "40%"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});
			$hover.find(".divider-2").velocity("stop").velocity({x2: "60%"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});

			$hover.find(".client").velocity("stop").velocity({opacity: 0, marginBottom: "1em"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});
			$hover.find(".title").velocity("stop").velocity({opacity: 0, marginTop: "1em"}, {delay: 0, queue:false, duration: 200, easing: "easeOutQuint"});

			$(this).removeClass('hover');
		});


	},

	pos : function() {

        var h = $(window).height(),
            w = $(window).width(),
            $header = $(".header"),
			$featured = $("#featured"),
			$main = $("#main"),
            headerH = $header.outerHeight(false);

        // Adjust tagline widths
		$header.find(".tagline").css({
			width: ($header.find(".ln-container").innerWidth() - $header.find(".logo").outerWidth()) / 2
		});



        // if (ln.featured == true) {
			// Featured
			$featured.css({
				height: h-headerH
			});

			// $(".x").css({
			// 	top: headerH
			// });

			// $main.css({
			// 	top: h-headerH
			// });
		// }

		// Header sub text
		



		// Footer floating boxes

		if (ln.screen.mode != "small") {
			var elementHeights = $(".footer .inner > div").not(".copyright").map(function() {
				return $(this).height();
			}).get();
			var maxHeight = Math.max.apply(null, elementHeights);
			$(".footer .inner > div, .copyright").height(maxHeight);
		} else {
			$(".footer .inner > div, .copyright").height("auto");
		}


		if (ln.screen.mode == "large") {

	        var calc = $(".footer .inner").outerWidth();
			$(".footer .copyright").css({
				width : ($(".footer .info").innerWidth() - calc) / 2,
			});

		} else {
			$(".footer .copyright").css({
				width : "100%"
			});
		}

		// Thumbnails
		var caseStudyColW = ($(".row").width() * (2/3)) - (ln.gutter * .5),
			normalColW = ($(".row").width()/3) - (ln.gutter * .5);


		if (ln.screen.mode == "small") {

			$(".case-study").css({
				width: "100%",
				height: "auto"
			});



		} else if (ln.screen.mode == "medium") {

			$(".case-study").css({
				width: "100%",
				height: "auto"
			});

			$(".normal").css({
				width: "100%",
				height: "auto"
			});



		} else {

			// normal col
			$(".case-study").css({
				width: caseStudyColW,
				height: (caseStudyColW) * (9/16)
			});

			$(".normal").css({
				width: normalColW,
				height: (caseStudyColW) * (9/16)			
			});

		}

		// $(".video-main").css({
		// 	width: "100%",
		// 	height: w * (9/16),
		// })

		$(".content-container .video").css({
			width: "100%",
			height: (w - ln.gutter*2) * (9/16),
		})

		// // normal col
		// $(".normal").css({
		// 	width: normalColW,
		// 	height: (caseStudyColW) * (9/16)			
		// });
		$row = $(".row");

		if (ln.screen.mode == "small") {

			$(".normal .project, .normal .thumbnail").css({			
				width: "100%",
				height: $row.width() * (9/16),
			});

			$(".case-study .project, .case-study .thumbnail").css({
				width: "100%",
				height: $row.width() * (9/16),
			});


		} else if (ln.screen.mode == "medium") {

			$(".normal .project").css({			
				width: ($row.width() / 2) - ln.gutter/2,
				height: ($row.width() / 2) * (9/16),
			});


			$(".normal .thumbnail").css({			
				width: "100%",
				height: ($row.width() / 2) * (9/16),
			});

			$(".case-study .project, .case-study .thumbnail").css({
				width: "100%",
				height: $row.width() * (9/16),
			});

		} else {

			// normal col
			$(".normal .project, .normal .thumbnail").css({			
				width: normalColW,
				height: ((caseStudyColW) * (9/16) / 2) - ln.gutter/2,
			});

			$(".case-study .project, .case-study .thumbnail").css({
				width: caseStudyColW,
				height: (caseStudyColW) * (9/16),
			});



		}



		// // normal .thumbs
		// $(".normal .project, .normal .thumbnail").css({			
		// 	width: normalColW,
		// 	height: ((caseStudyColW) * (9/16) / 2) - ln.gutter/2
		// });


		// gutter
		// horizontal gutter


		$(".row:nth-child(2n+0) .case-study, .row:nth-child(3n+0) .normal").css({
			marginTop : ln.gutter/2,
			marginBottom : ln.gutter/2,
			marginLeft : ln.gutter/2,
		});

		$(".row:nth-child(2n+0) .normal, .row:nth-child(3n+0) .case-study").css({
			marginTop : ln.gutter/2,
			marginRight : ln.gutter/2,
			marginBottom : ln.gutter/2,
		});


		// $(".row.right .case-study, .row.left .normal").css({
		// 	marginTop : ln.gutter/2,
		// 	marginBottom : ln.gutter/2,
		// 	marginLeft : ln.gutter/2,
		// });

		// $(".row.right .normal, .row.left .case-study").css({
		// 	marginTop : ln.gutter/2,
		// 	marginRight : ln.gutter/2,
		// 	marginBottom : ln.gutter/2,
		// });






		// vertical gutter for normal column
		// $(".normal .project:first-child").css({
		// 	marginBottom : ln.gutter/2,
		// });		

		// $(".normal .project:last-child").css({
		// 	marginTop : ln.gutter/2,
		// });		

		if (ln.screen.mode == "medium") {

			$(".normal .project:first-child").css({
				marginBottom : 0,
			});		

			$(".normal .project:last-child").css({
				marginTop : 0,
			});		

		
		} else {

			$(".normal .project:first-child").css({
				marginBottom : ln.gutter/2,
			});		

			$(".normal .project:last-child").css({
				marginTop : ln.gutter/2,
			});		


		}





		$(".content-container .images").not(":last-child").css({
			marginBottom : ln.gutter
		});

		$(".col-2 .col").each(function() {

			
			var cw = $(this).parent().width()/2;

			if (ln.screen.mode == "small" && $(this).parent().hasClass("info")) {

				$(this).css({
					width : "100%",
					marginRight : 0
				});

			} else {

				$(this).width(cw - ln.gutter/2);	

				if ($(this).is(":first-child")) {
					$(this).css({
						marginRight : ln.gutter
					});
				}

			}













		});


		// $(".col-2 .col").each(function() {

		// 	var cw = $(this).parent().width()/2;

		// 	$(this).css({
		// 		width : cw - ln.gutter/2
		// 	});

		// 	if ($(this).is(':first-child')) {
		// 		$(this).css({
		// 			marginRight : ln.gutter
		// 		});
		// 	}
		// });







	},

	detectSize : function() {

		ww = $(window).width();

		if (ww <= 600) {
	        ln.screen.mode = "small";
        /* Tablet */
		} else if (ww <= 900) {
	        ln.screen.mode = "medium";
        /* Desktop */
        } else {
	        ln.screen.mode = "large";
        }

		if (ln.screen.mode == "small") {
			ln.gutter = 6;
		} else {
			ln.gutter = 20;
		}

		if (ln.screen.mode != "large") {
			$('#header').sticky('update');
		}

		console.log(ln.screen.mode);

		// var videoContent = $('.reel-container'),
		// 	videoW = 1920,
		// 	videoH = 1080,
		// 	videoRatio = videoW/videoH;

		// videoContent.css({
		// 	maxWidth: videoContent.parent().height() * videoRatio
		// });		

	},
	
	resize : function() {


		this.detectSize();
		this.pos();


		// Resize normal project thumbnails to compensate for the margins
		// $(".normal .project").each(function() {
		// 	$(this).height(($(this).closest(".normal").siblings(".case-study").height() - 20) / 2);
		// });
		// this.movingLine.resize();

		// var videoContent = $('.reel-container'),
		// 	videoW = 1920,
		// 	videoH = 1080,
		// 	videoRatio = videoW/videoH;

		// videoContent.css({
		// 	maxWidth: videoContent.parent().height() * videoRatio
		// });



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

				ln.featured = false;
				// $("#featured").hide();
				// $("#main").css({
				// 	top: 0
				// });
				// $(window).scrollTo(0);

			});

			$navBar.on('sticky-end', function() { 

				var $menuBox = $(".menu-box");
				$menuBox.fadeOut(200);

				$(".nav-toggle").removeClass("active");

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
        });

        
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
			incomingPageId	= null,
			incomingWorkId	= null,
			siteTitle		= 'You VS Jesus';

	    $(document).on('click', '.ajax.link', "[href^='" + siteUrl + "']:not([href*='/wp-admin/']):not([href*='/wp-login.php']):not([href$='/feed/'])", function (e) {

			e.preventDefault();

			var path = $(this).attr('href'),
				title = $(this).data('title');
			
			// clickTarget = $(this).data('page');
			
			ajaxContent = 'page';								

			// If home
			// if ($(this).data("page-id") == "home" || $(this).data("page-id") == "about") {
			// 	incomingPage = (this).data("page-id");
			// } else {

			// }

			incomingPageId = $(this).data("page-id");
			console.log(incomingPageId);


			// alert(incomingPage);



			// if ($(this).is('.ajax-home')) {
			// 	incomingPage 
			// }

			// if ($(this).is('.ajax-notes')) {
			// 	path = $(this).data('url');
			// 	ajaxContent = 'notes';
			// 	ln.notes.url = path;
			// 	$('#link-notes').attr('href', ln.notes.url);
			// 	incomingId = $(this).data('notes-id');
			// }

			if (title != siteTitle) title += ' - ' + siteTitle; 

			History.pushState('ajax', title, path);

		});


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

		// if (!$('#work').length) {
		// 	ln.loadingBar(false);
		// }

	    History.Adapter.bind(window, 'statechange', function() {
			loadPageAjax();

	  //       if (ajaxContent == 'page') { 
		 //        loadPageAjax();
			// }

	    });
		
		// function closeNotes() {
		// 	State = History.getState();
		// 	$('.close-btn').fadeOut(100);			
		// 	$('#notes-content-container').stop(true).animate({
		// 		top: '100%'
		// 	}, { 
		// 		duration: 150,
		// 		queue: false,
		// 		complete: function() {
		// 			ln.loadingBar(false);
		// 			$('#site-header').removeClass('notes-x');
		// 		}
		// 	});
		// }
		

		// function slideThis(objId) {

		// 	// Slide and hide the outgoing pages
		// 	$('#'+objId).css('opacity', 1).stop().animate({
		// 		left: '0'
		// 	}, { 
		// 		duration: 200,
		// 		queue: false,
		// 	});

		// 	// Slide incoming page
		// 	$('.page').not('#'+objId).stop().animate({
		// 		left: '-100%'
		// 	}, { 
		// 		duration: 200,
		// 		queue: false,
		// 		beforeSend: function() {
		// 		},
		// 		complete: function() {

		// 			$(this).css({
		// 				left: '100%',
		// 				opacity: 0
		// 			});
		// 			if ($(this).not('#work')) {
		// 				$(this).scrollTop(0);
		// 			}
					
		// 			if (ln.notes.toggle == true && objId != 'notes') {
		// 				$('#site-header').removeClass('notes-x');								
		// 			} else if (ln.notes.toggle == true && objId == 'notes') {
		// 				$('#site-header').addClass('notes-x');
		// 			} else if (ln.notes.toggle == false) {
		// 				$('#site-header').removeClass('notes-x');								
		// 			}
															
		// 		}
		// 	});
		// 	ln.pos();
			
		// 	// Scroll to current
		// 	if (objId == 'work' && ln.segment.active.length) {
	 //            $('#work .container').stop().scrollTo(ln.segment.active, {
	 //                duration: 500
	 //            });
		// 	}
			
			
		// }

		// Load Ajax
		function loadPageAjax() {

			// ln.loadingBar(true);
										
			State = History.getState();

			$.ajax({
	            url: State.url,
			    tryCount : 0,
			    retryLimit : 3,
				beforeSend: function() {
				},
				success: function(respond){


					// var content	= $(respond).find('.page').html();
						// objId	= content.attr('id');
					var content;

						// $("ul[data-slide='" + current +"']");

						if (incomingPageId == "home") {

							content	= $(respond).find('.data-home').html();

							$('#project-detail-container, #about-container').fadeOut(200, function() {
								$('#projects-container').html(content).fadeIn(200, function() {
								$('#project-detail-container').empty();
									ln.detectSize();
									ln.pos();
									ln.initImages();
									ln.initReel();
									ln.navSvg();
									$(window).scrollTo("#main", 500);
								});
							});

						} else if (incomingPageId == "about") {

							content	= $(respond).find('.data-about').html();

							$("#projects-container, #project-detail-container").fadeOut(200, function() {
								$('#about-container').html(content).fadeIn(200, function() {
									ln.detectSize();
									ln.pos();
									ln.initImages();
									ln.initReel();
									ln.initMap();
									$(window).scrollTo("#main", 500);
								});
							});

						} else {

							content	= $(respond).find('.data-work').html();

							$("#projects-container, #about-container").fadeOut(200, function() {
								$('#project-detail-container').html(content).fadeIn(200, function() {
									ln.detectSize();
									ln.pos();
									ln.initImages();
									ln.initReel();
									// ln.embedVideo($(".video-vimeo"));
									$(window).scrollTo("#main", 500);
								});
							});
						};

										
					//Homepage
					// if (content.is('#work') && ln.pageLoaded.hp != true) {
					// 	$('#content-container').append(content);
					// 	ln.getFlickrData();
					// 	ln.pageLoaded.hp = true;
												
					// } else if (content.is('#info') && ln.pageLoaded.info != true) {
					// 	$('#content-container').append(content);
					// 	ln.pageLoaded.info = true;

					// } else if (content.is('#notes') && ln.pageLoaded.notes != true) {
					// 	$('#content-container').append(content);
					// 	ln.notes.init = true;
					// 	ln.pageLoaded.notes = true;
					// }				
					
					// ln.page.current = objId;
					// slideThis(objId);
					//currentPage();

				},
				complete: function() {
					// if (clickTarget != 'work') ln.loadingBar(false);


				},
			});	
		}
	},

	initMap : function() {

		//gmaps.js
		//https://hpneo.github.io/gmaps/documentation.html
		//add if page or #map exists then do this

		var coords = {
			lat: 42.3302632,
			lng: -83.04755119999999,
		};

		var map = new GMaps({
			el: '#map',
			lat: coords.lat,
			lng: coords.lng,
	    	zoom: 17,
		    scrollwheel: false,
		    navigationControl: false,
		    mapTypeControl: false,
		    scaleControl: false,
		});

		map.addMarker({
			lat: coords.lat,
			lng: coords.lng,
			title: 'Lunar North',
		});

		$(window).resize(function() {
			map.setCenter(coords.lat, coords.lng);
		});

	}
};