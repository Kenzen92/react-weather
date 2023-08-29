import { useState, useEffect } from 'react';
import Weather from './components/weather/weather';
import './App.css';

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  // Geolocation API only being called after the manual form is submitted. Need to trigger the 
  // API on page load automatically, then fall back to the manual form only if it fails

// I've reset the position of the request. Page should now automatically call API, and only if it fails should the code
// continue to attempt to show manual form.

// To test need to 1. try with location enabled, 2. try with location disabled

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        const geocodeApiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${geocodeApiKey}`;
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        console.log(data);

        if (data.results.length > 0) {
          const formattedAddress = data.results[0].formatted_address;
          setLocationName(formattedAddress);
          console.log(locationName);
          setShowManualForm(false);
          setLat(data.results[0].geometry.location.lat);
          setLon(data.results[0].geometry.location.lng);
          setGeolocationFetched(true);
        }
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setShowManualForm(true);
      }
    };

    fetchGeolocation();
  }, []);

  const handleManualSubmit = async (event) => {
    event.preventDefault();
    const manualLocation = event.target.location.value;
    const geocodeApiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(manualLocation)}&key=${geocodeApiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      console.log(data);

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocationName(formattedAddress);
        console.log(locationName);
        setShowManualForm(false);
        setLat(data.results[0].geometry.location.lat);
        setLon(data.results[0].geometry.location.lng);
        setGeolocationFetched(true);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <>
      {geolocationFetched ? (
        <Weather
          lat={lat}
          lon={lon}
          locationName={locationName}
        />
      ) : showManualForm ? (
        <form onSubmit={handleManualSubmit}>
          <label htmlFor="location">Type your city name</label>
          <input type="text" name="location" id="location" required />
          <button type="submit">Fetch Weather</button>
        </form>
      ) : (
        <div>Loading geolocation...</div>
      )}
    </>
  );
}

export default App;
