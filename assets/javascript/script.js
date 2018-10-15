$(document).ready(function() {
  // ===========================================================================
  // variables
  // ===========================================================================

  /**
   * function to build query url of gifs after button is clicked
   * @param {*} event
   */
  function gifQuery(event) {
    event.preventDefault();
    empty();
    var query = $(event.currentTarget)
      .val()
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
        cardTitle
          .addClass("card-title")
          .text("Rating: " + response.data[i].rating);
        imageOverlay.addClass("card-img-overlay").append(cardTitle);
        image
          .addClass("card-img")
          .attr("src", response.data[i].images.original_still)
          .attr("data-still", response.data[i].images.original_still)
          .attr("data-animate", response.data[i].images.original)
          .attr("data-state", "still");
        card.addClass("card text-info").append(image, imageOverlay);
      }
    });
  }

  // search bar submission function to create buttons/badge-pills to be queried later
  function pillMaker() {
    var search = $("#gif")
      .val()
      .trim();
    var newPill = $("<a>");
    newPill
      .attr("value", search)
      .attr("href", "#")
      .addClass("badge badge-pill badge-primary")
      .text(search);
    $("#pill-box").append(newPill);
  }

  // function to pause and play gif upon click of gif
  function stillAnimate() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  // function handlers
  $(".gif").on("click", stillAnimate);
  $("#gif-form").on("submit", pillMaker);
  $(".badge").on("click", gifQuery);
});
