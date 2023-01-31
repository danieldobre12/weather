var parseJson = function (response) {
    return response.json();
  };
  
  var showCity = function (city) {
    return (
      '<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' +
      city.name +
      " " +
      Math.ceil(city.main.temp) +
      '°</h5><h6 class="card-subtitle mb-2 text-muted">' +
      city.weather[0].description +
      '</h6><p class="card-text">' +
      '</p> <a href="#" class="card-link delete" data-cityid=' +
      city.id +
      ">Delete city 🗑️</a></div></div>"
    );
  };
  
  var saveCity = function (city) {
    var cities = JSON.parse(localStorage.getItem("savedCities"));
    if (cities === null) {
      cities = [];
    }
    cities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(cities));
    document.querySelector(".city-input").value = "";
  };
  
  var showWeather = function (city) {
    var el = document.querySelector(".cities-container");
    console.log(city);
  
    el.innerHTML += showCity(city);
  };
  
  var loadWeather = function (lat, lon) {
    console.log(lat, lon);
    var query =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=57a3a1c245e533652a9a8b4b65a5d980&units=metric";
  
    fetch(query)
      .then(parseJson)
      .then(function (response) {
        showWeather(response);
        saveCity(response);
      });
  };
  var handleShowWeather = function (event) {
    event.preventDefault();
    var searchTerm = document.querySelector(".city-input").value;
    var query =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      searchTerm +
      "&appid=57a3a1c245e533652a9a8b4b65a5d980";
    var request = fetch(query)
      .then(parseJson)
      .then(function (response) {
        loadWeather(response[0].lat, response[0].lon);
      });
  };
  var handleShowWeather = function (event) {
    event.preventDefault();
    var searchTerm = document.querySelector(".city-input").value;
    var query =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      searchTerm +
      "&appid=57a3a1c245e533652a9a8b4b65a5d980";
    var request = fetch(query)
      .then(parseJson)
      .then(function (response) {
        loadWeather(response[0].lat, response[0].lon);
      });
  };
  
  function init() {
    var cities = JSON.parse(localStorage.getItem("savedCities"));
  
    if (cities !== null) {
      for (var index = 0; index < cities.length; index++) {
        const element = cities[index];
        showWeather(element);
      }
    }
  
    document
      .querySelector(".show-weather")
      .addEventListener("click", handleShowWeather);
  }
  
  window.addEventListener("load", init);
  