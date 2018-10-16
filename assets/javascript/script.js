$(document).ready(function() {
  // ===========================================================================
  // variables
  // ===========================================================================
  var gifButtonsToLoad = [
    "waiting",
    "thanks",
    "shocked",
    "nope",
    "laughing",
    "thumbs up",
    "popcorn",
    "good luck",
    "eye roll",
    "congratulations",
    "whatever",
    "dancing",
    "mind blown",
    "flirting",
    "excited",
    "confused",
    "yes",
    "happy",
    "wtf",
    "high five"
  ];
  /**
   * function to build query url of gifs after button is clicked
   * @param {*} event
   */
  function gifQuery(event) {
    event.preventDefault();
    $("#gif-dump").empty();

    var query = $(event.target)
      .text()
      .trim();
    var queryUrl =
      "http://api.giphy.com/v1/gifs/search?q=" +
      query +
      "&api_key=PZkBqK7E2LHLEff0B49BQGIW5uTK3Dm7";

    // query request
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).done(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var card = $("<div>");
        var image = $("<img>");
        var imageOverlay = $("<div>");
        var cardTitle = $("<h3>");
        var rate = $("<div>");
        rate
          .addClass("badge badge-dark text-uppercase m-0")
          .attr("title", "Rated " + response.data[i].rating)
          .append(response.data[i].rating);
        cardTitle
          .addClass("card-title")
          .attr("id", "rated")
          .html(rate);
        imageOverlay
          .addClass("card-img-overlay p-0")
          .attr("id", "gif")
          .append(cardTitle);
        image
          .addClass("card-img gif")
          .attr("src", response.data[i].images.original_still.url)
          .attr("data-still", response.data[i].images.original_still.url)
          .attr("data-animate", response.data[i].images.original.url)
          .attr("data-state", "still");
        card
          .addClass("card text-info")
          .click(stillAnimate)
          .append(image, imageOverlay);
        $("#gif-dump").append(card);
      }
    });
  }

  function submitForm(event) {
    event.preventDefault();
    var search = $("#gif")
      .val()
      .trim();
    pillMaker(search);
  }

  // search bar submission function to create buttons/badge-pills to be queried later
  function pillMaker(text) {
    var newPill = $("<a>");
    newPill
      .attr("value", text)
      .attr("href", "#")
      .addClass("badge badge-pill badge-primary")
      .click(gifQuery)
      .text(text);
    $("#pill-box").append(newPill);
  }

  // function to pause and play gif upon click of gif
  function stillAnimate() {
    event.preventDefault();
    var card = $(event.currentTarget);
    var img = card.find("img");
    var overlay = card.find(".card-img-overlay");
    var state = img.attr("data-state");
    if (state === "still") {
      img.attr("src", img.attr("data-animate"));
      img.attr("data-state", "animate");
      overlay.addClass("d-none");
    } else {
      img.attr("src", img.attr("data-still"));
      img.attr("data-state", "still");
      overlay.removeClass("d-none");
    }
  }

  // function handlers
  $("#gif-form").on("submit", submitForm);
  for (var i = 0; i < gifButtonsToLoad.length; i++) {
    pillMaker(gifButtonsToLoad[i]);
  }
});
