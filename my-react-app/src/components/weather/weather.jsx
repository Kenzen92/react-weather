import React, { useState, useEffect } from 'react';
import UpperBox from './UpperBox/UpperBox';
import TenDayBox from './TenDayBox/TenDayBox';
import TodayBox from './TodayBox/TodayBox';
import sunnyImage from '../../assets/images/sunny.jpg'; // Import the image directly

const WeatherComponent = ({ lat, lon, locationName }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${lon}?unitGroup=metric&key=${weatherKey}&contentType=json`)
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        setWeatherData(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [lat, lon]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const boxContainerStyle = {
    backgroundImage: `url(${sunnyImage})`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  };

  return (
    <>
    <div className="box-container" style={boxContainerStyle}>
      <div className="page-content-container">
          <UpperBox weatherData={weatherData} locationName={locationName}/>
          <TodayBox  weatherData={weatherData} />
          <TenDayBox weatherData={weatherData} />
        </div>
    </div>
    </>
  );
};

export default WeatherComponent;
