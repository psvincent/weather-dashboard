// grabbing ids from html and assigning them to variables in js
const  list = document.querySelector("ul");
const searchButton = document.getElementById("search-button");
const cityEntered = document.getElementById("city-input");
const pastCities = document.getElementById("past-searches");
const city = document.getElementById("city");
const date = document.getElementById("date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const uv = document.getElementById("uv");
const forecast = document.getElementById("forecast");
var citySearched;
var lat;
var lon;


searchButton.addEventListener("click", () => {
    cityLocation(cityEntered.value);
});


if (localStorage.getItem("searchHistory")) {
    pastSearches = JSON.parse(localStorage.getItem("searchHistory"));
  
    renderHistory();
  }
  function renderHistory() {
    pastCities.innerHTML = "";
    pastSearches.forEach((element) => {
      var listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerText = element;
      listItem.addEventListener("click", (e) => {
        cityLocation(e.target.innerText);
      });
      pastCities.appendChild(listItem);
    });
  }


function cityLocation(input) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=180c8d68d4552c60900fe20d3d097e75`)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        citySearched = data[0].name;

        if (!pastSearches.includes(citySearched)) {
            if (pastSearches.length >= 5) {
              pastSearches.shift();
            }
            pastSearches.push(citySearched);
            localStorage.setItem("searchHistory", JSON.stringify(pastSearches));
            renderHistory();
          }

        getWeather();
    });
};

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=180c8d68d4552c60900fe20d3d097e75`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        weatherCard(data);
    });
};

function weatherCard(data) {
    let newDate = new Date().toDateString();

    date.innerText = newDate;
    city.innerText = "City: " + citySearched;
    icon.innerHTML = `<img src = "https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png">`;
    temp.innerText = "Temperature: " + data.current.temp + " °F"
    humidity.innerText = "Humidity: " + data.current.humidity;
    wind.innerText = "Wind Speed: " + data.current.wind_speed;
    uv.innerText = "UV Index: " + data.current.uvi;

    forecastCard(data);
};

function forecastCard(data) {
    forecast.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        let day = data.daily[i];
        let time = `${day.dt}` * 1000;
        let dateDate = new Date(time).toDateString();
        let newDiv = document.createElement("div");

        newDiv.classList.add("card");

        let searchedForecast =
        `<h5>${dateDate}</h5>
        <img src = "https://openweathermap.org/img/wn/${day.weather[0].icon}.png"/>
        <h5>Temp: ${day.temp.day}</h5>
        <h5>Wind: ${day.wind_speed}</h5>
        <h5>Humidity: ${day.humidity}</h5>`;

        newDiv.innerHTML = searchedForecast;
        forecast.appendChild(newDiv);
    };
};

