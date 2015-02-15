$(document).ready(function () {

  /* ========================================================================
     Fullscreen burger menu
   ========================================================================== */
  $(".menu-trigger, .mobilenav").click(function () {
    $(".mobilenav").fadeToggle(500);
  });
  $(".menu-trigger, .mobilenav").click(function () {
    $(".top-menu").toggleClass("top-animate");
    $(".mid-menu").toggleClass("mid-animate");
    $(".bottom-menu").toggleClass("bottom-animate");
  });

  /* ========================================================================
   Header carousel
   ========================================================================== */

  var wow = new WOW({
    mobile: false
  });
  wow.init();

  /* Header Height Control
   ========================================================================== */
  var height = $(window).height();
  if(height<600) {
    height = 600;
  }
  $('header').css({
    'minHeight': 0,
    'maxHeight': 'none',
    'height': height
  });



  /* ========================================================================
     Collapse event
   ========================================================================== */
  $('.panel-collapse').on('shown.bs.collapse', function () {
   $(this).parent().find(".state").html('<strong>-</strong>');
  });

  $('.panel-collapse').on('hidden.bs.collapse', function () {
    $(this).parent().find(".state").html('<strong>+</strong>');
  });

  /* ========================================================================
     Animated Skill Bar
   ========================================================================== */
  $('.skill-bar li').each(function (i) {
    $(this).appear(function() {
      $(this).animate({opacity:1,left:"0px"},1200);
      var b = $(this).find(".wrapper span").attr("data-width");
      $(this).find("span").animate({
      width: b + "%"
      }, 1700, "easeInQuart");
    });
  });

  /* ========================================================================
    Member Skill chart
   ========================================================================== */
    for(i=1; i<=16; i++) {
      $('#skill-' + i).circliful();
    }

  /* ========================================================================
    Testimonial Carousel
   ========================================================================== */
  var testimonialCarousel = $("#testimonial-carousel");
  testimonialCarousel.owlCarousel({
    autoPlay : 5000,
    stopOnHover : true,
    slideSpeed  :  1000,
    paginationSpeed : 500,
    goToFirstSpeed : 2000,
    singleItem : true,
    responsive : true,
    addClassActive : true,
    navigation: false
  });


/* ========================================================================
   Nivo Lightbox
 ========================================================================== */
  $('.portfolio a').nivoLightbox({
    effect: 'fall'
  });


/* ========================================================================
   Last Tweet
 ========================================================================== */
    var config = {
      "id": '526796576736301056',
      "domId": 'tweets',
      "maxTweets": 1,
      "enableLinks": false,
      "showUser": false,
      "showTime": false,
      "dateFunction": '',
      "showRetweet": false,
      "customCallback": handleTweets,
      "showInteraction": false
    };
    function handleTweets(tweets){
        var x = tweets.length;
        var n = 0;
        var element = document.getElementById('tweets');
        var html = '<p>';
        while(n < x) {
          html +=  tweets[n];
          n++;
        }
        html += '</p>';
        element.innerHTML = html;
    }
    twitterFetcher.fetch(config);

});

/* ========================================================================
  Portfolio Filter
 ========================================================================== */

jQuery(window).load(function() {
  jQuery(document).ready(function($) {
  /* ========================================================================
     On click menu item animate to the section
   ========================================================================== */
  $('.mobilenav li').on('click', function() {
      var target = $(this).data('rel');
      var $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing');
  });
    var container = $('.portfolio-wrapper');

        container.isotope({
            itemSelector: '.portfolio-item',
            animationEngine: 'best-available',
            animationOptions: {
                duration: 200,
                queue: false
            },
            layoutMode: 'fitRows'
        });

        // sort items on button click
        $('.filters a').on( 'click', function() {
          $('.filters a').removeClass('active');
          $(this).addClass('active');
          var filterValue = $(this).attr('data-filter');
          container.isotope({
            filter: filterValue
          });
          setProjects();
          return false;
        });

        function splitColumns() {
            var winWidth = $(window).width(),
                columnNumb = 1;
            if (winWidth > 1200) {
                columnNumb = 4;
            } else if (winWidth > 900) {
                columnNumb = 3;
            } else if (winWidth > 600) {
                columnNumb = 2;
            }
            return columnNumb;
        }

        function setColumns() {
          var winWidth = $(window).width(),
              columnNumb = splitColumns(),
              postWidth = Math.floor(winWidth / columnNumb);

          container.find('.portfolio-item').each(function() {
              $(this).css({
                  width: postWidth + 'px'
              });
          });
        }
        function setProjects() {
            setColumns();
            container.isotope('layout');
        }
        container.imagesLoaded(function() {
            setColumns();
        });
        $(window).bind('resize', function() {
            setProjects();
        });
      setProjects();
  });
});

/* ========================================================================
   Component: Map
 ========================================================================== */
google.maps.event.addDomListener(window, 'load', init);

function init() {
    var myLatlng = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        center: myLatlng,
        styles: [{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}],
    };
    var mapElement = document.getElementById('map-container');
    var map = new google.maps.Map(mapElement, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'KreFolio!'
    });
}

