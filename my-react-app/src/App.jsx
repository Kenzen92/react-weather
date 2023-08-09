import { useState, useEffect } from 'react'
import Weather from './components/weather/weather'
import './App.css'

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is:", position.coords.latitude);
      setLat(position.coords.latitude); // Correct usage of useState setter
      console.log("Longitude is:", position.coords.longitude);
      setLon(position.coords.longitude); // Correct usage of useState setter
    });
  }, []); // Empty dependency array means this effect runs only once on mount


  return (
    <>
      <h1>Welcome to my weather app blud</h1>
      <Weather 
      lat={lat}
      lon={lon}
      // temperature={25}
      // weatherDescription="Sunny"
      />
    </>
  )
}

export default App
