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
var cityArr = [];

var formSubmitHandler = function(event) {
    event.preventDefault()

    var city = searchedCity.value.trim();

    if (city) {
        getCity(city);
        
    } else {
        alert("Please enter a city")
    }
}

// Turns City into Lat Lon
var getCity = function(city) {
    searchedCity.value = "";
    weekForecast.textContent = "";
    dayTemp.textContent = "";
    dayWind.textContent = "";
    dayHumidity.textContent = "";
    uvIndex.textContent = "";

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=e1fdfa2386872dd651201114b0cdeacd";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                var lat = data[0].lat
                var lon = data[0].lon
                getWeather(lat, lon, city);
                saveCity(city);
            })
        } else {
            alert("An Error Occured");
        }
    })
    .catch(function(error) {
        alert("Unable to Connect to Open Weather Map");
    })
}

// Gets Weather information of City from Api
var getWeather = function(lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=e1fdfa2386872dd651201114b0cdeacd"    
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data){
                displayWeather(data, city);
            })
        } else {
            alert("An Error Occured");
        }
    })
    .catch(function(error){
        alert("Unable to Connect to Open Weather Map");
    })
}

// Displays Weather
var displayWeather = function(weather, city) {
    console.log(weather)
    // DATE
    var unixTime = weather.current.dt * 1000;
    var dateObj = new Date(unixTime);
    var dateTime = dateObj.toLocaleString()
    var date = dateTime.split(" ")[0].split(",")[0];

    // DAY FORECAST
    currentCity.textContent = city + " - " + date;
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
    var unixTime2 = weather.daily[i].dt * 1000;
    var dateObj2 = new Date(unixTime2);
    var dateTime2 = dateObj2.toLocaleString()
    var date2 = dateTime2.split(" ")[0].split(",")[0]; 

    var weeklyCard = document.createElement("div")
    weeklyCard.className = "weekly-card";
    var weekDate = document.createElement("div")
    weekDate.className = "date";
    var weeklyIcon = document.createElement("img")
    var weeklyTemp = document.createElement("div")
    var weeklyHumidity = document.createElement("div")
    var weeklyWind = document.createElement("div")
    var iconCode = weather.daily[i].weather[0].icon
    
    weeklyIcon.src = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    weekDate.textContent = date2;
    weeklyTemp.textContent = 'Temp: ' + weather.daily[i].temp.day + ' F';
    weeklyHumidity.textContent = 'Humidity: ' + weather.daily[i].humidity + '%';
    weeklyWind.textContent = 'Wind: ' + weather.daily[i].wind_speed + ' MPH';

    weekForecast.appendChild(weeklyCard);
    weeklyCard.appendChild(weekDate)
    weeklyCard.appendChild(weeklyIcon);
    weeklyCard.appendChild(weeklyTemp);
    weeklyCard.appendChild(weeklyHumidity);
    weeklyCard.appendChild(weeklyWind);
    }
}

// Save City
var saveCity = function(city) {
    var cityHistory = document.createElement("div")
    cityHistory.textContent = city
    cityHistory.className = "city-history"
    searchHistory.appendChild(cityHistory)
    
    for (i=0; i <= cityArr.length; i++) {
        cityHistory.setAttribute("ID", i);
    }
    
    cityArr.push(city);

    localStorage.setItem("cities", JSON.stringify(cityArr));   

    cityHistory.addEventListener('click', function(event){
        var cityName = this.innerHTML
        getCity(cityName);
    });
}

submitBtn.addEventListener('click', formSubmitHandler);
