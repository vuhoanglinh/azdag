jQuery(document).ready(
  (function($) {
    $("[data-scroll]").on("touchstart click", scrollTo);
    scrollToTop(".back-to-top");
    slickCarousel("[data-slick]");
    scrollToSection(location.hash);
    parallax(".parallax");
    fixedHeader('#header');
    activeNav("[data-scroll]");
    $(window).on('DOMContentLoaded load resize scroll', function() {
      parallax(".parallax");
      activeNav("[data-scroll]");
      fixedHeader('#header');
    }); 

    $("[data-collapsed]").on("click", function() {
      let id = $(this).attr('href');
      $("[data-collapsed]").each(function() {
        let nextId = $(this).attr('href');
        if (id != nextId) {
          $(nextId).removeClass('show');
          $(this).addClass('collapsed');
        }
      });
    });
  })(jQuery)
);

function scrollTo(event) {
  event.preventDefault();
  let selector = $(this).attr("href");
  history.pushState(null, null, selector);
  scrollToSection(selector);
}

function activeNav(selector) {
  try {
    $(selector).each(function(index, element) {
      let id = $(this).attr('href');
      let node = $(id).get(0);
      let rect = node.getBoundingClientRect();
      let clientHeight = parseInt(window.innerHeight) / 2;
      let visible = isInViewport(node);
      if (visible) {
        // history.pushState(null, null, id);
        $(this).parent('li').addClass('active');
      }

      if (!visible || rect.top > clientHeight || rect.bottom < clientHeight) {
        $(this).parent('li').removeClass('active');
      }
    });
  } catch(ex) {
    console.log(ex);
  }
}

function parallax(selector) {
  $(selector).each(function(index, element) {
    // Check if the element is in the viewport.
    let visible = isInViewport(this);
    if (visible) {
      let selector = $(this);
      let effect = selector.attr('data-effect');
      selector.addClass(effect).addClass('animated');
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

function fixedHeader(selector) {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $(selector).addClass("fixed-top");
  } else {
    $(selector).removeClass("fixed-top");
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
          slidesToShow: 2,
          slidesToScroll: 2
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