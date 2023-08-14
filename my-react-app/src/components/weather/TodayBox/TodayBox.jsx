import React from 'react';
import "./TodayBox.css"
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

function TodayBox({ weatherData }) {
    // Get the current timestamp
    const currentTimestamp = new Date().getTime();
    const nextSixHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const entry = weatherData['days'];
    let oneDayOfHours = entry[0]['hours'];
    let firstFutureTime = -1;

    // Iterate through the API response to find the first hour in the future
    for (let i = 0; i < entry[0]['hours'].length; i++) {
        const epochTime = new Date(entry[0]['hours'][i]['datetimeEpoch'] * 1000);
        if (epochTime.getTime() >= currentTimestamp) {
            firstFutureTime = i;
            break;
        }
    }
    if (firstFutureTime === -1) {
        oneDayOfHours = entry[1]['hours'];
        firstFutureTime = 0;
    }

    // Get the timezone offset in milliseconds
    const timezoneOffset = entry['tzoffset']; // Convert minutes to milliseconds
    let currentFutureHour = firstFutureTime;
    console.log("current future", currentFutureHour);
    
    
    // iterate through the 6 time slots
    for (let i=-1; i< nextSixHours.length; i++) {
        const dateTimeEpoch = oneDayOfHours[currentFutureHour].datetimeEpoch * 1000;
        currentFutureHour += 1;

        
        
        // Create a new Date object in UTC
        let entryTimestamp = new Date(dateTimeEpoch);

        // check if current time is the last hour of current day, and iterate day if so
        if ((entryTimestamp).getHours() == 23) {
            oneDayOfHours = entry[1]['hours'];
            currentFutureHour = 0;
        }

        // Get the local timezone offset in minutes
        const localTimezoneOffset = entryTimestamp.getTimezoneOffset();

        // Adjust the time by adding the local timezone offset
        entryTimestamp.setMinutes(entryTimestamp.getMinutes() + localTimezoneOffset);


        // check if the entry is less than or equal to current time, if so skip
        if (entryTimestamp <= currentTimestamp) {
            console.log("entry time less than current time");
            continue;
        }
        // if not, add data to nextSixHours[i]
        else {
            const hour = entryTimestamp.getHours();
            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
            const period = hour >= 12 ? 'pm' : 'am';
            const formattedTime = `${formattedHour}${period}`;
            console.log(formattedTime);
            const temp = oneDayOfHours[i].temp;
            const icon = weatherIcons[oneDayOfHours[i]['icon']];
            const precipitation = oneDayOfHours[i]['precip'];
            nextSixHours[i] = {"time": formattedTime, "temp": temp, "icon": icon, "precipitation": precipitation};
        }
    }
    console.log(nextSixHours);

    const hourBoxes = [];

    for (let i = 1; i <= 23; i++) {
        hourBoxes.push(
            <div className="one-hour-box" key={i}>
                <div id={`currentTimePlus${i}`} className="todayItem">{nextSixHours[i].time}</div>
                <div className="todayItem">
                    <img id={`currentIconPlus${i}`} src={nextSixHours[i].icon} alt=""></img>
                </div>
                <div id={`currentTempSmallPlus${i}`} className="todayItem">{nextSixHours[i].temp}°</div>
                <div className="todayItem">{nextSixHours[i].precipitation}mm</div>
            </div>
        );
    }

  return (
    <div className="todayBoxBackground">
                <div id="todayDescription" className="todayDescription">{weatherData.description}</div>
                <div className='todayBox'>
                    <div className="one-hour-box">
                        <div id="currentTime" className="todayItem">Now</div>
                        <div className="todayItem">
                            <img id="currentIcon" src={weatherIcons[weatherData.currentConditions['icon']]}></img>
                        </div>
                        <div id="currentTempSmall" className="todayItem">{weatherData.currentConditions.temp}°</div>
                        <div className="todayItem">{weatherData.currentConditions.precip}mm</div>
                    </div>
    
                    {hourBoxes}
                    
                </div>
            </div>
  );

  }
export default TodayBox;