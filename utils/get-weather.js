'use strict';
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

// get weather data from OpenWeatherMap API
const getWeather = async (coordinates) => {
  const [lon, lat] = coordinates;
  console.log(lat, lon);
  const urlWeather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  return fetch(urlWeather)
    .then(response => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      throw error; // Rethrow the error to be handled by the caller
    });
}

module.exports = {
  getWeather,
}