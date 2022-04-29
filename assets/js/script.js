var searchedCity = document.querySelector("#city");
var submitBtn = document.querySelector("#submit");
var searchHistory = document.querySelector("#search-history");
var dayForecast = document.querySelector("day-forecast");
var weekForecast = document.querySelector("#week-forecast");
var currentCity = document.querySelector("#current-city");
var dayTemp = document.querySelector("#temp");
var dayWind = document.querySelector("#wind");
var dayHumidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#uv-index");
var weekForecastContainer = document.querySelector("#week-forecast");

var formSubmitHandler = function(event) {
    event.preventDefault()

    var city = searchedCity.value.trim();

    if (city) {
        getWeather(city);

        searchedCity.value = "";
        weekForecast.textContent = "";
        dayTemp.textContent = "";
        dayWind.textContent = "";
        dayHumidity.textContent = "";
        uvIndex.textContent = "";
        
    } else {
        alert("Please enter a city")

    }
}

var getWeather = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=e1fdfa2386872dd651201114b0cdeacd"    
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                //EVENTUALLY INPUT CITY AS SECOND PARAMETER
                displayWeather(data);
            })
        } else {
            alert("An Error Occured");
        }
    })
    .catch(function(error){
        alert("Unable to Connect to Open Weather Map")
    })
}

var displayWeather = function(weather) {
    console.log(weather)
    //currentCity.textContent = 
    dayTemp.textContent = weather.current.temp + " F";
    dayWind.textContent = weather.current.wind_speed + " MPH";
    dayHumidity.textContent = weather.current.humidity + "%";
    uvIndex.textContent = weather.current.uvi;


}

submitBtn.addEventListener('click', formSubmitHandler);