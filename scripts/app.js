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

    	// ln.preloader("play");
    	this.test();
		this.detectInitPage();
		this.detectSize();
		this.display();
//		this.reel.init();

		this.stickHeader();
		this.navigation.global();

		this.ajaxPages();

		$("img.lazy").lazyload({
			threshold : 200,
		    effect : "fadeIn",
		    effectspeed: 300 
		});

		console.log("INIT LN...");
	}, 

	detectInitPage : function() {

    	var activePage;

		var checkInitPage = function() {	

			activePage = $('.page[data-page-load="true"]').data("page-id");

			if (activePage != "work") {
				ln.page[activePage]["loaded"] = true;
			} else {
				console.log("WORK");
				ln.embedVideo($(".video-vimeo"));
				ln.embedVideo($(".video-youtube"));
			}

			if (activePage == "about") {
				if ($("#map").length !== 0) {
					ln.map.init();
				}
			}
			if (activePage == "home") {
				// ln.reel.toggle();
			}


		};

		checkInitPage();

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
			    	}
			    }
			];


			function scrollNow() {
		        $("#featured").velocity('scroll', {
		            duration: 500,
		            easing: 'ease-in-out'
		        });
			}

			// console.log("MODE = " + ln.reel.mode);

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


		// if (ln.page.loaded.home === true) {
		// 	$main.css({top: h-headerH});
		// } else {
		// 	$main.css({top: 0});
		// }



		// if (ln.screen.mode != "small") {


		// } else {
		// 	$(".page").css({
		// 		paddingLeft: ln.gutter,
		// 		paddingRight: ln.gutter,
		// 	})
		// }	

		// $(".projects-container").css({
		// 	paddingLeft: ln.gutter,
		// 	paddingRight: ln.gutter,
		// })


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


		// // Thumbnails
		// var caseStudyColW = ($("#main").width() * (2/3)) - (ln.gutter * 2),
		// 	normalColW = ($("#main").width()/3) - (ln.gutter);

		// // var caseStudyColW = ($(".row").width() * (2/3)) - (ln.gutter * (1/2)),
		// // 	normalColW = ($(".row").width()/3) - (ln.gutter * (1/2)),

		// 	$caseStudyContainer = $(".case-study"),
		// 	$normalContainer = $(".normal");

		// if (ln.screen.mode == "large") {

		// 	$caseStudyContainer.css({
		// 		width: caseStudyColW,
		// 		height: (caseStudyColW) * (9/16),
		// 	});

		// 	$normalContainer.css({
		// 		width: normalColW,
		// 		height: (caseStudyColW) * (9/16)			
		// 	});



		// } else if (ln.screen.mode == "medium") {

		// 	// var csW = $(window).innerWidth() - 40;
		// 	// 	nW = ($("#main").width()) - (ln.gutter * 2);


		// 	// $caseStudyContainer.css({
		// 	// 	width: $("#projects-container").width(),
		// 	// 	height: csW * (9/16),
		// 	// 	background: "blue"				
		// 	// });

		// 	// console.log("gutter = " + ln.gutter);

		// 	// // console.log("w = " + $("#main").innerWidth());
		// 	// // console.log("width = " + w + " " + csW);

		// 	// // console.log(csW + " " + ln.gutter * 2);

		// 	// $normalContainer.css({
		// 	// 	width: nW,
		// 	// 	height: (nW/2) * (9/16),
		// 	// 	background: "lime"
		// 	// });

		// } else {

		// 	var csW = $("#main").width() - (ln.gutter * 2),
		// 		nW = ($("#main").width()) - (ln.gutter * 2);

		// 	$caseStudyContainer.css({
		// 		width: csW,
		// 		height: csW * (9/16)
		// 	});

		// 	$normalContainer.css({
		// 		width: nW,
		// 		height: nW * (9/16),
		// 	});

		// }

		// // Homepage 
		// var $row = $(".row");
		// var $main = $("#main");

		// $normalProject = $normalContainer.find(".project");
		// $caseStudyProject = $caseStudyContainer.find(".project");




		$row = $(".row");
		$pcs = $(".case-study .project");
		$pn = $(".normal .project");
		$main = $(".header");

		var wFull = window.innerWidth - (ln.gutter * 2);

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
		


		// 2 column
		$(".image.col-2 .col").each(function() {
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

    test : function() {

		$(document).keyup(function (e){
			if (e.keyCode == 65) {
				
				// console.log("a");
				// // ln.preloader("play");
				// ln.display();
				// ln.detectSize();
				// ln.display();
				ln.map.init();



			} else if (e.keyCode == 83) {
				
				console.log("s");
				// ln.preloader("stop");

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
			console.log("playing");
		} else if (mode == "stop") {
			$(".progress").velocity("fadeOut", 200, function() {
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

        	var randomEl = Math.floor(Math.random() * 4) + 1;	
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
				$(window).stop(true).scrollTo("#main", 200); 
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

			ln.gutter = 20;

		// if (ln.screen.mode == "small") {
		// 	ln.gutter = 20;
		// } else {
		// 	ln.gutter = 20;
		// }

		if (ln.screen.mode != "large") {
			$('#header').sticky('update');
		}

		// console.log(ln.screen.mode);

	},
	
	resize : function() {

		this.detectSize();
		this.display();

	},
	
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
	
	ajaxPages : function() {

	    var siteUrl = "http://" + top.location.host.toString();
	
		var incoming;

		var History			= window.History,
			State 			= History.getState(),
			ajaxContent		= '',
			incomingPageId	= null,
			incomingWorkId	= null,
			siteTitle		= 'Lunar North';


	    $(document).on('click', '.ajax.link', "[href^='" + siteUrl + "']:not([href*='/wp-admin/']):not([href*='/wp-login.php']):not([href$='/feed/'])", function (e) {

			e.preventDefault();

			var path = $(this).attr('href'),
				title = $(this).data('title');
			
			ajaxContent = 'page';								

			//If home
			if ($(this).hasClass("url-reel")) {
				ln.reel.toggle();
			} else {

				incomingPageId = $(this).data("page-id");

				if (title != siteTitle || title == "Home") { 
					title += ' - ' + siteTitle; 
				}

				History.pushState('ajax', title, path);
			}

			if ($(this).closest(".menu-box")) {
				$(".menu-box").delay(200).velocity("fadeOut", 200);
				$(".menu-button a").delay(200).removeClass("active");
			}

		});

		var currentPage = function() {

			currentState = History.getState();
	        activeUrl = currentState.url; 

			$activeContent = $('.menu-box .link[href="' + activeUrl + '\"]');
			$(".menu-box .link").removeClass("active");
			$activeContent.addClass("active");


		};

		currentPage();




		var showContent = function(tar, content, option) {

			var el = ".page-" + tar,
				type = option;

			function scrollW() { 
				$(window).stop(true).scrollTo("#main", 500); 
			}

			ln.reel.mode = "close";				

			// Hide none active pages
			$(".page").not(el).css({position:'absolute'}).velocity("transition.slideDownOut", 200);
			if (content != null) { $(el).html(content); }
			// $(el).velocity("transition.slideUpIn", 500).promise().done(function(){
			// 	ln.display();
			// 	ln.detectSize();
			// 	console.log("promise");
			// });

			$(el).velocity("transition.slideUpIn", 500).css({position:'relative'});
			if (tar != "work") { $(".page-work").empty(); }			

			ln.display();
			ln.detectSize();

			$("#main").css({
				// height: $(".page-"+incoming).height(),
				// background: 'rgba(255,0,0,.5)'
			});



		};


	    History.Adapter.bind(window, 'statechange', function() {


			currentState = History.getState();
	        activeUrl = currentState.url; 

	        dUrl = siteUrl + "/wp";

			if (activeUrl == dUrl || activeUrl == dUrl+"/") {
				incoming = "home";
			} else if (activeUrl == dUrl+"/about" || activeUrl == dUrl+"/about/") {
				incoming = "about";
			} else {
				incoming = "work";
			}

		 	if (incoming != "work" && ln.page[incoming]["loaded"] === true) {
				content = null;
				showContent(incoming, content, "old");
				$(".project .link").removeClass('hover');

		 	} else {
				loadPageAjax();
			}

	    });
		
		var activeEl;

		// Load Ajax
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

					activeEl = ".page-" + incoming;
					// el = incoming;

				},
				complete: function() {

					ln.preloader("stop");

					// console.log($(activeEl).attr('id'));
					// console.log(incoming);

					ln.display();
					ln.detectSize();

					if (incoming == "home") {
						ln.navigation.thumbnails();
						ln.page.home.loaded = true;
						$(".page-work").empty();
						// console.log(incoming);

					} else if (incoming == "about") {

						ln.page.about.loaded = true;
						$(".page-work").empty();
						console.log(incoming);			

						if ($("#map").length !== 0) {
							console.log("LOAD MAP");
							// ln.map.init();
						}

						setTimeout(function() {
							ln.map.init();
						}, 20)

					} else {
						ln.embedVideo($(".video-vimeo"));
						ln.embedVideo($(".video-youtube"));
					}

					// $("#main").css({
					// 	// height: $(".page-"+incoming).height(),
					// 	// background: 'rgba(255,0,0,.5)'
					// });

					// $("img.lazy").lazyload({
					//     threshold : 200,
					//     effect : "fadeIn"
					// });

					// if ($("#map").length !== 0) {
					// 	console.log("LOAD MAP");
					// 	ln.map.init();
					// }


					// ln.display();
					// ln.detectSize();
					// ln.navigation.thumbnails();					
					// ln.embedVideo($(".video-vimeo"));
					// ln.embedVideo($(".video-youtube"));

					// ln.map.init();


				},
			});	
		}
	},

	map : {
		loaded : null, 
		init : function() {

			// if (ln.map !== true) {

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

			// }

		}

	}
};