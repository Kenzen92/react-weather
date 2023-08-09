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

    // Iterate through the API response to find the temperature values for the next 6 hours
    const nextSixHours = [];
    const entry = weatherData['days'][0]['hours'];
//     for (let i = 0; i < 6; i++) {
//         const dateTimeEpoch = entry[i].datetimeEpoch * 1000;
//         const entryTimestamp = new Date(dateTimeEpoch);
//         console.log("entrytime stamp", entryTimestamp)
//         const hour = entryTimestamp.getHours();
//         console.log("hour", hour)
//         const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
//         const period = hour >= 12 ? 'pm' : 'am';
//         const formattedTime = `${formattedHour}${period}`;
//         const temp = entry[i].temp;
//         const icon = weatherIcons[weatherData.days[i]['icon']];
//         const precipitation = entry['precip'];
//         nextSixHours.push({"time": formattedTime, "temp": temp, "icon": icon, "precipitation": precipitation});
// }

    // Find the index in the hours array where the current time falls
    let startIndex = -1;
    for (let i = 0; i < entry.length; i++) {
        const dateTimeEpoch = entry[i].datetimeEpoch * 1000;
        if (dateTimeEpoch >= currentTimestamp) {
            startIndex = i;
            break;
        }
    }

    if (startIndex !== -1) {
        // Iterate through the next six hours

        for (let i = startIndex; i < startIndex + 6 && i < entry.length; i++) {
            const dateTimeEpoch = entry[i].datetimeEpoch * 1000;
            const entryTimestamp = new Date(dateTimeEpoch);
            const hour = entryTimestamp.getHours();
            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
            const period = hour >= 12 ? 'pm' : 'am';
            const formattedTime = `${formattedHour}${period}`;
            const temp = entry[i].temp;
            const icon = weatherIcons[weatherData.days[0]['hours'][i]['icon']];
            const precipitation = entry[i]['precip'];
            nextSixHours.push({"time": formattedTime, "temp": temp, "icon": icon, "precipitation": precipitation});
        }
    }
    console.log("next six hours", nextSixHours);

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
                    <div className="one-hour-box">
                        <div id="currentTimePlus3" className="todayItem">{nextSixHours[1].time}</div>
                        <div className="todayItem">
                            <img id="currentIconPlus3" src={nextSixHours[1].icon}></img>
                        </div>
                        <div id="currentTempSmallPlus3" className="todayItem">{nextSixHours[1].temp}°</div>
                        <div className="todayItem">{nextSixHours[1].precipitation}mm</div>
                    </div>
                    <div className="one-hour-box">
                        <div id="currentTimePlus6" className="todayItem">{nextSixHours[2].time}</div>
                        <div className="todayItem">
                            <img id="currentIconPlus6" src={nextSixHours[2].icon}></img>
                        </div>
                        <div id="currentTempSmallPlus6" className="todayItem">{nextSixHours[2].temp}°</div>
                        <div className="todayItem">{nextSixHours[2].precipitation}mm</div>
                    </div>
                    <div className="one-hour-box">
                        <div id="currentTimePlus9" className="todayItem">{nextSixHours[3].time}</div>
                        <div  className="todayItem">
                            <img id="currentIconPlus9" src={nextSixHours[3].icon}></img>
                        </div>
                        <div id="currentTempSmallPlus9" className="todayItem">{nextSixHours[3].temp}°</div>
                        <div className="todayItem">{nextSixHours[3].precipitation}mm</div>
                    </div>
                    <div className="one-hour-box">
                        <div id="currentTimePlus12" className="todayItem">{nextSixHours[4].time}</div>
                        <div className="todayItem">
                            <img id="currentIconPlus12" src={nextSixHours[4].icon}></img>
                        </div>
                        <div id="currentTempSmallPlus12" className="todayItem">{nextSixHours[4].temp}°</div>
                        <div className="todayItem">{nextSixHours[4].precipitation}mm</div>
                    </div>
                    <div className="one-hour-box">
                        <div id="currentTimePlus15" className="todayItem">{nextSixHours[5].time}</div>
                        <div className="todayItem">
                            <img id="currentIconPlus15" src={nextSixHours[5].icon}></img>
                        </div>
                        <div id="currentTempSmallPlus15" className="todayItem">{nextSixHours[5].temp}°</div>
                        <div className="todayItem">{nextSixHours[5].precipitation}mm</div>
                    </div>
                </div>
            </div>
  );

  }
export default TodayBox;