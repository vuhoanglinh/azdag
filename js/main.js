/**
* Smooth Scrolling Navigation
*/
jQuery(document).ready(function($) {
    // Scroll to the desired section on click
    // Make sure to add the `data-scroll` attribute to your `<a>` tag.
    // Example: 
    // `<a data-scroll href="#my-section">My Section</a>` will scroll to an element with the id of 'my-section'.
    function scrollTo(event) {
      event.preventDefault();
      var selector = $(this).attr('href'); 
      history.pushState(null, null, selector);
      scrollToSection(selector);
    }
    $('[data-scroll]').on('click', scrollTo);
    scrollToTop('.back-to-top');
    slickCarousel('[data-slick]');
    scrollToSection(location.hash);
    // $(window).on( 'hashchange', function( e ){
    //   event.preventDefault();
    //   scrollToSection(location.hash);
    // });
}(jQuery));

function scrollToSection(selector) {
  var section = $(selector);
  if (section) {
    $('html, body').animate({
      scrollTop: section.offset().top
    }, 500);
    $('.navbar-toggler').addClass('collapsed');
    $('.navbar-collapse').removeClass('show');
  }
}

function scrollToTop(selector) {
  /**
  * Scroll to Top
  */
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $(selector).addClass('back-to-top--is-visible')
    } else {
        $(selector).removeClass('back-to-top--is-visible');
    }
  });
  $(selector).click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
  });
}

function slickCarousel(selector) {
  // Apply carousel for library media
  $(selector).slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}