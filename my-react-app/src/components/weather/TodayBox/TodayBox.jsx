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
import leftArrow from '../../../assets/images/leftArrow.png'
import rightArrow from '../../../assets/images/rightArrow.png'

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

    let currentFutureHour = firstFutureTime;    
    // iterate through the 6 time slots
    for (let i=1; i< nextSixHours.length; i++) {
        
        if (oneDayOfHours[currentFutureHour].datetime == "23:00:00") {
            const temp = oneDayOfHours[currentFutureHour].temp;
            const icon = weatherIcons[oneDayOfHours[currentFutureHour]['icon']];
            const precipitation = oneDayOfHours[currentFutureHour]['precip'];
            nextSixHours[i] = {"time": "11pm", "temp": temp, "icon": icon, "precipitation": precipitation};
            oneDayOfHours = entry[1]['hours'];
            currentFutureHour = 0;
        }

        else {
            const time = oneDayOfHours[currentFutureHour]['datetime'].slice(0, -3);
            const hours = time.slice(0, 2);
            let timeString;
            let formattedTime
            if (parseInt(hours) > 12) {
                formattedTime = parseInt(hours) - 12;
                timeString = formattedTime.toString() + '' + 'pm'
            }
            else {
                formattedTime = parseInt(hours);
                timeString = formattedTime.toString() + '' + 'am'
            }
            
            const temp = oneDayOfHours[currentFutureHour].temp;
            const icon = weatherIcons[oneDayOfHours[currentFutureHour]['icon']];
            const precipitation = oneDayOfHours[currentFutureHour]['precip'];
            nextSixHours[i] = {"time": timeString, "temp": temp, "icon": icon, "precipitation": precipitation};
        }
        currentFutureHour += 1;
    }

    const hourBoxes = [];
    for (let i = 1; i <= 23; i++) {
        hourBoxes.push(
            <div className="one-hour-box" key={i}>
                <div id={`currentTimePlus${i}`} className="todayItem">{nextSixHours[i].time}</div>
                <div className="todayItem">
                    <img id={`currentIconPlus${i}`} src={nextSixHours[i].icon} alt=""></img>
                </div>
                <div id={`currentTempSmallPlus${i}`} className="todayItem">{nextSixHours[i].temp}°</div>
                <div className="todayItem precip">{nextSixHours[i].precipitation}mm</div>
            </div>
        );
    }

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
        sunshine: "sunshine",
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

    function scrollLeft() {
        const todayBox = document.getElementById("scrollableBox");
        const scrollIncrement = todayBox.scrollWidth / 5;
        todayBox.scrollBy({ left: -scrollIncrement, behavior: 'smooth' });
    }

    function scrollRight() {
        const todayBox = document.getElementById("scrollableBox");
        const scrollIncrement = todayBox.scrollWidth / 5;
        todayBox.scrollBy({ left: scrollIncrement, behavior: 'smooth' });
    }

    const inputString = weatherData['description'];
    const translatedString = translateWeatherString(inputString);

  return (
    <div className="todayBoxBackground">
                <div id="todayDescription" className="todayDescription">{translatedString}</div>
                <div className='todayBox'>
                    <div className="scrollButton">
                        <img className="scroll-arrow" src={leftArrow} onClick={scrollLeft}></img>
                    </div>
                    <div className='todayBoxInner' id="scrollableBox">
                        
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
                    <div className="scrollButton">
                        <img className="scroll-arrow" src={rightArrow} onClick={scrollRight}></img>
                    </div>
                </div>
            </div>
  );

  }
export default TodayBox;