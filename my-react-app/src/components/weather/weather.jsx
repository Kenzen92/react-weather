import React, { useState, useEffect } from 'react';
import UpperBox from './UpperBox/UpperBox';
import TenDayBox from './TenDayBox/TenDayBox';
import TodayBox from './TodayBox/TodayBox';

const WeatherComponent = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C%20${lon}?unitGroup=metric&include=current%2Chours&key=LTWTSET5LFC62FHPV3WWRHV93&contentType=json`)
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

  return (
    <>
    <div className="box-container">
          <UpperBox weatherData={weatherData} />
          <TodayBox  weatherData={weatherData} />
          <TenDayBox weatherData={weatherData} />
          
        </div>
    </>
  );
};

export default WeatherComponent;
