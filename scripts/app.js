// var manualStateChange = true;

// History.Adapter.bind(window,'statechange',function(){
//     if(manualStateChange == true){
//      // BACK BUTTON WAS PRESSED
//     }
//     manualStateChange = true;
// });




var checkNum = 0;

$(document).ready(function(){     
	ln.init();
});

$(window).resize(function(){     
 	ln.resize();
});

var ln = {
	gutter: 20,
    page: {
	    current: null,
	    incoming: null,
	    loaded: {
	    	home: false,
	    	about: false,
	    	reel: null,
	    },
	    active: null,
    },
    screen: {
    	mode: null
    },
    init : function() {


		var checkInitPage = function() {	

			if ($("#projects-container").html().length > 0) {
				ln.page.loaded.home = true;
				ln.reel.mode = "open";
			} else if ($("#about-container").html().length > 0) {
				ln.page.loaded.about = true;
				ln.reel.mode = "close";
			} else if ($("#project-detail-container").html().length > 0) {
				ln.reel.mode = "close";
			}
			console.log("About:" + ln.page.loaded.about + "| Home:" + ln.page.loaded.home + " |Active:" + ln.page.active);
		};

		checkInitPage();


		this.detectSize();

		this.embedVideo($(".video-vimeo"));
		this.embedVideo($(".video-youtube"));
		this.display();
		this.reel.init();

		this.stickHeader();
		this.navigation.global();

		this.ajaxPages();

		if ($("#map").length !== 0) {
			this.map.init();
		}


	}, 

    featured : {

    	mode: null,
    	init: function() {

			// $featured = $("#featured");
			// $main = $("#main");

			// $(window).resize(function() {

			// });


    	},

    	navigation : function() {

			// $featured = $("#featured");
			// $main = $("#main");

			// $featured.css({height: h-headerH});
			// $main.css({top: h-headerH});

    	}


    },


    reel : {
    	el : $(".reel-container"),
    	mode : null,
    	init : function() {
    		
    		this.ratio();
    		ln.embedVideo(this.el.find(".video"));

	  //       var h = $(window).height(),
	  //           w = $(window).width(),
			// 	$featured = $("#featured"),
			// 	$main = $("#main"),
	  //           $header = $(".header"),
			// 	headerH = $header.outerHeight(false);

   //  		this.ratio();
   //  		ln.embedVideo(this.el.find(".video"));

   //  		function setSize() {
			// 	$featured.css({height: h-headerH});
			// 	$main.css({top: h-headerH});
			// }

			// setSize();
			// $(window).resize(setSize);

    	},
    	ratio : function() {
			var videoW = 1920,
				videoH = 1080,
				videoRatio = videoW/videoH,
				el = this.el;

	            $header = $(".header");

			function setMax() {
				
	            headerH = $header.outerHeight(false) * .65;

				$(".reel-container").css({paddingTop: headerH});

				el.css({
					maxHeight: el.parent().width() * videoRatio,
					maxWidth: (el.parent().height()-headerH) * videoRatio,
				});
			}
			setMax();
			$(window).resize(setMax);
    	},
    	toggle : function() {

	        var h = $(window).height(),
	            w = $(window).width(),
	            $header = $(".header"),
				$featured = $("#featured"),
				$main = $("#main"),
	            headerH = $header.outerHeight(false);

			var showReel = [
			    { 
			    	e: $("#main"), 
			    	p: {
			    		top: h-headerH,
			    	},
			    	o: { 
			    		duration: 500,
			    		easing: "easeOutQuint",
			    	}

			    	// e: $("#featured"), 
			    	// p: {
			    	// 	top: 0,
			    	// },
			    	// o: { 
			    	// 	duration: 500,
			    	// 	complete: scrollNow()
			    	// }

			    },
				{
			    	e: $("#featured"), 
			    	p: {
			    		top: 0,
			    	},
			    	o: { 
			    		sequenceQueue: true,
			    		duration: 500,
			    		complete: scrollNow()
			    	}

			    	// e: $("#main"), 
			    	// p: {
			    	// 	top: h-headerH,
			    	// },
			    	// o: { 
			    	// 	sequenceQueue: true,
			    	// 	duration: 500,
			    	// 	easing: "easeOutQuint",
			    	// }


			    }
			];


			var closeReel = [
			    { 
			    	e: $("#main"), 
			    	p: {
			    		top: 0,
			    		// top: h-headerH,
			    	},
			    	o: { 
			    		duration: 0,
			    		easing: "easeOutQuint",
			    	}
			    },
				{
			    	e: $("#featured"), 
			    	p: {
			    		top: 0,
			    	},
			    	o: { 
			    		sequenceQueue: true,
			    		duration: 0,
			    		// complete: scrollNow()
			    	}
			    }
			];


			function scrollNow() {
		        $("#featured").velocity('scroll', {
		            duration: 500,
		            easing: 'ease-in-out'
		        });
			}

			console.log("MODE = " + ln.reel.mode);

    		if (ln.reel.mode != "open") {

	    		console.log(ln.reel.mode + "    it's close. Will open");
	    		$.Velocity.RunSequence(showReel);

				ln.reel.mode = "open";

    		} else {

	    		console.log(ln.reel.mode + "    already open");
				$(window).stop(true).scrollTo("#featured", 500); 
	    		$.Velocity.RunSequence(closeReel);

	    		ln.reel.mode = "close";

				// $(window).stop(true).scrollTo("#featured", 500); 

    		}


			// // Featured/reel container height 
			// $featured.css({height: h-headerH});


			// if (ln.page.loaded.home === true) {
			// 	$main.css({top: h-headerH});
			// } else {
			// 	$main.css({top: 0});
			// }



			// if (direction == "seqFwd") {
			// 	$.Velocity.RunSequence(seqFwd);
			// } else {
			// 	$all.velocity("stop", true);
			// 	$.Velocity.RunSequence(seqRev);
			// }

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
						p.appendTo($(this));
					p.click(makeIframe);
				});
			};

			var getThumb = function(id) {
				return '<img class="youtube-thumb" src="//i2.ytimg.com/vi/' + id + '/maxresdefault.jpg"><span class="play-icon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 68 60" style="enable-background:new 0 0 68 60;" xml:space="preserve"><polygon fill="white" points="0,61 15,30.5 0,0 68.6,30.5 "/></svg></span>';
			};

			var makeIframe = function() {
				var url = '//www.youtube.com/embed/' + $(this).parent().data('youtube-id') + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0';
				var iframe = $('<iframe src="' + url + '" frameborder="0" scrolling="no" class="youtube-iframe"></iframe>');
				$(this).replaceWith(iframe);
				$('.video-youtube').fitVids();
			};
			embedYoutube(tar);
		}
    },

    images : {

    	init : function() {

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

    	size : {



    	} 

    },

    display : function(){

        var h = $(window).height(),
            w = $(window).width(),
            $header = $(".header"),
			$featured = $("#featured"),
			$main = $("#main"),
            headerH = $header.outerHeight(false),
            $footer = $(".footer");

        // Header taglines widths
		$header.find(".tagline").css({
			width: ($header.find(".ln-container").innerWidth() - $header.find(".logo").outerWidth()) / 2
		});

		// Featured/reel container height 
		$featured.css({height: h-headerH});


		if (ln.page.loaded.home === true) {
			$main.css({top: h-headerH});
		} else {
			$main.css({top: 0});
		}

		// alert($(".page").not(':hidden').length);

		// $('.page').each(function() {
		//    if ($(this).height()>=0) {
		//       $(this).width(...);
		//    }
		// });

		// $(".page").not(':hidden').css({
		// 	background: "red",
		// });

		// 		$(".footer").velocity({ opacity: 1 }, {duration: 100});


	  //       var h = $(window).height(),
	  //           w = $(window).width(),
			// 	$featured = $("#featured"),
			// 	$main = $("#main"),
	  //           $header = $(".header"),
			// 	headerH = $header.outerHeight(false);

   //  		this.ratio();
   //  		ln.embedVideo(this.el.find(".video"));

   //  		function setSize() {
			// 	$featured.css({height: h-headerH});
			// 	$main.css({top: h-headerH});
			// }

			// setSize();
			// $(window).resize(setSize);







		// Footer
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
			$(".footer .copyright").css({width : ($(".footer .info").innerWidth() - calc) / 2});
		} else {
			$(".footer .copyright").css({width : "100%"});
		}


		// Thumbnails
		var caseStudyColW = ($(".row").width() * (2/3)) - (ln.gutter * (1/2)),
			normalColW = ($(".row").width()/3) - (ln.gutter * (1/2)),
			$caseStudyContainer = $(".case-study"),
			$normalContainer = $(".normal");

		if (ln.screen.mode == "large") {

			$caseStudyContainer.css({
				width: caseStudyColW,
				height: (caseStudyColW) * (9/16)
			});

			$normalContainer.css({
				width: normalColW,
				height: (caseStudyColW) * (9/16)			
			});



		} else if (ln.screen.mode == "medium") {

			$caseStudyContainer.css({
				width: "100%",
				height: "auto"
			});

			$normalContainer.css({
				width: "100%",
				height: "auto"
			});

		} else {

			$caseStudyContainer.css({
				width: "100%",
				height: "auto"
			});

			$normalContainer.css({
				width: "100%",
				height: "auto"
			});

		}

		// Homepage 
		var $row = $(".row");
			$normalProject = $normalContainer.find(".project");
			$caseStudyProject = $caseStudyContainer.find(".project");

		// $normalProject.css({
		// 	background: "red"
		// });

		// $caseStudyProject.css({
		// 	background: "blue"
		// });

		if (ln.screen.mode == "large") {

			$normalProject.css({			
				width: normalColW,
				height: ((caseStudyColW) * (9/16) / 2) - ln.gutter/2,
			});

			$caseStudyProject.css({
				width: caseStudyColW,
				height: (caseStudyColW) * (9/16),
			});

			// $caseStudyProject.find(".thumbnail").css({
			// 	width: caseStudyColW,
			// 	height: (caseStudyColW) * (9/16),
			// });


		} else if (ln.screen.mode == "medium") {

			$normalProject.css({			
				width: ($row.width() / 2) - ln.gutter/2,
				height: ($row.width() / 2) * (9/16),
			});

			$caseStudyProject.css({			
				width: "100%",
				height: $row.width() * (9/16),
			});

		} else {

			$normalProject.css({			
				width: "100%",
				height: $row.width() * (9/16),
			});

			$caseStudyProject.css({
				width: "100%",
				height: $row.width() * (9/16),
			});

		}

		// 2 column
		$(".col-2 .col").each(function() {
			var cw = $(this).parent().width()/2;
			
			if (ln.screen.mode == "small") {

				$(this).parent(".info").css({
					width : "100%",
					marginRight : 0,
				});

				$(this).width("100%");

				if ($(this).is(":first-child")) {
					$(this).css({
						marginRight : 0,
						marginBottom : 20,
					});
				}

			} else {

				$(this).width(cw - ln.gutter/2);
				if ($(this).is(":first-child")) {
					$(this).css({
						marginBottom : 0,
						marginRight : ln.gutter,
					});
				}

			}



		});

    },


	initImages : function () {

		// Might not be necessary for now
		var count = 1;

		// $(".case-study .thumbnail").one("load", function() {
		// 	h = $(this).closest(".case-study").height();
		// 	$project = $(this).closest(".case-study").siblings(".normal").find(".project");
		// 	console.log($project.length);
		// 	count++;
		// }).each(function() {
		// 	if(this.complete) $(this).load();
		// });

	},

	navigation : {

		global : function() {

			// Init thumbnail navigation
			this.thumbnails();

			// Logo
			$(".logo a").mouseenter(function() {
				$(this).addClass('hover');
				$(".hover").find(".triangle").velocity({fill: "#00ADEE"}, {queue:false, duration: 200});
			}).mouseleave(function() {
				$(".hover").find(".triangle").velocity("stop").velocity({fill: "#585A5A"}, {queue:false, duration: 200});
				$(this).removeClass('hover');
			});

			// Menu
			$(".menu-button a").click(function(e) {
				e.preventDefault();
				var $menu = $(".menu-box");
				if ($menu.is(":visible")) {
					$menu.velocity("fadeOut", 200);
				} else {
					$menu.velocity("transition.slideDownIn", 200);
				}
				$(this).toggleClass("active");
			});

		},

		thumbnails : function() {

			var seq = function(el, direction, callback) {

				$thumbnail = el.find(".thumbnail");
				$triangleSm = el.find(".triangle-small");
				$triangleLg = el.find(".outer");
				$divider1 = el.find(".divider-1");
				$divider2 = el.find(".divider-2");
				$title = el.find(".title");
				$client = el.find(".client");

				$all = $triangleSm.add($thumbnail).add($triangleLg).add($divider1).add($divider2).add($title).add($client);

				sv = 1/1.5;

				var seqFwd = [
					{
				    	e: $thumbnail, 
				    	p: {
				    		width: "105%",
				    		height: "105%",
				    	},
				    	o: { 
				    		duration: sv * 1400,
				    		easing: "easeOutQuint",
				    	}
				    },
				    { 
				    	e: $triangleSm, 
				    	p: {
				    		opacity: 0,
				    		scaleX: 1,
				    		scaleY: 1,
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: sv * 0,
				    	}
				    },
				    { 
				    	e: $triangleSm, 
				    	p: {
				    		opacity: 1,
				    		scaleX: 1,
				    		scaleY: 1,
				    	},
				    	o: { 
				    		sequenceQueue: true,
				    		duration: sv * 400,
				    	}
				    },
				    { 
				    	e: $triangleLg, 
				    	p: {
				    		opacity: 1,
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: sv * 100,
				    	}
				    },
				    { 
				    	e: $triangleLg, 
				    	p: {
				    		opacity: 0,
				    		scaleX: 0,
				    		scaleY: 0,
				    	},
				    	o: { 
				    		sequenceQueue: true,
				    		duration: sv * 400,
				    	}
				    },
				    { 
				    	e: $title, 
				    	p: {
				    		opacity: 1,				    		
				    		marginTop: "2.2em",
				    	},
				    	o: { 
				    		sequenceQueue: true,
				    		duration: sv * 800,
				    		easing: "easeOutQuint",
				    	}
				    },
				    { 
				    	e: $client, 
				    	p: {
				    		opacity: 1,				    		
				    		marginBottom: "2.2em",
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: sv * 400,
				    		easing: "easeOutQuint",
				    	}
				    },
				    { 
				    	e: $divider1, 
				    	p: {
				    		x1: 0,
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: sv * 400,
				    		easing: "easeOutQuint",				    		
				    	}
				    },
				    { 
				    	e: $divider2, 
				    	p: {
				    		x1: "100%",
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: sv * 400,
				    		easing: "easeOutQuint",
				    	}
				    }
				];

				var seqRev = [
					{
				    	e: $thumbnail, 
				    	p: {
				    		width: "100%",
				    		height: "100%",
				    	},
				    	o: { 
				    		duration: 200,
				    		easing: "easeOutQuint",
				    	}
				    },
				    { 
				    	e: $triangleSm, 
				    	p: {
				    		opacity: 0,
				    		scaleX: 1,
				    		scaleY: 1,
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: 200,
				    	}
				    },
				    { 
				    	e: $triangleLg, 
				    	p: {
				    		opacity: 0,
				    		scaleX: 1,
				    		scaleY: 1,
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: 200,
				    	}
				    },
				    { 
				    	e: $title, 
				    	p: {
				    		opacity: 0,				    		
				    		marginTop: "1em",
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: 200,
				    		easing: "easeOutQuint",
				    	}
				    },
				    { 
				    	e: $client, 
				    	p: {
				    		opacity: 0,				    		
				    		marginBottom: "1em",
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: 200,
				    		easing: "easeOutQuint",
				    	}
				    },
				    { 
				    	e: $divider1, 
				    	p: {
				    		x1: "40%",
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: 200,
				    		easing: "easeOutQuint",				    		
				    	}
				    },
				    { 
				    	e: $divider2, 
				    	p: {
				    		x1: "60%",
				    	},
				    	o: { 
				    		sequenceQueue: false,
				    		duration: 200,
				    		easing: "easeOutQuint",
				    	}
				    }
				];

				if (direction == "seqFwd") {
					$.Velocity.RunSequence(seqFwd);
				} else {
					$all.velocity("stop", true);
					$.Velocity.RunSequence(seqRev);
				}

			};


			$(".project .link").mouseenter(function() {

				$(this).addClass('hover');
				$hover = $(".hover");
				seq($hover, "seqFwd");

			}).mouseleave(function() {

				$hover = $(".hover");
				seq($hover, "seqRev");
				$(this).removeClass('hover');


			});
			

		}


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

		// console.log(ln.screen.mode);

	},
	
	resize : function() {

		this.detectSize();
		this.display();

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

	stickHeader : function() {

		$navBar = $(".header");
		function sticky() {

			$navBar.sticky({ 
				topSpacing: 0,
				zIndex: 100 
			});

			$navBar.on('sticky-start', function() { 
				// ln.featured = false;
			});

			$navBar.on('sticky-end', function() { 

				var $menuBox = $(".menu-box");
				$menuBox.velocity("fadeOut", 200);

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
					}
						
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
					}
						
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
			} else if (ln.segment.active.hasClass('last') && ln.segment.last === false ) {
				if (mouseY >= h/2) {
					$('#work').addClass('bottom').removeClass('top');
					ln.mousePosY = 'down';
				} else {
					$('#work').addClass('top').removeClass('bottom');			
					ln.mousePosY = 'up';					
				}
		    } else if (ln.segment.active.hasClass('last') && ln.segment.last === true) {
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
			siteTitle		= 'Lunar North';



		// History.Adapter.bind(window,'statechange',function(){
		// 	var State = History.getState();
		// 	console.log("BACK");
		// });



	    $(document).on('click', '.ajax.link', "[href^='" + siteUrl + "']:not([href*='/wp-admin/']):not([href*='/wp-login.php']):not([href$='/feed/'])", function (e) {

			e.preventDefault();

			var path = $(this).attr('href'),
				title = $(this).data('title');
			
			// clickTarget = $(this).data('page');



			ajaxContent = 'page';								

				// manualStateChange = false;
				// History.pushState(null, null, path);

			//If home
			if ($(this).hasClass("url-reel")) {
				ln.reel.toggle();
			} else {

				incomingPageId = $(this).data("page-id");

				if (title != siteTitle || title == "Home") { 
					title += ' - ' + siteTitle; 
				}

				History.pushState('ajax', title, path);
				currentPage();
			}

			if ($(this).closest(".menu-box")) {
				$(".menu-box").delay(200).velocity("fadeOut", 200);
				$(".menu-button a").delay(200).removeClass("active");
			}

		});



		// var checkInitPage = function() {
		// 	if ($(".data-about").data("page-active") === true) {
		// 		ln.page.loaded.about = true;
		// 		ln.page.active = "about";
		// 	} else if ($(".data-home").data("page-active") === true) {
		// 		ln.page.loaded.home = true;
		// 		ln.page.active = "home";
		// 	}

		// 	// if ($(".data-about").data("page-loaded") === true && $(".data-about").data("page-active") === true) {
		// 	// 	ln.page.loaded.about = true;
		// 	// 	ln.page.active = "about";
		// 	// } else if ($(".data-home").data("page-loaded") === true && $(".data-home").data("page-active") === true) {
		// 	// 	ln.page.loaded.home = true;
		// 	// 	ln.page.active = "home";
		// 	// }
		// 	console.log(ln.page.active);
		// };


		var currentPage = function() {

			currentState = History.getState();
	        activeUrl = currentState.url; 
			$activeContent = $('.menu-box .link[href="' + activeUrl + '\"]');
			$(".menu-box .link").removeClass("active");
			$activeContent.addClass("active");

		};

		currentPage();

		// Load Data Images if landing homepage
		// if ($('#work').hasClass('init')) {
		// 	ln.page.current = 'work';
		// 	ln.getFlickrData();
		// 	ln.pageLoaded.hp = true;
		// }

		// if (!$('#work').length) {
		// 	ln.loadingBar(false);
		// }

		console.log(siteUrl);


	    History.Adapter.bind(window, 'statechange', function() {
			loadPageAjax();
			// console.log("hoy " + State.url);
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


		var showContent = function(tar, type, content) {

			// $e = $("#"+tar);

			function scrollW() { 
				$(window).stop(true).scrollTo("#main", 500); 
			}

			ln.reel.mode = "close";								

			$(".page").not(".page-" + tar).css({position: "absolute"}).velocity("fadeOut", 200);

			if (type == "new") { $(".page-" + tar).html(content); }

			$(".page-" + tar).css({position: "relative"}).velocity("fadeIn", 200, function() {


				ln.display();
				ln.detectSize();

				// $(".footer").velocity({ opacity: 1 }, {duration: 100});


				if (tar == "home") {
					ln.navigation.thumbnails();
				} else if (tar == "about") {
					ln.map.init();
				} else {
					ln.embedVideo($(".video-vimeo"));
					ln.embedVideo($(".video-youtube"));
				}

				scrollW();

			});

			


		};



		// Load Ajax
		function loadPageAjax() {


			// ln.loadingBar(true);


			var data = [];
			for (var i = 0; i < 100000; i++) {
			    var tmp = [];
			    for (var i = 0; i < 100000; i++) {
			        tmp[i] = 'hue';
			    }
			    data[i] = tmp;
			};


			State = History.getState();

			$.ajax({
	            url: State.url,
			    tryCount : 0,
			    retryLimit : 3,
				beforeSend: function() {
					$(".progress").html("Loading...").velocity("fadeIn", 500);
				},
			    error : function(xhr, textStatus, errorThrown ) {
			        if (textStatus == 'timeout') {
			            this.tryCount++;
			            if (this.tryCount <= this.retryLimit) {
			                //try again
			                $.ajax(this);
			                return;
			            }            
			            return;
			        }
			        if (xhr.status == 500) {
			            //handle error
			        } else {
			            //handle error
			        }
			    },
				success: function(respond){

					// objId	= content.attr('id');

					// var content;
						// console.log(incomingPageId);
						// console.log(incomingPageId + " " + ln.page.loaded.home + " " + State.url);

							// var content	= $(respond).find('.page').html();	
							// var type = $(respond).find('.page').data("page-id");


							var content	= $(respond).find('.page[data-page-active="true"]').html();	
							var type = $(respond).find('.page[data-page-active="true"]').data("page-id");

							console.log(type);
							showContent(type, "new", content);

						// Old Home
						// if (incomingPageId == "home" && ln.page.loaded.home === true) {

						// 		showContent(incomingPageId, "old");

						// // New Home
						// } else if (incomingPageId == "home" && ln.page.loaded.home === false) {

						// 		content	= $(respond).find('.page-home').html();								
						// 		showContent(incomingPageId, "new", content);

						// // Old About
						// } else if (incomingPageId == "about" && ln.page.loaded.about === true) {

						// 		showContent(incomingPageId, "old");

						// // New About
						// } else if (incomingPageId == "about" && ln.page.loaded.about === false) {

						// 		content	= $(respond).find('.page-about').html();								
						// 		showContent(incomingPageId, "new", content);

						// // Load Work		
						// } else if (incomingPageId == "work"){

						// 	content	= $(respond).find('.page-work').html();								
						// 	showContent("work", "new", content);

						// } else {

						// 	console.log("hoy " + State.url);
						// 	// console.log("YAY");

						// }

		

				},
				complete: function() {
						// ln.reel.mode = "close";								

					// if (clickTarget != 'work') ln.loadingBar(false);


					$(".progress").html("").velocity("fadeOut", 500);


				},
			});	
		}
	},

	map : {
		loaded : null, 
		init : function() {

			if (ln.map !== true) {

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

				this.loaded = true;

			}

		}

	}
};