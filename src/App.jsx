import { useEffect, useState } from "react";
import WeatherCard from "./Components/WeatherCard";

function App() {
  const [city, setCity] = useState(null);
  const [render, setRender] = useState(false);

  function showWeather(e){
    e.preventDefault(); // Stop page refresh
    setRender(true);
  }

  return (
    <>
      <h1>Weather App</h1>

      <form onSubmit={showWeather}>
        <input
          type="text"
          placeholder="Enter Your city"
          value={city}
          onChange={(e) => {
            setRender(false);
            setCity(e.target.value);
          }}
        />

        <button type="submit">{"Search"}</button>
      </form>

      {render && <WeatherCard city={city}/>}
    </>
  );
}

export default App;
