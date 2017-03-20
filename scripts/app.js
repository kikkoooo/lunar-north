$(document).ready(function(){     
	ln.init();
});

$(window).resize(function(){     
 	ln.resize();
});

var ln = {
	gutter: 20,
    page: {
	    incoming: null,
	    active: null,
	    home: {
	    	loaded: null,
	    },
	    about: {
	    	loaded: null,
	    }
    },
    screen: {
    	mode: null
    },
    init : function() {

		this.detectInitPage();
    	// this.test();		
		this.detectSize();
		this.display();
		this.reel.init();

		this.stickHeader.init();
		this.navigation.global();

		this.ajaxPages();

		$("img.lazy").lazyload({
			threshold : 600,
		    effect : "fadeIn",
		    effectspeed: 200,
			failure_limit : 10
		});

	}, 

	detectInitPage : function() {

		var activePage = $('.page[data-page-load="true"]').data("page-id");

		$(window).load(function() {

			if (activePage == "about") {
				ln.gmap.init();	
			}
			if (activePage == "home") {
	    		ln.reel.toggle("open");				
			}
    		$("#main").animate({
    			opacity: 1
    		}, 200);
    		ln.preloader("stop");

    		$(".progress").css({
				background: "rgba(0,0,0,.9)"
    		});

		});

		if (activePage == "home" && activePage == "about") {

			ln.page[activePage]["loaded"] = true;
    		ln.preloader("play");			

		} else if (activePage == "error") {

			console.log("ERROR");
			this.error();

		} else {

    		ln.preloader("play");			
			ln.embedVideo($(".video-vimeo"));
			ln.embedVideo($(".video-youtube"));
		}

	},

	error: function() {

		$cd =  $(".error .countdown");
		time = 10;

		var interval = setInterval(function(){ 
			
			$cd.text(time);
			time--;
			if (time < 0) {
				clearInterval(interval);
				window.location.replace("http://lunarnorth.tv");
			}
		}, 1000);

	},

    reel : {
    	el : $(".reel-container"),
    	mode : null,
    	init : function() {
    		ln.embedVideo(this.el.find(".video"));
    	},
    	toggle : function(cmd) {

	        var h = $(window).height(),
	            w = $(window).width(),
	            $header = $(".header"),
				$featured = $("#featured"),
				$main = $("#main"),
	            headerH = $header.outerHeight(false);

			var showReel = [
			    { 
			    	e: $("#main"), 
			    	p: { top: h-headerH, },
			    	o: { duration: 200, easing: "easeOutQuint", }
			    },
				{
			    	e: $("#featured"), 
			    	p: { top: 0, opacity: 1},
			    	o: { display: "block", sequenceQueue: false, duration: 200, complete: scrollNow() }
			    }
			];

			var closeReel = [
			    { 
			    	e: $("#main"), 
			    	p: { top: 0, },
			    	o: { duration: 200, easing: "easeOutQuint", }
			    },
				{
			    	e: $("#featured"), 
			    	p: { opacity: 0, },
			    	o: { display: "none", sequenceQueue: true, duration: 200 }
			    }
			];

		// $menu.velocity("transition.slideDownIn", 200);

			function scrollNow() {
		        $("#featured").velocity('scroll', {
		            duration: 400,
		            easing: 'ease-in-out'
		        });
			}

			// console.log("MODE = " + ln.reel.mode);

			if (cmd == "close") {
	    		$.Velocity.RunSequence(closeReel);
	    		// ln.reel.mode = "closed";
	    		ln.reel.mode = false;
		        $('iframe[src*="vimeo.com"]').each(function() {
		            $f(this).api('unload');
		        });                

			} else if (cmd == "open") {
	    		$.Velocity.RunSequence(showReel);
	    		// ln.reel.mode = "open";
	    		ln.reel.mode = true;
			}


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
    	size : {} 
    },

    display : function(){

        var h = $(window).height(),
            w = $(window).width(),
            $header = $(".header"),
			$featured = $("#featured"),
			$main = $("#main"),
            headerH = $header.outerHeight(false),
            $footer = $(".footer");

        // Reel    
		var videoW = 1920,
			videoH = 1080,
			videoRatio = videoW/videoH,
            wFull = window.innerWidth,
            $reelCon = $(".reel-container");

			// Featured/reel container height 
			$featured.css({height: h-headerH});

			if (ln.reel.mode === true) {
		        $main.css({
		        	top: h-headerH
		        });
		        $featured.css({
		        	top: 0
		        });
			} else if (ln.reel.mode === false) {
		        $main.css({
		        	top: 0
		        });
			}

			var topSpacing = headerH * 3/4;

			function setMax() {
				$reelCon.css({
					maxWidth: ($reelCon.parent().height() - topSpacing)* videoRatio,
					paddingTop: topSpacing
				});
			}

			setMax();

        // Header taglines widths
		$header.find(".tagline").css({
			width: ($header.find(".ln-container").innerWidth() - $header.find(".logo").outerWidth()) / 2
		});


		$(".page").css({
			minHeight: h - $footer.outerHeight() - ln.gutter - headerH
		});

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

		var $row = $(".row"),
			$pcs = $(".case-study .project"),
			$pn = $(".normal .project"),
			wFull = window.innerWidth - (ln.gutter * 2);

		// Setup content with 16:9 ratio
		$(".video-main, .image-studio").css({
			width: w,
			height: w * 9/16,
		});

		// Section images full and half
		$(".section.image img").each(function() {
			if ($(this).parents(".section").hasClass("col-1")) {
				$(this).css({
					width: wFull,
					height: wFull * 9/16,
				});
			} else if ($(this).parents(".section").hasClass("col-2")) {

				// Small vs Medium/Large
				if (ln.screen.mode != "small") {
					// Col
					$(this).parent(".col").css({
						width: (wFull - ln.gutter)/2,
						height: ((wFull - ln.gutter)/2) * 9/16,
						float: "left",
					});
					$(this).parent(".col:first-child").css({
						width: (wFull - ln.gutter)/2,
						height: ((wFull - ln.gutter)/2) * 9/16,
						float: "left",
						margin: 0,						
						marginRight: ln.gutter,					
					});
					// Images
					$(this).css({
						width: (wFull - ln.gutter)/2,
						height: ((wFull - ln.gutter)/2) * 9/16,
					});

				} else {

					// Col
					$(this).parent(".col").css({
						width: wFull,
						height: wFull * 9/16,
					});
					$(this).parent(".col:first-child").css({
						width: wFull,
						height: wFull * 9/16,
						margin: 0,
						marginBottom: ln.gutter,					
					});
					// Images
					$(this).css({
						width: wFull,
						height: wFull * 9/16,
					});
				}
			}
		});

		$row.css({
			marginBottom: ln.gutter,
		});

		var drawSmall = function() {
			$pcs.each(function(i) {
				var w = wFull,
					h = w * 9/16;
				// project
				$(this).parent(".col").css({
					width: w,
					height: h,
					margin: 0,					
					marginBottom: ln.gutter,	
				});
				$(this).css({
					width: w,
					height: h,
				});
			});
			$pn.each(function(i) {
				var w = wFull,
					h = w * 9/16;
				// project
				$(this).parent(".col").css({
					width: w,
					height: "auto",
				});
				if (i % 2 === 0) {
					$(this).css({
						width: w,
						height: h,
						margin: 0,						
						marginBottom: ln.gutter,						
					});
				} else {
					$(this).css({
						width: w,
						height: h,
					});
				}
			});
		};

		var drawMedium = function() {
			$pcs.each(function(i) {
				var w = wFull,
					h = w * 9/16;
				// project
				$(this).parent(".col").css({
					width: w,
					height: h,
					margin: 0,
					marginBottom: ln.gutter,
				});
				$(this).css({
					width: w,
					height: h,
				});
			});
			$pn.each(function(i) {
				var w = (wFull - ln.gutter)/2,
					conH = w * 9/16,
					h = w * 9/16;
				// container
				$(this).parent(".col").css({
					width: wFull,
					height: conH,
				});
				// project
				if (i % 2 === 0) {
					$(this).css({
						width: (wFull - ln.gutter)/2,
						height: h,
						margin: 0,						
						marginRight: ln.gutter,					
					});
				} else {
					// project
					$(this).css({
						width: (wFull - ln.gutter)/2,
						height: h,
					});
				}
			});
		};

		var drawLarge = function() {
			$pcs.each(function(i) {
				var w = (wFull * 2/3) - ln.gutter/2,
					h = w * 9/16;
				// project
				if (i % 2 === 0) {
					$(this).parent(".col").css({
						width: w,
						height: h,
						margin: 0,
						marginRight: ln.gutter,
					});
				} else {
					$(this).parent(".col").css({
						width: w,
						height: h,
						margin: 0,						
						marginLeft: ln.gutter,
					});
				}
				$(this).css({
					width: w,
					height: h,
				});
			});
			$pn.each(function(i) {
				var w = wFull - ((wFull * 2/3) - ln.gutter/2) - ln.gutter,
					conH = ((wFull * 2/3) - (ln.gutter/2)) * 9/16,
					h = conH/2 - ln.gutter/2;
				// project
				$(this).parent(".col").css({
					width: w,
					height: conH,
				});
				// project
				if (i != 1) {
					$(this).css({
						width: w,
						height: h,
						margin: 0,						
						marginBottom: ln.gutter,					
					});
				} else {
					// project
					$(this).css({
						width: w,
						height: h,
					});
				}
			});
		};

		if (ln.screen.mode == "large") {
			drawLarge();
		} else if (ln.screen.mode == "medium") {
			drawMedium();
		} else if (ln.screen.mode == "small") {
			drawSmall();
		}
		

    },
    test : function() {
		$(document).keyup(function (e){
			if (e.keyCode == 65) {
				// console.log("a");
				// ln.preloader("play");
				// ln.display();
				// ln.detectSize();
				// ln.display();
				// ln.map.init();
			} else if (e.keyCode == 83) {
				// console.log("s");
				// ln.preloader("stop");
				// ln.map.init();
			}
		});
    },
	preloader: function(mode) {

		if (mode == "play") {
			stopAnimations();
			$(".progress").velocity("fadeIn", 200, function() {
				randomize($("#icon-1"), 100);
				randomize($("#icon-2"), 200);
				randomize($("#icon-3"), 300);
				randomize($("#icon-4"), 400);
			});
		} else if (mode == "stop") {
			$(".progress").delay(400).velocity("fadeOut", 200, function() {
				stopAnimations();
			});
		}

		var sv = 200,
			dr = 40,
			combine,
			count = 1;

		$(".icon").each(function() {
			if (count == 1 ) {
				combine = "#"+$(this).attr("id") + ",";
			} else if (count == 4 ) {
				combine += "#"+$(this).attr("id");
			} else {
				combine += "#"+$(this).attr("id") + ",";
			}
			count++;
		});

		function stopAnimations() {
			$(".icon").each(function() {
				$(this).find(".box").velocity("stop", true).css({opacity: 1});
				$(this).find(".x").velocity("stop", true).css({opacity: 0});
			});
		} 

        function randomize(tar, timing) {

        	var randomEl = Math.floor(Math.random() * 4) + 1,
        		delayRelay = timing;

			var randomAnim = [
				{ e: tar.find(".box"), p: { opacity: 0 }, o: { delay: delayRelay, duration: dr} },
				{ e: tar.find(".x-"+randomEl), p: { opacity: 1 }, o: { delay: sv, sequenceQueue: true, duration: dr} },
				{ e: tar.find(".x-"+randomEl), p: { opacity: 0 }, o: { delay: sv, sequenceQueue: true, duration: dr} },
				{ e: tar.find(".box"), p: { opacity: 1 }, o: { easdelay: sv,  sequenceQueue: true, duration: dr, 
					complete: function() {
						randomize(tar, timing);
						}
					}
				},
			];
			$.Velocity.RunSequence(randomAnim);			
        }

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

				if (ln.stickHeader.mode !== true) {
			        $("#main").velocity("stop").velocity('scroll', {
			            duration: 500,
			            easing: 'ease-in-out'
			        });
				}
			});

		},


		thumbnails : function() {

			var seq = function(el, direction, callback) {

				var $thumbnail = el.find(".thumbnail"),
					$triangleSm = el.find(".triangle-small"),
					$triangleLg = el.find(".outer"),
					$divider1 = el.find(".divider-1"),
					$divider2 = el.find(".divider-2"),
					$title = el.find(".title"),
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

		var w = $(window).width();

		if (w <= 600) {
	        ln.screen.mode = "small";
        /* Tablet */
		} else if (w <= 900) {
	        ln.screen.mode = "medium";
        /* Desktop */
        } else {
	        ln.screen.mode = "large";
        }

		if (ln.screen.mode != "large") {
			$('#header').sticky('update');
		}
	},
	
	resize : function() {

		this.detectSize();
		this.display();

	},
	
	stickHeader : {
		mode: null,
		init: function() {

			$navBar = $(".header");

			function sticky() {
				$navBar.sticky({ 
					topSpacing: 0,
					zIndex: 100 
				});

				$navBar.on('sticky-start', function() { 
					ln.stickHeader.mode = true;
				});

				$navBar.on('sticky-end', function() { 
					var $menuBox = $(".menu-box");
					$menuBox.velocity("fadeOut", 200);
					$(".nav-toggle").removeClass("active");
					ln.stickHeader.mode = false;
				});
			}

			sticky();
		}

	},
	
	ajaxPages : function() {

	    var siteUrl = "http://" + top.location.host.toString();
	

		var History			= window.History,
			State 			= History.getState(),
			siteTitle		= 'Lunar North',
			incoming 		= null,
			activeEl 		= null;


	    $(document).on('click', '.ajax.link', "[href^='" + siteUrl + "']:not([href*='/wp-admin/']):not([href*='/wp-login.php']):not([href$='/feed/'])", function (e) {

			e.preventDefault();

			var path = $(this).attr('href'),
				title = $(this).data('title');
			
			// If reel is clicked
			if ($(this).hasClass("url-reel")) {
				ln.reel.toggle("open");				
			} else {
				if (title != siteTitle || title == "Home") {
					title += ' - ' + siteTitle; 
				}
				
				ln.reel.toggle("close");
				History.pushState('ajax', title, path);
			}

			// Hide menu box
			if ($(this).closest(".menu-box")) {
				$(".menu-box").velocity("fadeOut", {duration: 200, delay: 200});
				$(".menu-button a").removeClass("active");
			}

		});

		var updateNav = function() {
			currentState = History.getState();
	        activeUrl = currentState.url; 
			$activeContent = $('.menu-box .link[href="' + activeUrl + '\"]');
			$(".menu-box .link").removeClass('active');
			$activeContent.addClass('active');
		};

		updateNav();

		var showContent = function(page, content, option) {

			var el = "#page-" + page,
				type = option;

			// Hide none active pages
			$(".page").not(el).css({position:'absolute'}).velocity("transition.slideDownOut", 200);
			if (content.length > 0) { 
				$(el).html(content);
			}

			// scrollToMain();
	        $("#main").velocity('scroll', {
	            duration: 200,
	            easing: 'easeOutQuint'
	        });

			$(el).velocity("transition.slideUpIn", 400).css({position:'relative'});

			if (page != "work") { $("#page-work").empty(); }

			if (content !== null) { 
				$(el).find("img.lazy").lazyload({
					threshold : 600,
				    effect : "fadeIn",
				    effectspeed: 200,
    				failure_limit : 10
				});
			}
			updateNav();
			ln.reel.mode = false;				

		};


	    History.Adapter.bind(window, 'statechange', function() {

			currentState = History.getState();
	        activeUrl = currentState.url; 

	        // mainUrl = siteUrl + "/";
	        mainUrl = siteUrl + "/wp/";

			if (activeUrl == mainUrl || activeUrl == mainUrl+"/") {
				incoming = "home";
			} else if (activeUrl == mainUrl+"about" || activeUrl == mainUrl+"about/") {
				incoming = "about";
			} else {
				incoming = "work";
			}

		 	if (incoming != "work" && ln.page[incoming]["loaded"] === true) {
				content = 0;
				showContent(incoming, content, "old");
				$(".project .link").removeClass('hover');
		 	} else {
				loadPageAjax();
			}
			
	    });
		
		function loadPageAjax() {
			State = History.getState();
			$.ajax({
	            url: State.url,
			    tryCount: 0,
			    cache: true,
			    retryLimit: 3,
				beforeSend: function() {
					ln.preloader("play");					
				},
			    error: function(xhr, textStatus, errorThrown ) {
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

					var content	= $(respond).find('.page[data-page-active="true"]').html();
				 		type = $(respond).find('.page[data-page-active="true"]').data("page-id");

					showContent(incoming, content, "new");

				},
				complete: function() {

					ln.preloader("stop");
					updateNav();
					ln.display();
					ln.detectSize();

					if (incoming == "home") {
						ln.navigation.thumbnails();
						ln.page.home.loaded = true;
						$(".page-work").empty();
					} else if (incoming == "about") {
						ln.page.about.loaded = true;
						$(".page-work").empty();
						ln.gmap.init();	
					} else {
						ln.embedVideo($(".video-vimeo"));
						ln.embedVideo($(".video-youtube"));
					}

					ln.reel.toggle("close");
				},
			});	
		}
	},

	gmap : {
		loaded : null, 
		init : function(type) {

			var coords = {
				lat: 42.3302632,
				lng: -83.04755119999999,
			};

			var map = new GMaps({
				el: '.map',
				lat: coords.lat,
				lng: coords.lng,
		    	zoom: 17,
			    scrollwheel: false,
			    navigationControl: false,
			    mapTypeControl: false,
			    scaleControl: false,
		        width: '100%',
		        height: '600px',
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
};