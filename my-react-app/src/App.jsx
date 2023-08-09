import { useState, useEffect } from 'react'
import Weather from './components/weather/weather'
import './App.css'

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude); // Correct usage of useState setter
      setLon(position.coords.longitude); // Correct usage of useState setter
    });
  }, []); // Empty dependency array means this effect runs only once on mount


  return (
    <>
      <Weather 
      lat={lat}
      lon={lon}
      />
    </>
  )
}

export default App
