import React, { useEffect, useState } from 'react';
import "./UpperBox.css"
import lowIcon from '../../../assets/images/low_temp.png'
import highIcon from '../../../assets/images/high_temp.png'



{/*  Use conditional rendering to display the weather data here */}
function UpperBox({ weatherData }) {
  return (
    <div className='newBox'>
        <>
          <div className='placeName'>{weatherData.resolvedAddress}</div>
          <div className='temp'>{weatherData.currentConditions.temp}°</div>
          <div className='description'>{weatherData.currentConditions.conditions}</div>
          <div className='miniTemps'>
            <div className='low miniTemp'><img className="arrows" src={lowIcon}/> {weatherData.days[0].tempmin}°</div>
            <div className='high miniTemp'><img className="arrows" src={highIcon}/> {weatherData.days[0].tempmax}°</div>
          </div>
        </>
    </div>
  );
}

export default UpperBox;