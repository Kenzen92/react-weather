import React, { useState, useEffect } from 'react';
import TenDayBox from './TenDayBox/TenDayBox';

const WeatherComponent = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${lon}?unitGroup=metric&include=current%2Calerts&key=${import.meta.env.VITE_WEATHER_API_KEY}&contentType=json`)
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [lat, lon]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const currentWeather = weatherData.currentConditions;

  return (
    <>
    <div>
      <h2>Weather in {lat} {lon}</h2>
      <p>Temperature: {currentWeather.temp}°C</p>
      <p>Weather: {currentWeather.conditions}</p>
    </div>
    <div className="box-container">
          <UpperBox  weatherData={weatherData} />
          <TodayBox  weatherData={weatherData} />
          <TenDayBox weatherData={weatherData} />
        </div>
    </>
  );
};

export default WeatherComponent;
