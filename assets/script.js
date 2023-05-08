var APIKey = "82ba04edaa7cb414023cd84472af8a10";
var city = " ";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
var cityNameElement = document.getElementById("city-name");
var currentDateElement = document.getElementById("current-date");

var currentDate = new Date();
var formattedDate = currentDate


// Update the city name and date on the page
cityNameElement.textContent = city;
currentDateElement.textContent = formattedDate;


var searchHistory = [];

// Retrieve search history from local storage
if (localStorage.getItem("searchHistory")) {
  searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
}

// Function to add a search query to the search history array
function addSearchQuery(query) {
  searchHistory.push(query);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}



// Function to display search history on the page// does not work
function displaySearchHistory() {
  var searchHistoryElement = document.getElementById("search-history");
  searchHistoryElement.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var searchQueryEl = document.createElement("p");
    searchQueryEl.textContent = searchHistory[i];
    searchHistoryElement.appendChild(searchQueryEl);
  }
}

var cityInput = document.getElementById("city-input");
cityInput.addEventListener("change", function() {
  city = cityInput.value;
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
  cityNameElement.textContent = city;
  fetchWeather();
addSearchQuery(city);
})
;

function fetchWeather() {

//fetch call for current weather 
fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var tempInKelvin = data.main.temp;
        var tempInFahrenheit = (tempInKelvin - 273.15) * 1.8 + 32;
        var tempString = city + " Temperature: " + tempInFahrenheit.toFixed(1) + "F";
        var weatherResultsCurrent = document.getElementById("weather-results-current");
        weatherResultsCurrent.textContent = tempString;


        var currentWind = data.wind.speed;
        var currentHumidity = data.main.humidity;

        var currentWindEl = document.createElement("p");
        currentWindEl.textContent = "Wind Speed " + currentWind;
        weatherResultsCurrent.appendChild(currentWindEl);

        var currentHumidEl = document.createElement("p");
        currentHumidEl.textContent = "Humidity: " + currentHumidity;
        weatherResultsCurrent.appendChild(currentHumidEl);
        console.log(data);
    })
    .catch(function (error) {
        console.error(error);
    });

//fetchcall for 5 day forecast
fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var weatherResultsFuture = document.getElementById("weather-results-future");
        for (let i = 0; i < 5; i++) {
           
            var tempKelvin = data.list[i].main.temp;
            var dayWind = data.list[i].wind.speed;
            var dayHumidity = data.list[i].main.humidity;
          
            var tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;

           
          
            var forecastDayEl = document.createElement("p");
            forecastDayEl.textContent = "Day " + (i + 1) + " Temperature: " + tempFahrenheit.toFixed(1) + "F";
          
            weatherResultsFuture.appendChild(forecastDayEl);

            var forecastWindEl = document.createElement("p");
            forecastWindEl.textContent = "Wind Speed " + dayWind;
            weatherResultsFuture.appendChild(forecastWindEl);

            var forecastHumidEl = document.createElement("p");
            forecastHumidEl.textContent = "Humidity: " + dayHumidity;
            weatherResultsFuture.appendChild(forecastHumidEl);
        }
        console.log(data);
    })
    .catch(function (error) {
        console.error(error);
    });
}