// Co-ordinates variables
var latitude = "undefined";
var longitude = "undefined";

// Category variables(RE)
var outdoors = false;
var events = false;
var food = true;
var movies = true;
var cost = "";
var loc = "";
var time = "";

$(document).ready(function () {
  // First page button - Day(RE)
  $(".initBtnOne").on("click", function () {
    setInterval(function () {
      $(".container").fadeOut("slow");
      setInterval(function () {
        $(".navbar").css("visibility", "visible");
        $(".contain").css("display", "block");
        $(".results").css("display", "flex");
        $(".header").css("display", "block");
      }, 1000);
    }, 500);
  });

  // First page button - Night(RE)
  $(".initBtnTwo").on("click", function () {
    setInterval(function () {
      $(".container").fadeOut("slow");
      setInterval(function () {
        $(".navbar").css("visibility", "visible");
        $(".contain").css("display", "block");
        $(".results").css("display", "flex");
        $(".header").css("display", "block");
      }, 1000);
    }, 500);
  });

  // Category selection when using filter dropdown(RE)
  $(".cat").on("click", function () {
    $(this).css("box-shadow", "inset 4px 4px 4px rgba(0, 0, 0, 0.25)");
    $(this).css("background-color", "#757575");
    console.log($(this).text());
    event.stopPropagation();
  });

  $(".cost").on("click", function () {
    $(this).css("box-shadow", "inset 4px 4px 4px rgba(0, 0, 0, 0.25)");
    cost = $(this).text();
    console.log($(this).text());
    event.stopPropagation();
  });

  $(".loc").on("click", function () {
    $(this).css("box-shadow", "inset 4px 4px 4px rgba(0, 0, 0, 0.25)");
    loc = $(this).text();
    console.log($(this).text());
    event.stopPropagation();
  });

  $(".time").on("click", function () {
    $(this).css("box-shadow", "inset 4px 4px 4px rgba(0, 0, 0, 0.25)");
    time = $(this).text();
    console.log($(this).text());
    event.stopPropagation();
  });

  // Filter dropdown function(RE)
  var dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  });

  function zomatoAPI() {
    var latlong = latitude +
    "&lon=" +
    longitude;
    var settings = {
      url:
        "https://developers.zomato.com/api/v2.1/geocode?lat=" + latlong +
        "&count=5",
      method: "GET",
      timeout: 0,
      headers: {
        Accept: "application/json",
        "user-key": "8ad7cae02b2d6a7122357d5b80d69935",
      },
    };

    $.ajax(settings).done(function (response) {
      var restaurants = [];
      var restaurantList = response.nearby_restaurants;
      for (var restaurant of restaurantList) {
        var data = restaurant.restaurant;
        // object deconstructing
        var {
          name,
          price_range,
          url,
          featured_image,
          location: {
            locality
          },
        } = data;
        var restaurantTime = "12:00:00";
        var restaurantCat = "food";

        restaurants.push({
          name: name,
          cost: price_range,
          url: url,
          img: featured_image,
          shortdesc: name +  " specializes in " + data.cuisines + ".",
          location: locality,
          longdesc: name + " is the best restaurant in " + locality + ".",
          time: restaurantTime,
          cat: restaurantCat
        });
      }
      console.log(restaurants);
      return restaurants;
    });
  }

  var timeDelay = 500;
  setTimeout(zomatoAPI, timeDelay);

  function getGeoLocations(requestType) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      });
    }

    if (latitude !== parseInt(latitude, 10) || latitude === "undefined") {
      // the call failed - use the IP address

      $.ajax("http://ip-api.com/json").then(
        function success(response) {
          latitude = response.lat;
          longitude = response.lon;
          console.log("lat " + latitude + " long + :" + longitude);
        },

        function fail(data, status) {
          // If this fails, we need to get the users ip address to find location settings.
          //console.log("Request failed.  Returned status of", status);
        }
      );
    }
  }

  // this needs to be run straight away to assign the variables.
  getGeoLocations();

  function ticketMaster() {
    var apiTicketmaster = "2fd4BLBJMbQOCZ46tstmLFQbHrYGeXCs";
    var latlong = latitude + "," + longitude;
    var ticketMasterURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=" +
      apiTicketmaster +
      "&" +
      latlong;

    console.log(ticketMasterURL);

    $.ajax({
      type: "GET",
      url: ticketMasterURL,
      async: true,
      dataType: "json",
      success: function (json) {
        console.log(json);
        // showEvents(json);
      },
    }).then(function (response) {
      var eventTitle = response._embedded.events[0].name;
      var imageURL = response._embedded.events[0].images[8].url;
      var eventImage = $("<img>").attr("src", imageURL);

      console.log(eventTitle);
      // $("#resultFou").text(eventTitle)
      // $("resultFou").prepend(eventImage);
    });
  }

  var timeDelay = 500;
  setTimeout(ticketMaster(), timeDelay);

  moviesBox();

  function moviesBox() {
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://box-office-buz1.p.rapidapi.com/videos",
      method: "GET",
      headers: {
        Authorization: "Basic A1B2c3D4E5f6H7I8j911M12=",
        "x-rapidapi-host": "box-office-buz1.p.rapidapi.com",
        "x-rapidapi-key": "fdb9978b68mshd6275eb4a4e31a6p16d146jsn8702ceda1ca0",
      },
    };
    $.ajax(settings).done(function (response) {
      var randNum = Math.floor(Math.random() * 25);
      console.log(randNum);
      var movTitl = $("<h1>");
      var moviesOne = movTitl.text(response.result[randNum].database_title);
      var breakP = $("<br>");
      var breakPTwo = $("<br>");

      var movDes = $("<p>");
      movDes.css("color", "grey");
      var movTwo = movDes.text(response.result[randNum].description);

      var movTrl = $("<iframe>");
      var movThr = movTrl.attr("src", response.result[randNum].embed_url);

      $("#resultThr").append(moviesOne);
      $("#resultThr").append(breakPTwo);
      $("#resultThr").append(movTwo);
      $("#resultThr").append(breakP);
      $("#resultThr").append(movThr);
      console.log(response);
    });
  }
});
