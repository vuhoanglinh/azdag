/**
* Smooth Scrolling Navigation
*/
jQuery(document).ready(function($) {
    // Scroll to the desired section on click
    // Make sure to add the `data-scroll` attribute to your `<a>` tag.
    // Example: 
    // `<a data-scroll href="#my-section">My Section</a>` will scroll to an element with the id of 'my-section'.
    function scrollToSection(event) {
      event.preventDefault();
      var $section = $($(this).attr('href')); 
      $('html, body').animate({
        scrollTop: $section.offset().top
      }, 500);
    }
    $('[data-scroll]').on('click', scrollToSection);

    scrollToTop('.back-to-top');
    carousel('[data-slick]');
}(jQuery));

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

function carousel(selector) {
  // Apply carousel for library media
  $(selector).slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    infinite: true,
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