// grabbing ids from html and assigning them to variables in js
var search = document.getElementById("search");
var cityInput = document.getElementById("city-input");
var cityName = document.getElementById("current-city-date");
var temp = document.getElementById("temperature");
var currentWeather = document.getElementById("forecast");

// Getting initial date setup
var date = $("#current-date").text(moment().format("MMMM Do YYYY, M:DD:YYYY"));

// Giving my api key a variable so I don't have to copy and paste it in the api link
var apiKey = '180c8d68d4552c60900fe20d3d097e75';

// Function that calls the API and gets the weather from it
function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
    .then((response) => {
        return response.json();
    
    
})

getWeather();


// Saving the city entry into local storage
// search.addEventListener("click", function() {
//     var searchedCity = cityInput.value;


// })