import React, { useEffect, useState } from 'react';
import "./TenDayBox.css"
import snowIcon from 'C:/Users/james/Programming/react-weather/my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/snow.png';
import snowShowersDayIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/snow-showers-day.png';
import snowShowersNightIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/snow-showers-night.png';
import thunderRainIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/thunder-rain.png';
import thunderShowersDayIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/thunder-showers-day.png';
import thunderShowersNightIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/thunder-showers-night.png';
import rainIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/rain.png';
import showersDayIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/showers-day.png';
import showersNightIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/showers-night.png';
import fogIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/fog.png';
import windIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/wind.png';
import cloudyIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/cloudy.png';
import partlyCloudyDayIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/partly-cloudy-day.png';
import partlyCloudyNightIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/partly-cloudy-night.png';
import clearDayIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/clear-day.png';
import clearNightIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/clear-night.png';

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
    const daysOfTheWeek = ['Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", 'Mon', "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const date = new Date(weatherData.days[0]['datetime'])
    const firstDay = date.getDay();
    console.log(daysOfTheWeek[firstDay - 1]);
  return (
    <div id="ten-day-forecast">
        <div className="ten-day-forecast-item first" id="Today">
            <div id="ten-day-name-0" className="day-of-the-week">Tomorrow</div>
            <div className="ten-day-icon"><img id="ten-day-icon-0" src={weatherIcons(weatherData.days[1]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[1]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[1]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-1">
            <div id="ten-day-name-1" className="day-of-the-week">{daysOfTheWeek[firstDay]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-1" src={getWeatherIcon(weatherData.days[2]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[2]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[2]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-2">
            <div id="ten-day-name-2" className="day-of-the-week">{daysOfTheWeek[firstDay + 1]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-2" src={getWeatherIcon(weatherData.days[3]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[3]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[3]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-3">
            <div id="ten-day-name-3" className="day-of-the-week">{daysOfTheWeek[firstDay + 2]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-3" src={getWeatherIcon(weatherData.days[4]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[4]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[4]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-4">
            <div id="ten-day-name-4" className="day-of-the-week">{daysOfTheWeek[firstDay + 3]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-4" src={getWeatherIcon(weatherData.days[5]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[5]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[5]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-5">
            <div id="ten-day-name-5" className="day-of-the-week">{daysOfTheWeek[firstDay + 4]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-5" src={getWeatherIcon(weatherData.days[6]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[6]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[6]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-6">
            <div id="ten-day-name-6" className="day-of-the-week">{daysOfTheWeek[firstDay + 5]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-6" src={getWeatherIcon(weatherData.days[7]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[7]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[7]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item" id="day-plus-7">
            <div id="ten-day-name-7" className="day-of-the-week">{daysOfTheWeek[firstDay + 6]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-7" src={getWeatherIcon(weatherData.days[8]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[8]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[8]['tempmax']}</div>
        </div>
        <div className="ten-day-forecast-item last" id="day-plus-8">
            <div id="ten-day-name-8" className="day-of-the-week">{daysOfTheWeek[firstDay + 7]}</div>
            <div className="ten-day-icon"><img id="ten-day-icon-8" src={getWeatherIcon(weatherData.days[9]['icon'])}></img></div>
            <div className="low"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/low_temp.png`} />{weatherData.days[9]['tempmin']}</div>
            <div className="high"><img className="arrows" src={`${process.env.PUBLIC_URL}/images/high_temp.png`} />{weatherData.days[9]['tempmax']}</div>
        </div>
    </div>
  );
}

export default TenDayBox;
