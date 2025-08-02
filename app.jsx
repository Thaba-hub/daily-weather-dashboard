import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const API_KEY = 'your_openweather_api_key'; // Replace with your API key

const App = () => {
  const [city, setCity] = useState(localStorage.getItem('city') || '');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    const res = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${cityName}&appid=\${API_KEY}&units=metric\`);
    const data = await res.json();
    setWeather(data);
    localStorage.setItem('city', cityName);
  };

  return (
    <div className="container">
      <h1>Daily Weather Dashboard</h1>
      <input
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchWeather(e.target.value)}
      />
      {weather && weather.main && (
        <div>
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>☁ Description: {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
