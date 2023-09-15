import { useState, useEffect } from 'react';
import Weather from './components/weather/weather';
import './App.css';
import searchIcon from './assets/images/search_icon.png'

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Function to fetch geolocation
  const fetchGeolocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      setLat(latitude);
      setLon(longitude);
      // Reverse geocode the coordinates to get the formatted address
      const geocodeApiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;
      const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${geocodeApiKey}`;

      const reverseGeocodeResponse = await fetch(reverseGeocodeUrl);
      const reverseGeocodeData = await reverseGeocodeResponse.json();

      if (reverseGeocodeData.results.length > 0) {
        const components = reverseGeocodeData.results[0].address_components;
        let districtName = '';
        let cityName = '';
        let countryName = '';

        // Loop through the components and find the district and city names
        for (const component of components) {
          if (component.types.includes('country')) {
            countryName = component.long_name;
          }
          if (component.types.includes('administrative_area_level_3')) {
            districtName = component.long_name;
          } else if (component.types.includes('locality')) {
            cityName = component.long_name;
          }
        }

        const formattedAddress = districtName + ' ' + cityName + ', ' + countryName;
        setLocationName(formattedAddress);
      }

      setGeolocationFetched(true);
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      setShowManualForm(true);
    }
  };

  // Use localStorage to cache API responses
  const cacheKey = 'cachedWeatherData';
  const cachedData = localStorage.getItem(cacheKey);

  useEffect(() => {
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      const timeDiff = (currentTime - timestamp) / (1000 * 60); // Calculate time difference in minutes

      // Check if the cached data is less than 5 minutes old
      if (timeDiff <= 5) {
        setLat(data.lat);
        setLon(data.lon);
        setLocationName(data.locationName);
        setGeolocationFetched(true);
        console.log("using cached data")
        return;
      }
    }

    // If cache is expired or doesn't exist, fetch geolocation
    fetchGeolocation();
  }, []);

  const handleManualSubmit = async (event) => {
    event.preventDefault();
    const manualLocation = event.target.location.value;
    console.log(manualLocation);
    const geocodeApiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      manualLocation
    )}&key=${geocodeApiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocationName(formattedAddress);
        setShowManualForm(false);
        setLat(data.results[0].geometry.location.lat);
        setLon(data.results[0].geometry.location.lng);
        setGeolocationFetched(true);

        // Cache the API response
        const currentTime = new Date().getTime();
        const cachedData = {
          lat: data.results[0].geometry.location.lat,
          lon: data.results[0].geometry.location.lng,
          locationName: formattedAddress,
        };
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: currentTime, data: cachedData }));
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <>
      {geolocationFetched ? (
        <Weather lat={lat} lon={lon} locationName={locationName} handleManualSubmit={handleManualSubmit} />
      ) : showManualForm ? (
         <div className="first-search-bar">
          <h2>Sorry! Unable to get location</h2>
          <h3>Please search</h3>
          <div className='LocationSearch'>
            <form onSubmit={handleManualSubmit} id="location-form" className="first-location-form">
              <input className="first-search-toggle" type="text" placeholder="Type your city name" name="location" id="first-location" required />
              <button className="searchButton" type="submit">
                <img className="searchButtonImage" src={searchIcon} />
              </button>
            </form>
          </div>
          </div>
      ) : (
        <div>Loading geolocation...</div>
      )}
    </>
  );
}

export default App;
