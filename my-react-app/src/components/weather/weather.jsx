import React, { useState, useEffect } from 'react';
import UpperBox from './UpperBox/UpperBox';
import TenDayBox from './TenDayBox/TenDayBox';
import TodayBox from './TodayBox/TodayBox';
import sunnyImage from '../../assets/images/sunny3.jpg';
import cloudyImage from '../../assets/images/cloudy2.jpg';
import rainyImage from '../../assets/images/rain.jpg';
import snowyImage from '../../assets/images/snow.jpg';
import foggyImage from '../../assets/images/fog.jpg';
import sleetImage from '../../assets/images/sleet.jpg';
import stormyImage from '../../assets/images/storm.jpg';

const WeatherComponent = ({ lat, lon, locationName, handleManualSubmit }) => {
  const [weatherData, setWeatherData] = useState(null);

  const weatherTypeToImageGroup = {
    // ... (your existing mapping)
  };

  // Function to set the background image based on the type number's category
  function setBackgroundByType(typeNumber) {
    const category = weatherTypeToImageGroup[typeNumber];
    return category;
  }

  useEffect(() => {
    const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

    // Generate a unique cache key based on the lat and lon
    const cacheKey = `weatherData_${lat}_${lon}`;

    // Check if weather data is in localStorage
    const cachedWeatherData = localStorage.getItem(cacheKey);

    if (cachedWeatherData) {
      // If cached data exists, parse and set it as the initial state
      setWeatherData(JSON.parse(cachedWeatherData));
    } else {
      // If no cached data, fetch and store it
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${lon}?unitGroup=metric&lang=id&key=${weatherKey}&contentType=json`
      )
        .then((response) => response.json())
        .then((data) => {
          // Store data in localStorage for future use
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setWeatherData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [lat, lon]);

  if (!weatherData) {
    return <div className="loadingMessage">Loading...</div>;
  }

  const image = setBackgroundByType(weatherData['currentConditions']['conditions']);
  const boxContainerStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundAttachment: 'fixed',
  };

  return (
    <>
      <div className="box-container" style={boxContainerStyle}>
        <div className="page-content-container">
          <UpperBox
            weatherData={weatherData}
            locationName={locationName}
            handleManualSubmit={handleManualSubmit}
          />
          <TodayBox weatherData={weatherData} />
          <TenDayBox weatherData={weatherData} />
        </div>
      </div>
    </>
  );
};

export default WeatherComponent;
