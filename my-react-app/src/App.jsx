import { useState, useEffect } from 'react'
import Weather from './components/weather/weather'
import './App.css'


function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [locationName, setLocationName] = useState("");
  const [geolocationFetched, setGeolocationFetched] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);

      const geocodeApiKey = 'import.meta.env.VITE_GEOLOCATION_API_KEY';
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${geocodeApiKey}`;

      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.results.length > 0) {
          let cityName = "";
          let countryName = "";

          // Loop through the address components of each result
          data.results.forEach(result => {
            const addressComponents = result.address_components;
            addressComponents.forEach(component => {
              if (component.types.includes("locality")) {
                cityName = component.long_name;
              }
              if (component.types.includes("country")) {
                countryName = component.long_name;
              }
            });
          });
          console.log(`City: ${cityName}, Country: ${countryName}`);
          let locality = cityName + ", " + countryName;
          setLocationName(locality);
        }

        setGeolocationFetched(true);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    });
  }, [lat, lon]);

  return (
    <>
      {geolocationFetched ? (
        <Weather 
          lat={lat}
          lon={lon}
          locationName={locationName}
        />
      ) : (
        <div>Loading geolocation...</div>
      )}
    </>
  )
}

export default App
