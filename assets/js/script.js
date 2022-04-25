var searchedCity = document.querySelector("#city").value;
var submitBtn = document.querySelector("#submit");
var searchHistory = document.querySelector("#search-history");
var dayForecast = document.querySelector("day-forecast");
var weekForecast = document.querySelector("#week-forecast");
var dayTemp = document.querySelector("#temp");
var dayWind = document.querySelector("#wind");
var dayHumidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");
var weekForecastContainer = document.querySelector("#week-forecast");

var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=e1fdfa2386872dd651201114b0cdeacd"    
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
            })
        } else {
            alert("Not a valid entry");
        }
    })
    .catch(function(error){
        alert("Unable to Connect to Open Weather Map")
    })
}

getWeather();