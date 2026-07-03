const API_KEY = import.meta.env.VITE_API_KEY;


async function getWeather(city) {
  // getting the coordinate for the city
  let cordResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
  );

  let cordData = await cordResponse.json();

  if (!cordData.length) {
    console.error("City not found");
  } else {
    let coordination = {
      lat: cordData[0].lat,
      lon: cordData[0].lon,
    };

    // getting the actual weather data
    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordination.lat}&lon=${coordination.lon}&appid=${API_KEY}
    `);

    const data = await response.json();
    console.log(data.main);

    return data.main;
  }
}

export default getWeather;
