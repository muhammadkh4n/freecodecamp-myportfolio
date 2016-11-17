$(document).ready(function() {
  var about = $("#about");
  var portfolio = $("#portfolio");
  var contact = $("#contact");

  var links = $("ul.navbar-aside li");

  function removeActive(element) {
    element.each(function() {
      $(this).removeClass("active");
    });
  }

  // Get position of the top border of element.
  function getPosition(element) {
    return element.position().top;
  }

  var clicked = false;
  function scrolltoSection(element, position) {
    clicked = true;
    $("body, html").animate({ scrollTop: position }, 500, function() {
      clicked = false;
    });
    removeActive(links);
    $(element).addClass("active");
  }

  $("#welcome-a").on('click', function(e) {
    scrolltoSection(this, 0);
  });

  $("#about-a").on('click', function(e) {
    scrolltoSection(this, getPosition(about));
  });

  $("#portfolio-a").on('click', function(e) {
    scrolltoSection(this, getPosition(portfolio));
  });

  $("#contact-a").on('click', function(e) {
    scrolltoSection(this, getPosition(contact));
  });

  $(window).on('scroll', function(e) {
    var pos = $(this).scrollTop();

    if (!clicked) {
      if (pos < 100); {
        removeActive(links);
        $("#welcome-a").addClass("active");
      }
      if (pos > getPosition(about) - 200) {
        removeActive(links);
        $("#about-a").addClass("active");
      }
      if (pos > getPosition(portfolio) - 200) {
        removeActive(links);
        $("#portfolio-a").addClass("active");
      }
      if (pos > getPosition(contact) - 200) {
        removeActive(links);
        $("#contact-a").addClass("active");
      }
    }

  });

});
