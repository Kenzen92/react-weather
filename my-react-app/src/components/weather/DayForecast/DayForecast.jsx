import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import "./DayForecast.css"
import DayGraph from '../DayCharts/DayCharts';

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
import sunrise from '../../../assets/images/sunrise.png'
import sunset from '../../../assets/images/sunset.png'


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
};


function DayForecast({ dayData, dayName, isOpen, onDayClick, hidden }) {
    console.log(dayData);

        
    return (
        <motion.div
            animate={{ height: isOpen ? 1000 : 35 }}
            onClick={onDayClick}
            className="ten-day-forecast-item"
        >
            <div className="mini-content">
                <div className="day-of-the-week">{dayName}</div>
                <div className="ten-day-icon"><img src={weatherIcons[dayData['icon']]} alt="Weather Icon" /></div>
                <div className="low"><img className="arrows" src={lowIcon} alt="Low Icon" />{dayData['tempmin']}</div>
                <div className="high"><img className="arrows" src={highIcon} alt="High Icon" />{dayData['tempmax']}</div>
            </div>
            <div className="ten-day-forecast-details">
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: hidden ? 0 : 1, height: hidden ? 0 : 'auto' }}
                transition={{ duration: 0.3 }}
                >
                    <div className="grid-container">
                        <div className="description">{dayData['description']}</div>
                        <div class="chart-container" >
                            <div className="dayGraph"><DayGraph dayWeather={dayData} /></div>
                        </div>
                        <div className="day-data-below-chart">
                            <div className="sunrise_sunset">
                                <div className="sunrise"><img src={sunrise}></img>{dayData['sunrise']}</div>
                                <div className="sunset"><img src={sunset}></img>{dayData['sunset']}</div>
                            </div>
                            <div className="wind">
                                <div className="windspeed">Windspeed: {dayData["windspeed"]}</div>
                                <div className="wind-gusts">Max wind gusts: {dayData["windgust"]}</div>
                                <div className="wind-direction">Wind direction: {dayData["winddir"]}</div>
                            </div>
                        </div>
                    </div>
                    
                </motion.div>
                
            </div>
        </motion.div>
    );
}

export default DayForecast;

