$(document).ready(function() {
  var toggle = $("#toggle");
  var toggleIcon = toggle.find("i");
  var sideBar = $("#menu-bar");
  var span = sideBar.find("li span");
  var h1 = sideBar.find("h1");
  var mainContent = $("#main");
  var untouched = true;

  // Checks current state of sidebar according to window size.
  function checkBarState() {
    var w = $(window).width();
    if (w >= 1200) {
      return "wide";
    } else if (w >= 768) {
      return "narrow";
    } else {
      return "hidden";
    }
  }

  // Get current state of the toggle data attr.
  function getState() {
    return toggle.data("toggle");
  }

  // Set sideBar state.
  function setState(state) {
    toggle.data("toggle", state);
  }
  setState(checkBarState());
  console.log(toggle.data("toggle"));

  // Sidebar animate
  function sidebarAnimate(width, display, left, icon, padding) {
    sideBar.animate({ width: width }, 200);
    span.css("display", display);
    h1.css("display", display);
    toggle.animate({ left: left }, 200);
    toggleIcon.attr("class", "fa " + icon);
    if (padding) {
      mainContent.animate({ paddingLeft: width }, 200);
    }
  }

  // hide / show sidebar without animation
  function sidebarNoAnimate(width, icon, hide) {
    sideBar.css("width", width);
    toggleIcon.attr("class", "fa " + icon);
    mainContent.css("padding-left", width);
    toggle.css("left", "0");
    if (hide) {
      span.css("display", "none");
      h1.css("display", "none");
    }
  }

  // Toggle sidbar animation.
  function sidebarToggle(state) {
    var w;
    var d;
    var l;
    var icon;
    if (state == "wide") {
      w = "50px";
      d = "none";
      l = "";
      icon = "fa-arrow-right";
      setState("narrow");
    } else if (state == "narrow") {
      w = "200px";
      d = "inline-block";
      l = "75px";
      icon = "fa-arrow-left";
      setState("wide");
    }
    sidebarAnimate(w, d, l, icon, true);
  }

  // Mobile window sidebar toggle.
  function mSidebarToggle(state) {
    var w;
    var d = "inline-block";
    var l = "";
    var icon = "fa-bars";
    if (state == "wide") {
      w = "0";
      setState("hidden");
    } else {
      w = "200px";
      setState("wide");
    }
    sidebarAnimate(w, d, l, icon, false);
  }

  // Click handler on toggle to fire animation of sidebar.
  toggle.click(function(e) {
    e.preventDefault();
    if ($(window).width() >= 768)
      sidebarToggle(getState());
    else
      mSidebarToggle(getState());
    untouched = false;
  });

  // Hide sidebar in mobile after clicking somethin other than sidebar
  $("#main, #menu-bar li").on('click', function (e) {
    if ($(window).width() < 768) {
      sidebarAnimate("0", "none", "", "fa-bars", true);
      setState("hidden");
    }
  });

  var shifted = false;
  // Set state according to window size.
  $(window).resize(function() {
    var w = $(this).width();
    if (untouched) {
      if (w >= 1200)
        setState("wide");
      else if (w >= 768) {
        setState("narrow");
      } else {
        setState("hidden");
      }
    } else {
      if (w < 768) {
        sidebarNoAnimate("0", "fa-bars");
        setState("hidden");
        shifted = true;
      } else {
        if (shifted) {
          sidebarNoAnimate("50px", "fa-arrow-right", true);
          setState("narrow");
          shifted = false;
        }
      }
    }
  });

});
