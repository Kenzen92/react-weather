import { useState, useEffect } from 'react'
import Weather from './components/weather/weather'
import './App.css'

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [geolocationFetched, setGeolocationFetched] = useState(false); // Add this state

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setGeolocationFetched(true); // Mark geolocation as fetched
    });
  }, []);

  return (
    <>
      {geolocationFetched ? (
        <Weather 
          lat={lat}
          lon={lon}
        />
      ) : (
        <div>Loading geolocation...</div>
      )}
    </>
  )
}

export default App
