console.log("Linked!");

var apiKey = "943c87cf6f219e578e26afd11fb19f44";

var city = "Atlanta";

var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;

var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+apiKey;

console.log(currentWeatherAPI);
console.log("================================");
console.log(forecastAPI);
console.log("================================");

// API call to get current weather information
$.ajax({
    url: currentWeatherAPI,
    method: "GET",
}).then(function(currentWeather){
    console.log(currentWeather);
});

$.ajax({
    url: forecastAPI,
    method: "GET",
}).then(function(forecast){
    console.log(forecast);
});