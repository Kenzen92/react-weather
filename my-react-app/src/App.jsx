import { useState, useEffect } from 'react';
import Weather from './components/weather/weather';
import './App.css';

function App() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setGeolocationFetched(true);
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

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setLocationName(formattedAddress);
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
