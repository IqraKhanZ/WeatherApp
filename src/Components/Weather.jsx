import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = ({ setTheme, setIsNight }) => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
const API_KEY = "5b45adb388ff46a7c12fda51292cb5fa";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

       const iconCode = data.weather[0].icon;
    const isNightIcon = iconCode.includes("n");
    const icon = allIcons[iconCode] || clear_icon;

    // 🌈 Determine theme
    let newTheme = "default";
    const temp = data.main.temp;
    const condition = data.weather[0].main.toLowerCase();

    if (condition.includes("rain")) newTheme = "rain";
    else if (condition.includes("snow")) newTheme = "snow";
    else if (temp < 15) newTheme = "cold";
    else if (temp > 30) newTheme = "hot";

    setIsNight(isNightIcon);
    setTheme(newTheme);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">

      <div className="searchbar">
  <input
    ref={inputRef}
    type="text"
    placeholder="Search city"
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        search(inputRef.current.value);
      }
    }}
  />
  <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
</div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
