import React, { useEffect, useState } from 'react';
import "./UpperBox.css"


{/*  Use conditional rendering to display the weather data here */}
function UpperBox({ currentWeatherData }) {
    let minTemp = 0;
    let maxTemp = 0;

    // //Iterate through the data array
    // for (let i = 1; i < threeHourWeatherData.weatherData.data.length; i++) {
    // const temp = threeHourWeatherData.weatherData.data[i].temp;
    
    // // Update minTemp if a lower temperature is found
    // if (temp < minTemp) {
    //     minTemp = temp;
    // }
    
    // // Update maxTemp if a higher temperature is found
    // if (temp > maxTemp) {
    //     maxTemp = temp;
    // }
    // }

  return (
    <div className='newBox'>
        {currentWeatherData ? (
        <>
          <div className='placeName'>{currentWeatherData.placeName}</div>
          <div className='temp'>{currentWeatherData.weatherData.data[0].temp}°</div>
          <div className='description'>{currentWeatherData.weatherData.data[0].weather.description}</div>
          <div className='miniTemps'>
            <div className='low miniTemp'><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`}/> {minTemp}°</div>
            <div className='high miniTemp'><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`}/> {maxTemp}°</div>
          </div>
        </>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
}

export default UpperBox;