$(document).ready(function(e) {
  var t;
  $("#form .form-control").on('focus', function (e) {
    e.preventDefault();
    t = $(this).attr("placeholder");
    $(this).attr("placeholder", "");
  }).on('blur', function (e) {
    e.preventDefault();
    $(this).attr("placeholder", t);
  });
});
