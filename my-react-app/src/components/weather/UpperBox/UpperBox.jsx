import React, { useState } from "react";
import { motion } from "framer-motion";
import "./UpperBox.css"
import lowIcon from '../../../assets/images/low_temp.png'
import highIcon from '../../../assets/images/high_temp.png'
import searchIcon from '../../../assets/images/search_icon.png'
import geolocationIcon from '../../../assets/images/geolocation.png'

function UpperBox({ weatherData, locationName, handleManualSubmit, handleGeolocationRequest }) {
  const [isOpen, setIsOpen] = useState(false);

  const weatherDescriptions = {
    type_1: "Blowing or drifting snow",
    type_2: "Drizzle",
    type_3: "Heavy drizzle",
    type_4: "Light drizzle",
    type_5: "Heavy drizzle and rain",
    type_6: "Light drizzle and rain",
    type_7: "Dust storm",
    type_8: "Foggy conditions",
    type_9: "Freezing drizzle or freezing rain",
    type_10: "Heavy freezing drizzle or freezing rain",
    type_11: "Light freezing drizzle or freezing rain",
    type_12: "Freezing fog",
    type_13: "Heavy freezing rain",
    type_14: "Light freezing rain",
    type_15: "Funnel cloud or tornado",
    type_16: "Hail showers",
    type_17: "Icy conditions",
    type_18: "Lightning without thunder",
    type_19: "Misty conditions",
    type_20: "Precipitation in the vicinity",
    type_21: "Rainy weather",
    type_22: "Heavy rain and snow mix",
    type_23: "Light rain and snow mix",
    type_24: "Rain showers",
    type_25: "Heavy rain",
    type_26: "Light rain",
    type_27: "Sky coverage decreasing",
    type_28: "Sky coverage increasing",
    type_29: "Sky unchanged",
    type_30: "Smoky or hazy conditions",
    type_31: "Snowfall",
    type_32: "Snow and rain showers",
    type_33: "Snow showers",
    type_34: "Heavy snowfall",
    type_35: "Light snowfall",
    type_36: "Squalls in the area",
    type_37: "Thunderstorm with precipitation",
    type_38: "Thunderstorm without precipitation",
    type_39: "Diamond dust particles in the air",
    type_40: "Hailstones falling",
    type_41: "Overcast skies",
    type_42: "Partially cloudy skies",
    type_43: "Clear and sunny conditions"
};

function translateWeatherString(input) {
  const words = input.toLowerCase().split(' ');
  const resultArray = [];
  
  for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (weatherDescriptions[word]) {
          resultArray.push(weatherDescriptions[word]);
      } else {
          resultArray.push(word); // Keep the original word if no translation
      }
  }

  return resultArray.join(' ');
}

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0  },
};



  const toggleSearch = () => {
      const searchBar = document.getElementById('search-bar-slider');
      searchBar.style.display = 'flex';
      const searchToggle = document.getElementById('toggle-search');
      searchToggle.style.display = 'none';
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

// function toggleSearch() {
//   const searchBar = document.getElementById('location-form');
//   searchBar.style.display = 'flex';
//   const searchToggle = document.getElementById('toggle-search');
//   searchToggle.style.display = 'none';
//   const geolocationForm = document.getElementById('geolocation-form');
//   geolocationForm.style.display = 'block';
// }
  
  return (
    <div className='newBox'>
      <div className="searchBar">
        <a href="https://kennysolutions.com/"><button className="home-button">Back</button></a>
        <div className='newLocationSearch'>
          <button className="toggle-search" id="toggle-search" type="button" onClick={toggleSearch} >
            <img className="searchButtonImage" src={searchIcon} />
          </button>
          <motion.div
            className={`searchBarSlider ${isOpen ? "open" : "closed"}`}
            id='search-bar-slider'
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
          >
            <form onSubmit={handleGeolocationRequest} id="geolocation-form" className="geolocation-form">
              <button className="searchButton" type="submit">
                  <img className="searchButtonImage tooltip" src={geolocationIcon} />
                  <span id="tootltiptext" className="tooltiptext">Geolocation unavailable</span>
              </button>
            </form>
            <form onSubmit={handleManualSubmit} id="location-form" className="location-form">
              <input className="searchToggle" type="text" placeholder="Type your city name" name="location" id="location" required />
              <button className="searchButton" type="submit">
                <img className="searchButtonImage" src={searchIcon} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <div className='temp'>{weatherData.currentConditions.temp}°</div>
      <div className='placeName'>{locationName}</div>
      <div className='description'>{translateWeatherString(weatherData.currentConditions.conditions)}</div>
      <div className='miniTemps'>
        <div className='low miniTemp'><img className="arrows" src={lowIcon}/> {weatherData.days[0].tempmin}°</div>
        <div className='high miniTemp'><img className="arrows" src={highIcon}/> {weatherData.days[0].tempmax}°</div>
      </div>
    </div>
  );
}

export default UpperBox;