import React from 'react';
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
import windgusts from '../../../assets/images/wind.png'
import windspeed from '../../../assets/images/wind-turbine.png'
import compass from '../../../assets/images/compass.png'

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

const translations = {
    clear: "Clear",
    clearingpm: "Clearing in the afternoon",
    cloudcover: "Cloud Cover",
    cloudierpm: "Becoming cloudy in the afternoon",
    coolingdown: "Cooling down",
    dew: "Dew Point",
    dow1: "Monday",
    dow2: "Tuesday",
    dow3: "Wednesday",
    dow4: "Thursday",
    dow5: "Friday",
    dow6: "Saturday",
    dow7: "Sunday",
    estprecip: "Estimated precipitation",
    heatindex: "Heat Index",
    humidity: "Relative Humidity",
    id: "desc",
    latlon: "Latitude & Longitude",
    maxt: "Maximum Temperature",
    mint: "Minimum Temperature",
    mostdays: "multiple days",
    norain: "No rain expected",
    overcast: "Cloudy skies throughout the day",
    pop: "Chance Precipitation (%)",
    precip: "Precipitation",
    precipcover: "Precipitation Cover",
    rainallday: "A chance of rain throughout the day",
    rainam: "Morning rain",
    rainampm: "Rain in the morning and afternoon",
    rainchance: "A chance of rain",
    rainclearinglater: "Rain clearing later",
    raindays: "A chance of rain",
    raindefinite: "Rain",
    rainearlyam: "Early morning rain",
    rainlatepm: "Late afternoon rain",
    rainpm: "Afternoon rain",
    rainsnowallday: "A chance of rain or snow throughout the day",
    rainsnowam: "Morning rain or snow",
    rainsnowampm: "Rain or snow in the morning and afternoon",
    rainsnowchance: "a chance of rain or snow",
    rainsnowclearinglater: "rain or snow clearing later",
    rainsnowdefinite: "rain or snow",
    rainsnowearlyam: "early morning snow or rain",
    rainsnowlatepm: "late afternoon rain or snow",
    rainsnowpm: "afternoon rain or snow",
    sealevelpressure: "Sea Level Pressure",
    similartemp: "similar temperatures continuing",
    sky: "Sky cover",
    snow: "Snow",
    snowallday: "a chance of snow throughout the day",
    snowam: "morning snow",
    snowampm: "snow in the morning and afternoon",
    snowchance: "a chance of snow",
    snowclearinglater: "snow clearing later",
    snowdays: "a chance of snow",
    snowdefinite: "snow",
    snowdepth: "Snow Depth",
    snowearlyam: "early morning snow",
    snowlatepm: "late afternoon snow",
    snowpm: "afternoon snow",
    solarenergy: "Solar Energy",
    solarradiation: "Solar Radiation",
    stationdistance: "Mean Station Distance",
    stationInfo: "Contributing Stations",
    stormspossible: "storms possible",
    stormsstrong: "strong storms possible",
    sunshine: "Sunshine",
    temp: "Temperature",
    today: "today",
    tomorrow: "tomorrow",
    variablecloud: "Partly cloudy throughout the day",
    visibility: "Visibility",
    warmingup: "warming up",
    wdir: "Wind direction",
    weatherType: "Weather Type",
    wgust: "Wind Gust",
    windchill: "Wind Chill",
    wspd: "Wind Speed"
};

function translateWeatherString(input) {
    const words = input.toLowerCase().slice(0, -1).split(' ');
    const resultArray = [];
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (translations[word]) {
            resultArray.push(translations[word]);
        } else {
            resultArray.push(word); // Keep the original word if no translation
        }
    }
    const mixedCaps = resultArray.join(' ');
    const lowerCaps = mixedCaps.toLowerCase();
    const result = lowerCaps.charAt(0).toUpperCase() + lowerCaps.slice(1);
    return result;
}




function DayForecast({ dayData, dayName, isOpen, onDayClick, hidden }) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const directionIndex = Math.round(dayData["winddir"] / 45) % 8;
    const shorthandDirection = directions[directionIndex];

    const inputString = dayData['description'];
    const translatedString = translateWeatherString(inputString);
        
    return (
        <motion.div
            animate={{ height: isOpen ? 540 : 43 }}
            onClick={onDayClick}
            className="ten-day-forecast-item"
        >
            <div className="mini-content">
                <div className="day-of-the-week">{dayName}</div>
                <div className="ten-day-icon"><img src={weatherIcons[dayData['icon']]} alt="Weather Icon" /></div>
                <div className="low"><img className="arrows" src={lowIcon} alt="Low Icon" />{dayData['tempmin']}</div>
                <div className="high"><img className="arrows" src={highIcon} alt="High Icon" />{dayData['tempmax']}</div>
                <div className="description-above">{translatedString}</div>
            </div>
            <div className="ten-day-forecast-details">
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: hidden ? 0 : 1, height: hidden ? 0 : 'auto' }}
                transition={{ duration: 0.3 }}
                >
                    <div className="grid-container">
                    <div className="description-below">{translatedString}</div>
                        <div className="chart-container" >
                            <div className="dayGraph"><DayGraph dayWeather={dayData} /></div>
                        </div>
                        <div className="day-data-below-chart">
                            <div className="sunrise_sunset">
                                <div className="sunrise tooltip"><img src={sunrise}></img>{dayData['sunrise'].slice(0, -3)}<span className="tooltiptext">Sunrise</span></div>
                                <div className="sunset tooltip"><img src={sunset}></img>{dayData['sunset'].slice(0, -3)}<span className="tooltiptext">Sunset</span></div>
                            </div>
                            <div className="wind">
                                <div className="windspeed tooltip"><img src={windspeed}></img>{dayData["windspeed"]} <span className="tooltiptext">Wind speed</span></div>
                                <div className="wind-gusts tooltip"><img src={windgusts}></img>{dayData["windgust"]}<span className="tooltiptext">Wind gusts</span></div>
                                <div className="wind-direction tooltip"><img src={compass} style={{ transform: `rotate(${dayData["winddir"]}deg)` }}></img>{shorthandDirection}<span className="tooltiptext">Wind direction</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
            </div>
        </motion.div>
    );
}

export default DayForecast;

