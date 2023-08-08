import React, { useState, useEffect } from 'react';

const WeatherComponent = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&include=current%2Calerts&key=${import.meta.env.VITE_WEATHER_API_KEY}&contentType=json`)
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [cityName]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const currentWeather = weatherData.currentConditions;

  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <p>Temperature: {currentWeather.temp}°C</p>
      <p>Weather: {currentWeather.conditions}</p>
    </div>
  );
};

export default WeatherComponent;
