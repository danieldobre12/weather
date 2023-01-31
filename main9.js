console.log('999 is loaded');

const parseJson = (response) => response.json();

const showWeather = (city) => {
    const el = document.querySelector('.cities-container')
    var html = '<div><h3>' + city.name + '</h3><p>' + Math.ceil(city.main.temp) + '℃</p></div>';
    el.innerHTML = html;
}

const loadWeather = (lat, lon) => {
    const query =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=57a3a1c245e533652a9a8b4b65a5d980&units=metric";
    const request = fetch(query)
    .then(parseJson)
    .then((response) => showWeather(response) )
}

const handleShowWeather = (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('.city-input').value;
    const query ="https://api.openweathermap.org/geo/1.0/direct?q=" +
    searchTerm +
    "&appid=57a3a1c245e533652a9a8b4b65a5d980";
    const request = fetch(query)
    .then(parseJson)
    .then((response) => {
        loadWeather(response[0].lat, response[0].lon)
    });
};

 
const init = () => {
    console.log('page is loaded');
    document
        .querySelector('.show-weather')
        .addEventListener('click', handleShowWeather)
}

window.addEventListener('load', init)