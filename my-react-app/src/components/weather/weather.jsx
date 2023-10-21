import React, { useState, useEffect } from 'react';
import UpperBox from './UpperBox/UpperBox';
import TenDayBox from './TenDayBox/TenDayBox';
import TodayBox from './TodayBox/TodayBox';
import sunnyImage from '../../assets/images/sunny3.jpg';
import cloudyImage from '../../assets/images/cloudy2.jpg';
import rainyImage from '../../assets/images/rain2.jpg';
import snowyImage from '../../assets/images/snow.jpg';
import foggyImage from '../../assets/images/fog.jpg';
import sleetImage from '../../assets/images/sleet.jpg';
import stormyImage from '../../assets/images/storm.jpg';

const WeatherComponent = ({ lat, lon, locationName, handleManualSubmit, handleGeolocationRequest }) => {
  const [weatherData, setWeatherData] = useState(null);

  const weatherTypeToImageGroup = {
    // Precipitation
    type_2: rainyImage, // Drizzle
    type_3: rainyImage, // Heavy Drizzle
    type_4: rainyImage, // Light Drizzle
    type_5: rainyImage, // Heavy Drizzle/Rain
    type_6: rainyImage, // Light Drizzle/Rain
    type_21: rainyImage, // Rain
    type_22: rainyImage, // Heavy Rain And Snow
    type_23: rainyImage, // Light Rain And Snow
    type_24: rainyImage, // Rain Showers
    type_25: rainyImage, // Heavy Rain

    // Snow
    type_31: snowyImage, // Snow
    type_32: snowyImage, // Snow And Rain Showers
    type_33: snowyImage, // Snow Showers
    type_34: snowyImage, // Heavy Snow
    type_35: snowyImage, // Light Snow

    // Other
    type_7: foggyImage, // Dust storm
    type_8: foggyImage, // Fog
    type_12: foggyImage, // Freezing Fog
    type_19: foggyImage, // Mist
    type_30: foggyImage, // Smoke Or Haze
    type_37: stormyImage, // Thunderstorm
    type_38: stormyImage, // Thunderstorm Without Precipitation
    type_14: sleetImage, // Light Freezing Rain
    type_10: sleetImage, // Heavy Freezing Drizzle/Freezing Rain
    type_11: sleetImage, // Light Freezing Drizzle/Freezing Rain
    type_9: sleetImage, // Freezing Drizzle/Freezing Rain
    type_13: sleetImage, // Heavy Freezing Rain

    // Clear sky
    type_43: sunnyImage, // Clear

    // Clouds
    type_27: cloudyImage, // Sky Coverage Decreasing
    type_28: cloudyImage, // Sky Coverage Increasing
    type_29: cloudyImage, // Sky Unchanged
    type_41: cloudyImage, // Overcast
    type_42: cloudyImage, // Partially cloudy

    // Special conditions
    type_15: stormyImage, // Funnel Cloud/Tornado
    type_16: stormyImage, // Hail Showers
    type_40: stormyImage, // Hail
    type_36: stormyImage, // Squalls
    type_18: stormyImage, // Lightning Without Thunder
    type_39: stormyImage, // Diamond Dust
    type_17: snowyImage, // Ice
    type_20: rainyImage, // Precipitation In Vicinity
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
          console.log(data);
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
    return <div className="loading-message">
    Loading...
    </div>;
  }

  const image = setBackgroundByType(weatherData['currentConditions']['conditions'].split(",")[0]);
  const boxContainerStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundAttachment: 'fixed',
    height: 'fit-content'
  };

  return (
    <>
      <div className="box-container" style={boxContainerStyle}>
        <div className="page-content-container">
          <UpperBox
            weatherData={weatherData}
            locationName={locationName}
            handleManualSubmit={handleManualSubmit}
            handleGeolocationRequest={handleGeolocationRequest}
          />
          <TodayBox weatherData={weatherData} />
          <TenDayBox weatherData={weatherData} />
        </div>
      </div>
    </>
  );
};

export default WeatherComponent;
