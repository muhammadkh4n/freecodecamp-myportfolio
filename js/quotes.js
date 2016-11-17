$(document).ready(function() {
  var fetch = $("#fetch-quote");
  var quote = $("#quote blockquote p");

  function fetchQuote() {
    $.getJSON("http://quotes.stormconsultancy.co.uk/quotes.json")
      .done(function (a) {
        var data = [];
        for(var i = 0; i < a.length; i++) {
          if (a[i].quote.length <= 150)
            data.push(a[i]);
        }
        var q = data[Math.floor(Math.random() * data.length)];
        quote.html(q.quote + " ― " + q.author);
      })
      .fail(function (res) {
        console.log(res);
        var err = res.status + ", " + res.statusText;
        quote.html(err);
      });
  }

  fetchQuote();

  fetch.on('click', function () {
    quote.html("<i class='fa fa-spinner'></i>");
    fetchQuote();
  });

});
