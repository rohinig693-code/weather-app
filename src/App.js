import { useEffect, useState } from "react";
import { FaWind, FaTint } from "react-icons/fa";
import "./App.css";

const API_KEY = "ebd7d046b56fb975143bbe5c6724f8d1"; // 👈 Put your API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 🔥 Auto location on load
  
  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== 200) throw new Error(data.message);

      setWeather(data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="app">
      <div className="weather-card">

        <div className="search">
          <input
            type="text"
            placeholder="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => fetchWeather(city)}>Go</button>
        </div>

        {weather && (
          <>
            <div className="city">{weather.name}</div>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="icon"
            />

            <div className="temp">{Math.round(weather.main.temp)}°C</div>

            <div className="desc">
              {weather.weather[0].description}
            </div>

            <div className="details">
              <div className="detail-box">
                <FaTint size={20} />
                <p>Humidity</p>
                <strong>{weather.main.humidity}%</strong>
              </div>

              <div className="detail-box">
                <FaWind size={20} />
                <p>Wind</p>
                <strong>{weather.wind.speed} km/h</strong>
              </div>
            </div>
          </>
        )}

        {error && <p>{error}</p>}

      </div>
    </div>
  );
}

export default App;
