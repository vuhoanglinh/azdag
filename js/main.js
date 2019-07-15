/**
 * Smooth Scrolling Navigation
 */
jQuery(document).ready(
  (function($) {
    // Scroll to the desired section on click
    // Make sure to add the `data-scroll` attribute to your `<a>` tag.
    // Example:
    // `<a data-scroll href="#my-section">My Section</a>` will scroll to an element with the id of 'my-section'.
    function scrollTo(event) {
      event.preventDefault();
      let selector = $(this).attr("href");
      history.pushState(null, null, selector);
      scrollToSection(selector);
    }
    $("[data-scroll]").on("touchstart click", scrollTo);
    $("[data-collapsed]").on("touchstart click", function() {
      let id = $(this).attr('href');
      $("[data-collapsed]").each(function() {
        let nextId = $(this).attr('href');
        if (id != nextId) {
          $(nextId).removeClass('show');
          $(this).addClass('collapsed');
        }
      });
    });
    scrollToTop(".back-to-top");
    slickCarousel("[data-slick]");
    scrollToSection(location.hash);
    /**
     * Parallax Scrolling
     */
    jQuery(document).ready(function($) {
      if (jQuery().paroller) {
        $("[data-parallax]").paroller();
      }
    });
    
    parallax();
    $(window).scroll(function() {
      parallax();
    });
  })(jQuery)
);

function parallax() {
  let scrolled = $(window).scrollTop();
  $(".parallax").each(function(index, element) {
    let initY = $(this).offset().top + 200;
    let height = $(this).height();
    let endY = initY + $(this).height();
    let size = parseInt($(this).attr("data-ratio") || 20);

    // Check if the element is in the viewport.
    let visible = isInViewport(this);
    if (visible) {
      let diff = scrolled - initY;
      let ratio = Math.round((diff / height) * size);
      let selector = $(this);
      let effect = selector.attr('data-effect');
      selector.addClass(effect).addClass('animated');
      // setTimeout(function() {
      //   selector.removeClass('slideInUp animated');
      // }, 500);
    }
  });  
}

function scrollToSection(selector) {
  try {
    let section = $(selector);
    if (section) {
      $("html, body").animate(
        {
          scrollTop: section.offset().top - 100
        },
        500
      );
      $(".navbar-toggler").addClass("collapsed");
      $(".navbar-collapse").removeClass("show");
    }
  } catch (ex) {
    console.log(ex);
  }
}

function scrollToTop(selector) {
  /**
   * Scroll to Top
   */
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
      // If page is scrolled more than 50px
      $(selector).addClass("back-to-top--is-visible");
    } else {
      $(selector).removeClass("back-to-top--is-visible");
    }
  });
  $(selector).click(function() {
    // When arrow is clicked
    $("body,html").animate(
      {
        scrollTop: 0 // Scroll to top of body
      },
      500
    );
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
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 667,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '90px',
          centerMode: true,
        },
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
}

function isInViewport(node) {
  let rect = node.getBoundingClientRect();
  return (
    (rect.height > 0 || rect.width > 0) &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
}