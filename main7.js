console.log('777 is loaded');

var parseJson = function (response) {
    return response.json();
};

var showCity = function(city){
    var el = document.querySelector('.cities-container');
    var html = '<div><h3>' + city.name + '</h3><p>' + Math.ceil(city.main.temp) + '°</p></div>';
    el.innerHTML = html;
}

var loadWeather = function (lat, lon) {
    var query = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid=cb3f5848dbe56a372daeb806652e800e&units=metric';
    fetch(query)
    .then(parseJson)
    .then(function(response){
        showCity(response);
    });
};

var handleShowWeather = function (event) {
    event.preventDefault();
    var searchTerm = document.querySelector('.city-input').value;
    var query = 'https://api.openweathermap.org/geo/1.0/direct?q='+ searchTerm + '&appid=cb3f5848dbe56a372daeb806652e800e';
    fetch(query)
    .then(parseJson)
    .then(function(response){
        loadWeather(response[0].lat, response[0].lon)
    });
};

var init = function(){
    console.log('page is loaded');
    document
        .querySelector('.show-weather')
        .addEventListener('click', handleShowWeather);
};

window.addEventListener('load', init);