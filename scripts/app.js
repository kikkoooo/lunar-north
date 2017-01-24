if (self != top) { 
    $.mobile.focusPage = function ( page ) {
	    return;
    }
}

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

$(document).ready(function(){     
	ku.init();
});

$(window).resize(function(){     
 	ku.resize();
});

$(window).on('orientationchange', function(){
 	ku.resize();
});

var ku = {
	testCount : 0,
    page: {
	    current  : null,
	    incoming : null,	    
    },
    notes : {
	  init		: null,
	  toggle	: null,
	  url  		: null,
	  content 	: null,
	  current	: null,
    },
    pageLoaded : {
	  hp 	: null,
	  info  : null,
	  notes : null	  
    },    
	segment : {
		active: $('#image-1'),	
		last: false,
	},
	mousePosY: null,
    sun: { 
    	rise : null,
    	set : null
	},
    init : function() {

		this.ajaxPages();
		this.pos();
		this.navigation();
		this.movingLine.init();	    

		fontSpy('Rational-Regular', {
		  success: function() {
		  	ku.movingLine.resize();
		  	$('.line').fadeIn(200);
		  },
		  failure: function() {
		  	console.log('uh oh!')
		  }
		});
		
		if($('#vs .left').length) this.resizeBar.init();

/*
        if (self != top) { //if inside iframe
        //don't use focusPage for embedded site to prevent autoscroll
            $.mobile.focusPage = function ( page ) {
            return;
            }
        }
*/
		
				
//		if (('#vs .left').length) this.resizeBar.init();
		
	}, 
	
	checkOffset : function() {
		
        var h = $(window).height(),
            w = $(window).width();
		
	    if ($(document).scrollTop() + window.innerHeight < $('#work footer').offset().top) {
			$('.meta').css({
				bottom: 0
			})
		} else {
			$('.meta').css({
 				bottom: $(document).scrollTop() + window.innerHeight - $('#work footer').offset().top
			})
		}
		
	},
	
	movingLine : { 
		
    	init : function() {

			$('.page-link').click(function() {
		        var h 		= $('#site-nav').width(),
					$line 	= $('.line'),
					$e 		= $(this),
					offset 	= $e.offset(),
					eLeft	= (h - offset.top) - $e.innerWidth(),
					eHeight	= $e.innerWidth();
	
				$line.stop(true).animate({
					left: eLeft,
					width: eHeight
				}, { 
					duration: 400,
					queue: false
				});
				
			});	

			$('.opponent').hover(function(e) {

		        var h 		= $('#site-nav').width(),
					$line 	= $('.line'),
					$e 		= $('#link-work'),
					offset 	= $e.offset(),
					eLeft	= (h - offset.top) - $e.innerWidth(),
					eHeight	= $e.innerWidth();
					
				$line.stop(true).animate({
					left: eLeft,
					width: eHeight
				}, { 
					duration: 400,
				});

			});

			this.resize();

    	},

    	return : function() {

			var h 		= $('#site-nav').width(),
				$line 	= $('.line'),
				$e 		= $('.active'),
				offset 	= $e.offset(),
				eLeft	= (h - offset.top) - $e.width(),
				eHeight	= $e.width();

			$line.stop(true).animate({
				left: eLeft,
				width: eHeight
			}, { 
				duration: 400,
			});

    	},


    	resize : function() {

			var h = $('#site-nav').width(),
				$line = $('.line'),
				$e = $('.active');
				
			if ($e.length) {
				offset 	= $e.offset(),
				eLeft	= (h - offset.top) - $e.width(),
				eHeight	= $e.width();
				$line.css({
					left: eLeft,
					width: eHeight
				});
			}
    	}

	},
	
	navigation : function() {

		$('.close-btn').click(function() {
			$('#notes-content-container').animate({
				top: '100%'
			}, 500)
		})
	},
	
	pos : function() {

        var h = $(window).height(),
            w = $(window).width(),
            $coor = $('.coordinates'),
            $tags = $('.tags-container'),
            $nav = $('#site-nav'),
            $header = $('#site-header'),
            $wrapper = $('#info .container, #notes .container');

		var a = $('.contact-info .contact').outerHeight(true),
			b = parseInt($('#info .container').css('paddingTop')),
			c = parseInt($('.contact-info .image').css('marginBottom')),			
			d = $('#info .social').outerHeight(true),
			e = parseInt($('.contact-info').css('marginTop'));

			mh = h - (a+b+c+d+e),
			$infoImage = $('#info .contact-info .image');
			
		var segment = $('.segment');
			segment.height(h - 70);
			
		var z = 15,
			hw = (w - 25 - 15) / 2;
			

		$infoImage.css({
			maxHeight: mh,
		}) 

		$infoImage.find('img').css({
			maxHeight: mh,
			minHeight: 100
		}) 


		if (w > 780) {

	        $tags.css({
		        top: 135,
		        paddingBottom: 100, 
		        paddingRight: $nav.outerHeight() + 40,  
	        })
	        
	        $wrapper.css({
		        paddingRight: $nav.outerHeight() + 40
	        })
			
			$('.top-50').css({
				left: hw,
				right: 'auto'
			});
		} else {

	        $tags.css({
		        top: 135,
		        paddingBottom: 100, 
		        paddingRight: $nav.outerHeight() + 40,  
	        })

	        $wrapper.css({
		        paddingRight: $nav.outerHeight()
	        })

			$('.top-50').css({
				left: 'auto',
				right: 25
			});
		}
		
		if (ku.page.current == 'notes') {
			$header.width('auto');
		} else if (w < 700) {
			$header.width('auto');
		} else {
			$header.width(hw-25-30);
		}

	

		var mt = $('.loading-bar').height()/2,
			ml = $('.loading-bar').width()/2;

		$('.loading-bar').css({
			marginTop: -mt,
			marginLeft: -ml
		})
		
		if (ku.page.current == 'work') Waypoint.refreshAll();

		var shh = $('#site-header').height();

		if (w > 700 && shh > 35) {
			$('#info .container .contact-info').css({marginTop : 100})
		} else if (w < 700) {
			$('#info .container .contact-info').css({marginTop : 0})
		} else {
			$('#info .container .contact-info').css({marginTop : 70})
		}

		
	},
	
	resize : function() {

		this.pos();
		this.movingLine.resize();
		
		
		if (('#vs .left').length) this.resizeBar.resize();

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

	resizeBar : {

		$trigger 	: $('.trigger'),
		$bar		: $('.resize-bar'),
		$vsRight 	: $('#vs .right'),
		$vsLeft 	: $('#vs .left'),
		i 			: 0,
		md 			: null,
		init : function() {

			that = this;

			var barPos = that.$trigger.position(),
				w = $(window).innerWidth();
				
	        that.$vsRight.width(barPos.left);					
	        that.$vsLeft.width(barPos.left);

			$(document).on('vmousedown mousedown', that.$trigger, function(e) {
			    e.preventDefault();
				md = true;

				$(document).on('vmousemove mousemove', function(e) {

					w = $(window).innerWidth(),

					$('.tolerance').show();

					wl = ((w - (window.innerWidth - e.pageX)) / w) * 100;
					wr = (((window.innerWidth - e.pageX)) / w) * 100;
					bl = ((e.pageX) / w) * 100;

			        that.$vsLeft.width(wl + '%');
					that.$vsRight.width(wr + '%');

			        that.$trigger.css({
				    	left:  bl + '%'
					})


			    });
			    return false;
			});
			
			$(document).on('vmouseup mouseup', function(e) {
				e.preventDefault();
				md = false;
			    $(document).unbind('mousemove');
				$('.tolerance').hide();

				if (isTouchDevice()) {
			        that.$trigger.css({
				        width: w,
						marginLeft: -20,
				        width: 40,
				    });
				} else {
			        that.$trigger.css({
				        width: w,
						marginLeft: -5,
				        width: 10,
				    });
				}

			    return false;
			}); 
			
		},
		resize : function() {

			var barPos = this.$trigger.position(),
				w = $(window).width(),
				that = this;

/*
				wl = ((w - (window.innerWidth - e.pageX)) / w) * 100;
				wr = (((window.innerWidth - e.pageX)) / w) * 100;

		        that.$vsLeft.width(wl + '%');
				that.$vsRight.width(wr + '%');
*/

		}
	}, 
		
	clickThrough : function() {

        $(document).on('mousedown', '.tags', function (e) {
            $(this).hide();
            var bottomElem = document.elementFromPoint(e.clientX, e.clientY);
            $(this).show();
            $(bottomElem).mousedown(); //Manually fire the event for desired underlying element
            return false;
        });

		
	},
	
    waypoints : function() {
	    
	    var $segment = $('.segment');
	    
//	    $('#test').html(ku.page.current);

        $segment.waypoint(function(direction) {
            if (direction === 'down') {

				var la 		= $(this.element).data('latitude'),
					lo 		= $(this.element).data('longitude'),
					mode	= $(this.element).data('mode'),
					imgNum 	= $(this.element).data('image-number'),
					title 	= $(this.element).data('title');
					

				if (ku.page.current == 'work') {

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
					
					ku.segment.active = $(this.element);
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
					
				if (ku.page.current == 'work') {

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
					
					ku.segment.active = $(this.element);
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

			if (ku.segment.active.hasClass('first')) {
				$('#work').addClass('bottom').removeClass('top');
				ku.mousePosY = 'down';
			} else if (ku.segment.active.hasClass('last') && ku.segment.last == false ) {
				if (mouseY >= h/2) {
					$('#work').addClass('bottom').removeClass('top');
					ku.mousePosY = 'down';
				} else {
					$('#work').addClass('top').removeClass('bottom');			
					ku.mousePosY = 'up';					
				}
		    } else if (ku.segment.active.hasClass('last') && ku.segment.last == true) {
				$('#work').addClass('top').removeClass('bottom');			
				ku.mousePosY = 'up';
			} else { 
				if (mouseY >= h/2) {
					$('#work').addClass('bottom').removeClass('top');
					ku.mousePosY = 'down';
				} else {
					$('#work').addClass('top').removeClass('bottom');			
					ku.mousePosY = 'up';					
				}
			}
		
		}).mouseover();

        $(document).keydown(function(e) {
			
			if (e.keyCode == 40) { // Down Arrow
				e.stopImmediatePropagation();
				e.preventDefault();
				var next = ku.segment.active.next();
	            if (ku.segment.active.hasClass('last')) {
		            $('#work .container').stop(true).scrollTo($('#work .container footer'), {
		                duration: 200,
		                onAfter: function() {
							ku.segment.last = true;
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
	            if (!ku.segment.active.hasClass('first')) {
					var prev = ku.segment.active.prev();
		            $('#work .container').stop(true).scrollTo(prev, {
		                duration: 200,
		                onAfter: function() {
							ku.segment.last = false;
		                }
		            });
	            }
			}
        })

        
		//Slide images
		$('#work .container').click(function(e) {

			e.stopImmediatePropagation();
			e.preventDefault();

			if (ku.page.current == 'work') {
				if (ku.mousePosY != 'up') {
					var next = ku.segment.active.next();
		            if (ku.segment.active.hasClass('last')) {
			            $('#work .container').stop(true).scrollTo($('#work .container footer'), {
			                duration: 200,
			                onAfter: function() {
								ku.segment.last = true;
			                }
			            });
		            } else {
			            $('#work .container').stop(true).scrollTo(next, {
			                duration: 200
			            });
		            }
				} else {
					var prev = ku.segment.active.prev();
		            if (!ku.segment.active.hasClass('first')) {
			            $('#work .container').stop(true).scrollTo(prev, {
			                duration: 200,
			                onAfter: function() {
								ku.segment.last = false;
			                }
			            });
		            }
				}
			}			
		});
	},
	
	getFlickrData : function() {

        var h = $(window).height(),
            w = $(window).width();
            
		var times = SunCalc.getTimes(new Date(), 42.331429, -83.045753);
		ku.sun.set = $.format.date(new Date(times.sunset), 'Hmm').toLowerCase();
		ku.sun.rise = $.format.date(new Date(times.sunrise), 'Hmm').toLowerCase();
            
		var apiKey 	= '72a9bba166b4b148f5908317a1f27e07',
			flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+apiKey+'&photoset_id=72157651384543111&extras=description,geo,date_upload,tags&format=json&nojsoncallback=1';
	    	    
	    $.ajax({
	        type: 'GET',
	        url: flickrUrl,
		    tryCount : 0,
		    retryLimit : 3,
			dataType: 'json',
	        beforeSend: function() {
				ku.loadingBar(true);
	        },
	        success: function(data) {

				var totalCount = data.photoset.photo.length;
				var imagesToInsert = [];

				$.each(data.photoset.photo, function(i, photo){

					src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg',
					la = photo.latitude,
					lo = photo.longitude,
					desc = photo.description,
					title = photo.title;
					border = '';
					dateUpload = photo.dateupload,
					timestampInMilliSeconds = dateUpload * 1000,
					date = new Date(timestampInMilliSeconds);
					meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
					time = $.format.date(new Date(date), 'Hmm');
					startTime = ku.sun.rise;
					endTime = ku.sun.set;

					var colorMode;
					
					if (parseInt(time) > parseInt(startTime) && parseInt(time) < parseInt(endTime)) {
 						colorMode = 'day';
					} else {
 						colorMode = 'night';
					}

					console.log('time: ' + time + ' startime: ' +  startTime + ' endtime: ' + endTime + ' : ' + colorMode);

					tags = photo.tags.split(' ');
					time = $.format.date(new Date(date), 'h:mm a').toLowerCase();
					
					if (jQuery.inArray('www', tags)) {
					} else {
						border = 'web';
					}

					tags.push(time);

					if (colorMode == 'night') tags.push('<span class="night-icon"></span>');

					shuffle(tags);
					imageNum = i + 1;
					
					horizontalAlign = ['l-10', 'l-25', 'l-35', 'c-50', 'r-35', 'r-25', 'r-10'];
					shuffle(horizontalAlign);
					horizontalAlignRandom = horizontalAlign[Math.floor(Math.random() * horizontalAlign.length)];
					
					if (imageNum == 1) {
						image = '<li id="image-' + imageNum + '" class="segment first" data-title="'+title+'" data-image-number="' + imageNum + '" data-mode="' + colorMode + '" data-meridiem="' + meridiem + '" data-latitude="' + la + '" data-longitude="' + lo + '">\
										<img class="' + horizontalAlignRandom + ' '+border+'" src="' + src + '"/>\
								</li>';				
					} else if (imageNum == totalCount) {
						image = '<li id="image-' + imageNum + '" class="segment last" data-title="'+title+'" data-image-number="' + imageNum + '" data-mode="' + colorMode + '" data-meridiem="' + meridiem + '" data-latitude="' + la + '" data-longitude="' + lo + '">\
										<img class="' + horizontalAlignRandom + ' '+border+'" src="' + src + '"/>\
								</li>';				
					} else {
						image = '<li id="image-' + imageNum + '" class="segment" data-title="'+title+'" data-image-number="' + imageNum + '" data-mode="' + colorMode + '" data-meridiem="' + meridiem + '" data-latitude="' + la + '" data-longitude="' + lo + '">\
										<img class="' + horizontalAlignRandom + ' '+border+'" src="' + src + '"/>\
								</li>';				
					}

			        imagesToInsert.push(image);

					tagNav = '<ul id="tag-image-' + imageNum + '" class="tags">\
									<li class="column-1 column"></li>\
									<li class="column-2 column"></li>\
									<li class="column-3 column"></li>\
									<li class="column-4 column"></li>\
							</ul>';

			        $('.tags-container').append(tagNav);
			        
			        
					col = 1;
					overFlow = [1, 2, 3, 4];
					shuffle(overFlow);

					textAlign = ['left', 'center', 'right'];
					verticalAlign = [0, 10, 20, 30, 40, 50, 60, 70, 80];
					shuffle(verticalAlign);
					
					// append each tag inside each li image
					$.each(tags, function(index, value) { 
						
						// Randomly select from textAlign array
						randomTextAlign = textAlign[Math.floor(Math.random() * textAlign.length)];
						verticalAlignRandom = verticalAlign.sort(function() { return 0.5 - Math.random();}).pop();
						
						tagName = '<div class="image-tag-' + imageNum + ' image-tag align-' + randomTextAlign + '" style="top:' + verticalAlignRandom + '%">' + value + '</div>';

					    if (col >= 5) {
						    var number = overFlow.sort(function() { return 0.5 - Math.random();}).pop();
					        $('#tag-image-'+imageNum).find('.column-' + number).append(tagName);
					    } else {
					        $('#tag-image-'+imageNum).find('.column-' + col).append(tagName);
					    }
					    col++;
					});
										
			    });
				
				$('.images').append(imagesToInsert.join(''));


			    
			    
			    
	            var imageCount = totalCount,
	            	imagesLoaded = 0;
				
				$('.count').prepend('<span class="current">1</span>/');
	            $('.segment img').each(function() {
					$(this).on('load', function() {
	                    ++imagesLoaded;
						$('#work .count .total').text(imagesLoaded);
		                if (imagesLoaded == totalCount) {
							$('.images').css('opacity', 1).delay(500).animate({
								marginTop: 0
							}, 1000, function() {
								ku.loadingBar(false);
								$('#work .meta').fadeIn(500);
								ku.waypoints();
							});
							$('#work footer').animate({
								marginTop: 0
							});
		                }
					});

					
	            });
			    
		    },
	        complete: function() {
		        ku.pos();
		        		        
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
		    }
		});
		
		$('#work .container').scroll(function() {
		    ku.checkOffset();
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
				ku.notes.url = path;


				$('#link-notes').attr('href', ku.notes.url);
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
			ku.page.current = 'work';
			ku.getFlickrData();
			ku.pageLoaded.hp = true;
		}

		if (!$('#work').length) {
			ku.loadingBar(false);
		}

		// Init for single notes landing
		if ($('#notes-content-container').hasClass('init') && ku.notes.init != true) {
		
			ku.notes.init = true;
			ku.notes.toggle = true;
			
			currentState = History.getState(); // Note: Using History.getState() instead of event.state
			ku.notes.url = currentState.url;

			$('#link-notes').attr('href', ku.notes.url);
			
// 			ku.loadingBar(false);
			
			initIframe();
			$('#site-header').addClass('notes-x');

			
// 			$('#notes-content-container .content').attr('notes-id');
			ku.notes.current = $('#notes-content-container .content').data('notes-id');

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
					ku.loadingBar(false);
					$('#site-header').removeClass('notes-x');
				}
			});
		}
		
		function loadContent(iframeContent) {
			$('.close-btn').fadeIn(100);			
			if (ku.notes.current != incomingId) {
				$('#notes-content-container').html(iframeContent);
				initIframe();
/*
				$('#notes-content-container').html(iframeContent).promise().done(function(){
					initIframe();
			    });
*/
				ku.notes.current = $('#notes-content-container .content').data('notes-id');		    
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
				ku.loadingBar(false);
			});
	    }

		function loadNotesAjax() {
			State = History.getState();
			$.ajax({
	            url: State.url,
			    tryCount : 0,
			    retryLimit : 3,
				beforeSend: function() {

					if (ku.notes.current != incomingId) {
						$('#notes-content-container').html('');
						ku.loadingBar(true);						
					}
				},

				success: function(respond){

					content = $(respond).find('.content');


					if (ku.notes.init != true && $('#notes-content-container .content').length == 0) {
						
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

//					ku.notes.current = content.data('notes-id');

					ku.notes.toggle = true;
					ku.notes.init = true;
					ku.pos();
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
					
					if (ku.notes.toggle == true && objId != 'notes') {
						$('#site-header').removeClass('notes-x');								
					} else if (ku.notes.toggle == true && objId == 'notes') {
						$('#site-header').addClass('notes-x');
					} else if (ku.notes.toggle == false) {
						$('#site-header').removeClass('notes-x');								
					}
															
				}
			});
			ku.pos();
			
			// Scroll to current
			if (objId == 'work' && ku.segment.active.length) {
	            $('#work .container').stop().scrollTo(ku.segment.active, {
	                duration: 500
	            });
			}
			
			
		}

		// Load Ajax
		function loadPageAjax() {

			if (clickTarget == 'work' && ku.pageLoaded.hp == true) {
				slideThis('work');
				ku.page.current = 'work';
				
			} else if (clickTarget == 'notes' && ku.pageLoaded.notes == true) {	
				slideThis('notes');
				ku.page.current = 'notes';
				
			} else if (clickTarget == 'info' && ku.pageLoaded.info == true) {
				slideThis('info');					
				ku.page.current = 'info';

			} else {
				
				ku.loadingBar(true);
											
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
						if (content.is('#work') && ku.pageLoaded.hp != true) {
							$('#content-container').append(content);
							ku.getFlickrData();
							ku.pageLoaded.hp = true;
													
						} else if (content.is('#info') && ku.pageLoaded.info != true) {
							$('#content-container').append(content);
							ku.pageLoaded.info = true;
	
						} else if (content.is('#notes') && ku.pageLoaded.notes != true) {
							$('#content-container').append(content);
							ku.notes.init = true;
							ku.pageLoaded.notes = true;
						}				
						
						ku.page.current = objId;
						slideThis(objId);
						currentPage();
	
					},
					complete: function() {
						if (clickTarget != 'work') ku.loadingBar(false);
					},
				});	
			}
		}
	}
}

function shuffle(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

$.fn.textWidth = function(){
  var sensor = $('<div />').css({margin: 0, padding: 0});
  $(this).append(sensor);
  var width = sensor.width();
  sensor.remove();
  return width;
};
