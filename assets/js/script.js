console.log("Linked!");

// API related variables
var apiKey = "943c87cf6f219e578e26afd11fb19f44";
var city;
// var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;
// var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+apiKey;

// console.log(currentWeatherAPI);
// console.log("================================");
// console.log(forecastAPI);
// console.log("================================");

// Search function related variables
var cityInput = $("#city-input");
var submitButton = $("#submit-button");
var historySection = $("#search-history");
var searchHistory = [];

// Current weather function
function currentWeather(city){
    console.log("current weather called properly");

    var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;

    // API call to get current weather
    $.ajax({
        url: currentWeatherAPI,
        method: "GET",
    }).then(function(currentWeather){
        console.log(currentWeather);
    });

    console.log(currentWeatherAPI);
}

// Forecasted weather function
function forecastedWeather(city){
    console.log("forecasted weather called properly");

    var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+apiKey;

    // API call to get forecasted weather
    $.ajax({
        url: forecastAPI,
        method: "GET",
    }).then(function(forecast){
        console.log(forecast);
    });
}
// Function to load stored history
loadHistory();

function loadHistory(){
    var storedHistory = JSON.parse(localStorage.getItem("history"));

    if (storedHistory !== null) {
        for (i = 0; i < storedHistory.length; i++) {
            console.log("Loop ran");
            // Adding stored searches to searchHistory array
            searchHistory.push(storedHistory[i]);

            // Creating a variable for the stored searches and appending to the list
            var storedSearch = storedHistory[i];

            // Replacing "+" in city strings with spaces to display
            if (storedSearch.indexOf("+") >= 0) {
                storedSearch = storedSearch.replace("+", " ");
            }
            
            var listSearch = $("<li>").addClass("list-group-item list-group-item-action text-muted").text(storedSearch);
            historySection.append(listSearch);
        }
    }
}


// Save searchHistory to local storage
function saveHistory(){
    // Stringify array into localStorage
    localStorage.setItem("history", JSON.stringify(searchHistory));
}

// Show search history
function showHistory(city){
    // Replacing "+" in city strings with spaces to display
    if (city.indexOf("+") >= 0){
        city = city.replace("+", " ");
    }

    var historyInput = $("<li>").addClass("list-group-item list-group-item-action text-muted").text(city);
    historySection.append(historyInput);
}

// Search city function
function searchFunction(){
    event.preventDefault();

    // Create and set lookUp city as the input value
    var lookupCity = cityInput.val().trim();
    console.log(lookupCity);

    // Conditional to replace space between strings for multi-word cities
    if (lookupCity.indexOf(" ") >= 0){
        lookupCity = lookupCity.replace(/ /g, "+");
    }

    // If no value entered, log it and end the function
    if (cityInput.val() === "" || searchHistory.indexOf(lookupCity) > -1){
        console.log("Empty OR duplicate!");
        return;
    }
    
    // Storing search content into searchHistory array and displaying history
    searchHistory.push(lookupCity);
    console.log(searchHistory);
    saveHistory();
    showHistory(lookupCity);

    // Clear out search contents on click
    cityInput.val("");

    // Running current and forecasted weather functions
    currentWeather(lookupCity);
    forecastedWeather(lookupCity);
}

// Search based on history
function searchFromHistory(event){
    console.log("search from history called");
    var selectedCity = $(event.target).text();

    // Conditional to replace space between strings for multi-word cities
    if (selectedCity.indexOf(" ") >= 0){
        selectedCity = selectedCity.replace(/ /g, "+");
    }

    console.log(selectedCity);
    currentWeather(selectedCity);
    forecastedWeather(selectedCity);
}

historySection.on("click","li", searchFromHistory);
submitButton.on("click",searchFunction);