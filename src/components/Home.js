import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { initialState } from "./Helper";
import { Initial } from "./initial/Initial";

export const Home = () => {
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherData] = useState(initialState);

  const apiKey = "112ec99765221ebd11f07b00e7e423ef";
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      console.log(response.data);
      setWeatherData({
        city: response.data.name,
        country: response.data.sys.country,
        min_temp: response.data.main.temp_min.toFixed(),
        max_temp: response.data.main.temp_max.toFixed(),
        celcius: response.data.main.temp.toFixed(),
        weatherType: response.data.weather[0].description,
        lon: parseFloat(response.data.coord.lon.toFixed(2)),
        lat: parseFloat(response.data.coord.lat.toFixed(2)),
      });
    } catch (e) {
      alert("enter the city name correctly");
    }
  };

  useEffect(() => {
    console.log(weatherdata);
  }, [weatherdata]);

  return (
    <div className="div-container">
      <div className="header-container">
        <h1 className="header">WEATHER APP</h1>
      </div>
      <div className="input-btn">
        <div>
          <input
            className="input-city"
            placeholder="enter the city"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="get-weather-btn" onClick={getWeather}>
            get weather
          </button>
        </div>
      </div>
      <div className="all">
        {weatherdata.city !== "" ? (
          <div className="container">
            <div className="name-city-container">
              <h2 className="city">
                {weatherdata.city}, {weatherdata.country}
              </h2>
            </div>
            <div className="degree-container">
              <h3 className="degree">{weatherdata.celcius}&deg;c</h3>
            </div>
            <div className="minimax-container">
              <p className="max">maximum temp - {weatherdata.max_temp}&deg;c</p>
              <p className="min">minimum temp - {weatherdata.min_temp}&deg;c</p>
            </div>
            <div className="loglat-container">
              <p className="log">longtitude - {weatherdata.lon}</p>
              <p className="lat">latitude - {weatherdata.lat}</p>
            </div>
            <div className="des-container">
              <p className="description">{weatherdata.weatherType}</p>
            </div>
          </div>
        ) : (
          <Initial />
        )}
      </div>
    </div>
  );
};
