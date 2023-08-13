import React, { useEffect, useState } from 'react';
import "./TenDayBox.css"
import DayForecast from '../DayForecast/DayForecast';
import snowIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/snow.png';
import snowShowersDayIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/snow-showers-day.png';
import snowShowersNightIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/snow-showers-night.png';
import thunderRainIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/thunder-rain.png';
import thunderShowersDayIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/thunder-showers-day.png';
import thunderShowersNightIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/thunder-showers-night.png';
import rainIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/rain.png';
import showersDayIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/showers-day.png';
import showersNightIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/showers-night.png';
import fogIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/fog.png';
import windIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/wind.png';
import cloudyIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/cloudy.png';
import partlyCloudyDayIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/partly-cloudy-day.png';
import partlyCloudyNightIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/partly-cloudy-night.png';
import clearDayIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/clear-day.png';
import clearNightIcon from '../../../assets/WeatherIcons-main/PNG/2nd Set - Color/clear-night.png';
import lowIcon from '../../../assets/images/low_temp.png'
import highIcon from '../../../assets/images/high_temp.png'


const weatherIcons = {
    'partly-cloudy-day': partlyCloudyDayIcon,
    'partly-cloudy-night': partlyCloudyNightIcon,
    'clear-day': clearDayIcon,
    'clear-night': clearNightIcon,
    'cloudy': cloudyIcon,
    'fog': fogIcon,
    'rain': rainIcon,
    'showers-day': showersDayIcon,
    'showers-night': showersNightIcon,
    'snow': snowIcon,
    'snow-showers-day': snowShowersDayIcon,
    'snow-showers-night': snowShowersNightIcon,
    'thunder-rain': thunderRainIcon,
    'thunder-showers-day': thunderShowersDayIcon,
    'thunder-showers-night': thunderShowersNightIcon,
    'wind': windIcon,
    // ... add other conditions here ...
};
  

function TenDayBox({ weatherData }) {  
    const daysOfTheWeek = ['Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const date = new Date(weatherData.days[0]['datetime'])
    const firstDay = date.getDay();
    const [openIndex, setOpenIndex] = React.useState(-1);
    let [hidden, setHidden] = React.useState(true);

const handleDayClick = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
    setHidden(hidden = (!hidden));
};

return (
    <div id="ten-day-forecast">
        {weatherData.days.slice(1).map((dayData, index) => (
            <DayForecast
                key={index}
                dayData={dayData}
                dayName={daysOfTheWeek[(firstDay + index) % 7]}
                isOpen={openIndex === index}
                onDayClick={() => handleDayClick(index)}
            />
        ))}
    </div>
);
}

export default TenDayBox;
