const API_KEY = import.meta.env.VITE_API_KEY;


async function getWeather(city) {
  try {
    // Getting coordinates
    let cordResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
    );
    let cordData = await cordResponse.json();

    if (!cordData.length) {
      return {
        error: true,
        msg: "City not found",
      };
    }

    // Getting weather data
    const { lat, lon } = cordData[0];
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    const data = await response.json();

    return data.main; 
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      error: true,
      msg: "Failed to fetch weather data",
    };
  }
}

export default getWeather;
