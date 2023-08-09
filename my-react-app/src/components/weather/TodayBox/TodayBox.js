import React from 'react';
import "./TodayBox.css"

function TodayBox({ currentWeatherData, threeHourWeatherData }) {
    // Get the current timestamp
    const currentTimestamp = new Date().getTime();

    // Iterate through the API response to find the temperature values for the next 6 hours
    const nextSixHours = [];
    for (let i = 0; i < 6; i++) {
    const entry = threeHourWeatherData.weatherData.data[i];
    const entryTimestamp = new Date(entry.timestamp_local);
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
                <div id="todayDescription" className="todayDescription">{currentWeatherData.weatherData.data[0].weather.description}</div>
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