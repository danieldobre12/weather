console.log('333 is loaded');

var parseJson = function (response) {
    return response.json();
};

var showWeather = function(city) {
    var el = document.querySelector('.cities-container')
    console.log(city);
    var html = '<div><h3>' + city.name + '</h3><p>' + Math.ceil(city.main.temp) + '°<p>' + city.main.pressure + '</p></p></div>';

    el.innerHTML = html;
};



var loadWeather = function (lat, lon) {
    var query = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid=cb3f5848dbe56a372daeb806652e800e&units=metric';
    fetch(query)
        .then(parseJson)
        .then(function(response){
            showWeather(response)
        });
};


var handlShowWeather = function (event) {
    console.log('clicked');
    var searchTerm = document.querySelector('.city-input').value;
    var query =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      searchTerm +
      "&appid=57a3a1c245e533652a9a8b4b65a5d980";
    var request = fetch(query)
        .then(parseJson)
        .then(function(response){
            console.log(response);
            loadWeather(response[0].lat, response[0].lon)
        })
}

var init = function () {
    console.log('page is loaded');
    document
        .querySelector('.show-weather')
        .addEventListener('click', handlShowWeather)
}

window.addEventListener('load', init);