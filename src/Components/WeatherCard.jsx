import React from "react";
import { useEffect, useState } from "react";
import getWeather from "../js/data";
import './WeatherCard.css'

function WeatherCard({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  // getting the weather data
  useEffect(() => {
    async function fetchData() {
      const result = await getWeather(city);
      setWeatherData(result);
    }

    fetchData();
  }, [city]);

  return (
    <div className="weather-card">
      {weatherData ? (
        <>
          <div>
            <span className="label">Feels like</span>{" "}
            <span className="value">
              {(weatherData.feels_like - 273.15).toFixed(1)}°C
            </span>
          </div>
          <div>
            <span className="label">Temperature</span>{" "}
            <span className="value">
              {(weatherData.temp - 273.15).toFixed(1)}°C
            </span>
          </div>
          <div>
            <span className="label">Humidity</span>{" "}
            <span className="value">{weatherData.humidity}%</span>
          </div>
          <div>
            <span className="label">Pressure</span>{" "}
            <span className="value">{weatherData.pressure}hPa</span>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

// How the data looks

// feels_like: 313.32;
// grnd_level: 1000;
// humidity: 47;
// pressure: 1001;
// sea_level: 1001;
// temp: 308.43;
// temp_max: 308.43;
// temp_min: 308.43;

export default WeatherCard;
