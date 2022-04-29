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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=34.0522&lon=-118.2437&appid=e1fdfa2386872dd651201114b0cdeacd"    
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
    
    // DAY FORECAST
    console.log(weather)
    //currentCity.textContent = 
    dayTemp.textContent = weather.current.temp + " F";
    dayWind.textContent = weather.current.wind_speed + " MPH";
    dayHumidity.textContent = weather.current.humidity + "%";
    uvIndex.textContent = weather.current.uvi ;
    if (weather.current.uvi <= 2) {
        uvIndex.className = "good";
    } else if (2 < weather.current.uvi <= 7) {
        uvIndex.className = "average";
    } else {
        uvIndex.className = "bad";
    }

    // 5-DAY FORECAST
    for (var i = 0; i < 5; i++) {
    var weeklyCard = document.createElement("div")
    weeklyCard.className = "weekly-card";
    var weeklyIcon = document.createElement("img")
    var weeklyTemp = document.createElement("div")
    var weeklyHumidity = document.createElement("div")
    var weeklyWind = document.createElement("div")
    var iconCode = weather.daily[i].weather[0].icon
    
    weeklyIcon.src = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    weeklyTemp.textContent = 'Temp: ' + weather.daily[i].temp.day + ' F';
    weeklyHumidity.textContent = 'Humidity: ' + weather.daily[i].humidity + '%';
    weeklyWind.textContent = 'Wind: ' + weather.daily[i].wind_speed + ' MPH';

    weekForecast.appendChild(weeklyCard);
    weeklyCard.appendChild(weeklyIcon);
    weeklyCard.appendChild(weeklyTemp);
    weeklyCard.appendChild(weeklyHumidity);
    weeklyCard.appendChild(weeklyWind);
    }
}

submitBtn.addEventListener('click', formSubmitHandler);