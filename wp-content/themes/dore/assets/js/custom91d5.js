AOS.init();

$.noConflict();
jQuery( document ).ready(function( $ ) {
	
if( $('header video').length ){
	$('header video')[0].play();
}

$('#aspectTabContent').carousel({
	interval: false
});

//show the file name for the uploaded file.
$(".uploadField").change(function(){
	$(this).parent().next().text(this.files[0].name);
});

$('#applicationModalCenter').on('show.bs.modal', function (e) {
	var value = $(e.relatedTarget).data('position');
	if(value){
		$('#dropdownMenuLink').text(value);
		$('#jobPosition').val(value);
	}
})

//sets hidden input for email. 
$('#applicationModalCenter .dropdown-item').click(function(e){
	e.preventDefault();
	var select_value = $(this).text();
	$('#dropdownMenuLink').text(select_value);
	$('#jobPosition').val(select_value);
});

//
$('#aspectTabs A').click(function(e){
	e.preventDefault();
	if( !$(this).hasClass('active') ){
		$('#aspectTabs A.active').removeClass('active').attr('aria-selected', 'false');
		$(this).addClass('active').attr('aria-selected', 'true');
		$('#aspectTabContent').carousel($('#aspectTabs A').index($(this)));
	}
});

if( $('.bio-more').length ){
	var root_url = $('body').data('root');
	
	root_url = root_url.charAt( root_url.length - 1 ) == '/' ? root_url : root_url + '/';
	
	var $moreBlock = $('.bio-more'),
		$img = $moreBlock.closest('.bio-block').prev().find('.color-image'),
		b_height = $img.height() - ( $moreBlock.offset().top - $img.offset().top );
	
	if( ($moreBlock.height() - 26) > b_height ){
		$moreBlock.attr('data-nativeheight', $moreBlock.height());
		$moreBlock.css({
			maxHeight:b_height
		});
		$moreBlock.attr('data-maxheight', b_height);
		$moreBlock.closest('.bio-block').append('<div class="readmore"><span class="more">Read More</span><span class="less">Read Less</span> <img src="' + root_url + 'wp-content/themes/dore/assets/img/chevron-up.svg" class="chevron-up"></div>');
		$('.bio-block').find('.readmore').click(function(){
			var $cur = $(this),
				$textBlock = $cur.prev();
				$cur.toggleClass('active');
				$textBlock.toggleClass('opened');
		});
	}
	
}
	
$('.uploader').click(function(e){
	e.preventDefault();
	$(this).parent().find('INPUT').click();
});

document.addEventListener( 'wpcf7mailsent', function( event ) {
	//event.detail.contactFormId == 8
	var $parent = $('.wpcf7').parent();
	$parent.find('DIV').remove();
	$parent.find('H2').text('Your message has been sent!');
	$parent.append('<p>We will be in touch with you shortly.</p>');
	
	
}, false );
	
var cell_group = $(window).width() < 768 ? 2 : 3;
	
var $carousel = $('.main-carousel').flickity({
	// options
	cellAlign: 'left',
	contain: true,
	pageDots: false,
	groupCells: cell_group
});
	
$('#select-people .person-card').on('click', function (e) {
	e.preventDefault();
	var $cur = $(this);
	if( $cur.hasClass('active') ){
		$('#select-people').removeClass('opened');
		$cur.removeClass('active').attr("aria-selected", "false");
		$($cur.attr('href')).removeClass('active').removeClass('show').find('.bio-block').removeClass('opened');
	} else {
		$('#select-people').addClass('opened');
		$('#select-people A').removeClass('active').attr("aria-selected", "false");
		$('#select-people .tab-pane').removeClass('active').removeClass('show').find('.bio-block').removeClass('opened');
		$cur.addClass('active').attr("aria-selected", "true");
		$($cur.attr('href')).addClass('active').addClass('show');
		setTimeout(function(){
			$($cur.attr('href')).find('.bio-block').addClass('opened');
		},100);
	}
});
	
$('.mobile-person-card').on('click', function (e) {
	e.preventDefault();
	var $cur = $(this);
	if( $cur.hasClass('active') ){
		$('#select-people').removeClass('opened');
		$cur.removeClass('active');
		$($cur.attr('href')).removeClass('active').removeClass('show').find('.bio-block').removeClass('opened');
	} else {
		$('#select-people').addClass('opened');
		$('#select-people A').removeClass('active').attr("aria-selected", "false");
		$('#select-people .tab-pane').removeClass('active').removeClass('show').find('.bio-block').removeClass('opened');
		$cur.addClass('active');
		$($cur.attr('href')).addClass('active').addClass('show');
		setTimeout(function(){
			$($cur.attr('href')).find('.bio-block').addClass('opened');
		},100);
	}
});


$('#mapTabs A').on('shown.bs.tab', function (e) {
	var attr = $('#regionMaps').attr('data-slideto');
	var slideto = 0;

	if (typeof attr !== typeof undefined && attr !== false) {
		slideto = parseInt(attr);
		$('#regionMaps').removeAttr('data-slideto');	
	}
	
	$carousel.flickity('resize');
	$carousel.flickity( 'selectCell', slideto, false, true );
});

/*
$('video').on('ended',function(){
	var $cur = $(this);
	$cur.addClass('played');
});
*/
	
var nospan = true;
	
function span_these(){
	var offset = 100;
	$('.skill').each(function(){
		offset += 100;
		var $cur = $(this);
		setTimeout(function(){
			$cur.addClass('seen');
		}, offset);
	});
}
	
	
var $sidebar   = $(".scroll-fix"),
	$window    = $(window),
	offset     = $sidebar.offset(),
	topPadding = 32,
	waiting;
	


$window.scroll(function() {
	//add ability to scroll fix an element
	if( $sidebar.length ){
		if ($window.scrollTop() > offset.top - topPadding && $window.width() >= 768 ) {
			$sidebar.css({
				position:'fixed',
				top: topPadding
			});
		} else {
			$sidebar.removeAttr('style');
		}	   
	}
	
	if($('#about-you').is(":in-viewport( 120 )")){
		if(nospan){
			span_these();
			nospan = false;
		}
	}
	
	$('.img-wrapper').each(function(){
		if ( $(this).is(":in-viewport( 0 )") ) {
			if( ($(this).offset().top + $(this).height()) > ($(window).scrollTop() + $(window).height()) ){
				var zoom = ($(this).offset().top + $(this).height())/($(window).scrollTop() + $(window).height());
				$(this).find('img').css({
					transform:'scale(' + zoom + ',' + zoom + ')'
				});
			}
		}
	});
	//pause a video not in the viewport
	$('video').each(function(){
		var $cur = $(this);
		if ( $(this).is(":in-viewport( 0 )") && !$(this).hasClass('played') ) {
			$(this)[0].play();
			$cur.addClass('played');
			return;
		} 
		
		if ( !$(this).is(":in-viewport( 0 )") && $(this).hasClass('played') ){
			replay($cur);
		}
	});
	
});

function replay($video){
	$video[0].pause();
	$video[0].currentTime = 0;
	$video[0].load();
	$video.removeClass('played');
}
	

//sets active state on Material Design text inputs
var setActive = function setActive(el, active) {
  var formField = el.parentNode.parentNode;

  if (active) {
    formField.classList.add('form-field--is-active');
  } else {
    formField.classList.remove('form-field--is-active');
    el.value === '' ? formField.classList.remove('form-field--is-filled') : formField.classList.add('form-field--is-filled');
  }
};

//loop through all Material design text inputs to set active
[].forEach.call(document.querySelectorAll('.form-field__input, .form-field__textarea'), function (el) {
  el.onblur = function () {
    setActive(el, false);
  };

  el.onfocus = function () {
    setActive(el, true);
  };
});
	
$('#main-navigation').on('show.bs.collapse', function () {
	$(this).closest('NAV').addClass('nav-open');
	$('HTML').addClass('immobile');
});
	
$('#main-navigation').on('hide.bs.collapse', function () {
	$(this).closest('NAV').removeClass('nav-open');
	$('HTML').removeClass('immobile');
});	
	
	
// Select all links with hashes
$('.smooth-scroll')
  // Remove links that don't actually link to anything
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          //$target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            //$target.focus(); // Set focus again
          }
        });
      }
    }
  });
 
});

(function( $ ) {

/**
 * initMap
 *
 * Renders a Google Map onto the selected jQuery element
 *
 * @date    22/10/19
 * @since   5.8.6
 *
 * @param   jQuery $el The jQuery element.
 * @return  object The map instance.
 */
var mapMarkers = [];
	
function initMap( $el ) {

    // Find marker elements within map.
    var $markers = $el.find('.marker');

    // Create gerenic map.
    var mapArgs = {
        zoom        : $el.data('zoom') || 16,
        mapTypeId   : google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		rotateControl: false,
		styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#223a5e"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": 17
            },
            {
                "weight": "0.50"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#314a6f"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#223a5e"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#223a5e"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#223a5e"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#223a5e"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#203047"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#94989c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": ".5"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#34517c"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#34517c"
            },
            {
                "lightness": 17
            },
            {
                "weight": ".5"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#34517c"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#34517c"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#34517c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#5b7398"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#5b7397"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#34517c"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#34517c"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#34517c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#34517c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

    };
    var map = new google.maps.Map( $el[0], mapArgs );

    // Add markers.
    map.markers = [];
    $markers.each(function(){
        initMarker( $(this), map );
    });

    // Center map based on markers.
    centerMap( map );

    // Return map instance.
    return map;
}

/**
 * initMarker
 *
 * Creates a marker for the given jQuery element and map.
 *
 * @date    22/10/19
 * @since   5.8.6
 *
 * @param   jQuery $el The jQuery element.
 * @param   object The map instance.
 * @return  object The marker instance.
 */
function initMarker( $marker, map ) {

    // Get position from marker.
    var lat = $marker.data('lat');
    var lng = $marker.data('lng');
    var latLng = {
        lat: parseFloat( lat ),
        lng: parseFloat( lng )
    };
	var head_id = $marker.data('headlabel');
	var region_target = $marker.data('region');
	var listing = $marker.data('listing');
	var panel = $marker.data('panel');
	var markerid = $marker.data('markerid');
	
	var icon = {
		url: $marker.data('icon')
	};
	
	var big_icon;
	
	if( $marker.data('big') ){
	   big_icon = {
			url: $marker.data('icon'),
			scaledSize: new google.maps.Size(25, 50),
			anchor:new google.maps.Point(12, 50)
		};
	} else {
		big_icon = {
			url: $marker.data('icon'),
			scaledSize: new google.maps.Size(12, 12),
			anchor:new google.maps.Point(6, 9)
		};   
	}
	

    // Create marker instance.
    var marker = new google.maps.Marker({
        position : latLng,
		icon : icon,
        map: map, 
		id: markerid
    });

    // Append to reference for later use.
    map.markers.push( marker );
	
	mapMarkers.push( marker );
	
	if(head_id){
		
		google.maps.event.addDomListener(document.getElementById(head_id), "mouseover", function(ev) {
			if( marker.icon.size.width == 6 || marker.icon.size.width == 18 ){
			   marker.setIcon(big_icon);
			}
		}); 
		google.maps.event.addDomListener(document.getElementById(head_id), "mouseout", function(ev) {
			if(marker.icon.size.width == 12 || marker.icon.size.width == 25 ){
				marker.setIcon(icon);
			}
		});
		google.maps.event.addDomListener(document.getElementById(head_id), "click", function(ev) {
			var adding = true;
			
			if($(this).hasClass('hovered')){
				$(this).removeClass('hovered');
				adding = false;
			} else {
				$('#regionMaps H6').removeClass('hovered');
				$(this).addClass('hovered');
			}
			
			var region_dot = 'region-' + $(this).attr('id');
			
			for(var i=0;i<mapMarkers.length;i++){

				if(mapMarkers[i].id === region_dot && adding){
					if(mapMarkers[i].icon.url.indexOf('big') > 0){
						var big_icon = {
							url: mapMarkers[i].icon.url,
							scaledSize: new google.maps.Size(30, 60),
							anchor:new google.maps.Point(15, 60)
						};
						mapMarkers[i].setIcon(big_icon);
						
					} else {
						var big_icon = {
							url: mapMarkers[i].icon.url,
							scaledSize: new google.maps.Size(16, 16),
							anchor:new google.maps.Point(8, 12)
						};
						mapMarkers[i].setIcon(big_icon);
					}
				} else {
					var icon = {url: mapMarkers[i].icon.url}
					mapMarkers[i].setIcon(icon);
				}
			}
			
		});
		
		google.maps.event.addDomListener(marker, "mouseover", function(ev) {
			if(marker.icon.size.width == 6 || marker.icon.size.width == 18 ){
				if( !$marker.data('big') ){
				   marker.setIcon(big_icon);
				} else {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
				$('#' + head_id).addClass('hovered');
			}
		}); 
		google.maps.event.addDomListener(marker, "mouseout", function(ev) {
			if(marker.icon.size.width == 12 || marker.icon.size.width == 25 ){
				if( !$marker.data('big') ){
					marker.setIcon(icon);  //setAnimation(google.maps.Animation.BOUNCE);
				} else {
					marker.setAnimation(null);
				}
				$('#' + head_id).removeClass('hovered');
			}
		}); 
		
		google.maps.event.addListener(marker, 'click', function() {
			marker.setAnimation(null);
			
			if( marker.icon.size.width == 16 || marker.icon.size.width == 30 ){
				$('#' + head_id).removeClass('hovered');
				marker.setIcon(icon); 
			} else {
				for(var i=0;i<mapMarkers.length;i++){
					if(mapMarkers[i].id === marker.id ){
						var new_icon;
						if(mapMarkers[i].icon.url.indexOf('big') > 0){
							new_icon = {
								url: mapMarkers[i].icon.url,
								scaledSize: new google.maps.Size(30, 60),
								anchor:new google.maps.Point(15, 60)
							};
							marker.setIcon(new_icon);

						} else {
							new_icon = {
								url: mapMarkers[i].icon.url,
								scaledSize: new google.maps.Size(16, 16),
								anchor:new google.maps.Point(8, 12)
							};
							
						}
						var $cell = $('#' + head_id).parent();
						
						var panel_id = '#panel' + head_id.substr(0,4).toUpperCase();
						var cel_index = parseInt($(panel_id + ' .carousel-cell').index($cell));
						
						$(panel_id + ' .main-carousel').flickity( 'selectCell', cel_index, false, false );

						$('#' + head_id).addClass('hovered');
						mapMarkers[i].setIcon(new_icon);
					} else{
						var icon = {url: mapMarkers[i].icon.url}
						mapMarkers[i].setIcon(icon);
						$('#' + mapMarkers[i].id.substr(7)).removeClass('hovered');
					}
				}	
			}
        });
	}
	
	if(region_target){
		google.maps.event.addDomListener(marker, "mouseover", function(ev) {
			if( !$marker.data('big') ){
			   marker.setIcon(big_icon);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}); 
		google.maps.event.addDomListener(marker, "mouseout", function(ev) {
			if( !$marker.data('big') ){
				marker.setIcon(icon);  //setAnimation(google.maps.Animation.BOUNCE);
			} else {
				marker.setAnimation(null);
			}
		}); 
		
		
		google.maps.event.addListener(marker, 'click', function() {
			if(panel){
				$('#regionMaps').attr('data-slideto', panel);
			}
			
			var region_marker = 'region-' + marker.id.substr(6);
			
			$('#mapTabs a[href="' + region_target + '"]').tab('show');
			$(listing).addClass('hovered');
        });
	}

    // If marker contains HTML, add it to an infoWindow.
    if( $marker.html() ){

        // Create info window.
        var infowindow = new google.maps.InfoWindow({
            content: $marker.html()
        });

        // Show info window when marker is clicked.
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open( map, marker );
        });
    }
}

/**
 * centerMap
 *
 * Centers the map showing all markers in view.
 *
 * @date    22/10/19
 * @since   5.8.6
 *
 * @param   object The map instance.
 * @return  void
 */
function centerMap( map ) {

    // Create map boundaries from all map markers.
    var bounds = new google.maps.LatLngBounds();
    map.markers.forEach(function( marker ){
        bounds.extend({
            lat: marker.position.lat(),
            lng: marker.position.lng()
        });
    });
	
	 //map.setCenter( bounds.getCenter() );
	
    // Case: Single marker.
    if( map.markers.length == 1 ){
        map.setCenter( bounds.getCenter() );

    // Case: Multiple markers.
    } else{
        map.fitBounds( bounds );
    }
	
}

// Render maps on page load.
$(document).ready(function(){
    $('.tab-pane.active .acf-map').each(function(){
        var map = initMap( $(this) );
    });
	
	$('.map-full.acf-map').each(function(){
        var map = initMap( $(this) );
    });
	
	$('#mapTabs A').on('shown.bs.tab', function (e) {
		$('#worldwideMap').hide();
		var $map = $(e.target.hash + ' .acf-map');
		if( $map.find('.marker').length ){
			var map = initMap( $map );
		}
		setTimeout(function(){
			var selected_location = 'region-'  + $('.hovered').attr('id');	
			for(var i=0;i<mapMarkers.length;i++){
				
				if(mapMarkers[i].id === selected_location ){
					var new_icon;
					if(mapMarkers[i].icon.url.indexOf('big') > 0){
						new_icon = {
							url: mapMarkers[i].icon.url,
							scaledSize: new google.maps.Size(30, 60),
							anchor:new google.maps.Point(15, 60)
						};
					} else {
						new_icon = {
							url: mapMarkers[i].icon.url,
							scaledSize: new google.maps.Size(16, 16),
							anchor:new google.maps.Point(8, 12)
						};

					}
					mapMarkers[i].setIcon(new_icon);
				}
			}
		}, 300);

	});
	
	$('.back-global').click(function(e){
		e.preventDefault();
		$(this).closest('.tab-pane').removeClass('active').removeClass('show');
		$('#' + $(this).closest('.tab-pane').attr('aria-labelledby') ).removeClass('active').attr('aria-selected', 'false');
		$('#regionMaps H6').removeClass('hovered');
		$(e.target.hash).fadeIn();
	});
});

})(jQuery);