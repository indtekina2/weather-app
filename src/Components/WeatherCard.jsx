import React from "react";
import { useEffect, useState } from "react";
import getWeather from "../js/data";
import './WeatherCard.css'

function WeatherCard({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getWeather(city);
        if (result.error) {
          setError(result.msg);
          setWeatherData(null);
        } else {
          setWeatherData(result);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch weather data");
        setWeatherData(null);
      }
    }

    fetchData();
  }, [city]);

  // Loading state
  if (weatherData === null && !error) {
    return <div className="weather-card">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="weather-card error">{error}</div>;
  }

  // Success state - render data
  return (
    <div className="weather-card">
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
