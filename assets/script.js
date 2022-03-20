var apiKey = '180c8d68d4552c60900fe20d3d097e75'

var city = "London"
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data)
    return data.coord;
})
