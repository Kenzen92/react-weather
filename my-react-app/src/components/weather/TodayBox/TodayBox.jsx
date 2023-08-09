import React from 'react';
import "./TodayBox.css"
import snowIcon from 'my-react-app/src/assets/WeatherIcons-main/PNG/2nd Set - Color/snow.png';
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

function TodayBox({ weatherData }) {
    // Get the current timestamp
    const currentTimestamp = new Date().getTime();

    // Iterate through the API response to find the temperature values for the next 6 hours
    const nextSixHours = [];
    for (let i = 0; i < 6; i++) {
    const entry = weatherData.days.hours[i];
    const entryTimestamp = new Date(entry.datetime);
    const hour = entryTimestamp.getHours();
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedTime = `${formattedHour}${period}`;
    const temp = entry.temp;
    const icon = "https://www.weatherbit.io/static/img/icons/" + entry.weather.icon + ".png";
    const precipitation = entry['precip'];
    nextSixHours.push({"time": formattedTime, "temp": temp, "icon": icon, "precipitation": precipitation});
}

  return (
    <div className="todayBoxBackground">
                <div id="todayDescription" className="todayDescription">{weatherData.description}</div>
                <div className='todayBox'>

                    <div className="one-hour-box">
                        <div id="currentTime" className="todayItem">Now</div>
                        <div className="todayItem">
                            <img id="currentIcon" src={"https://www.weatherbit.io/static/img/icons/" + currentWeatherData.weatherData.data[0].weather.icon + ".png"}></img>
                        </div>
                        <div id="currentTempSmall" className="todayItem">{currentWeatherData.weatherData.data[0].temp}°</div>
                        <div className="todayItem">{nextSixHours[0].precipitation}mm</div>
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