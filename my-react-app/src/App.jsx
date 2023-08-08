import { useState } from 'react'
import Weather from './components/weather/weather'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to my weather app blud</h1>
      <Weather 
      cityName="Rio de janeiro"
      // temperature={25}
      // weatherDescription="Sunny"
      />
    </>
  )
}

export default App
