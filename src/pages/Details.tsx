import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { weather } from "../redux/Weather";
import type { City } from "../types/types";
import type { RootState, AppDispatch } from "../redux/store";
import MapView from "../components/Map";
import CurrentWeather from "../components/Currentweather";
import DailyWeather from "../components/DailyWeather";
import HourlyWeather from "../components/HourlyWeather";
function Details() {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const city = location.state as City;
  const weatherData = useSelector((state: RootState) => state.weather.details);

  useEffect(() => {
    if (city) {
      dispatch(weather({ latitude: city.latitude, longitude: city.longitude }));
    }
  }, [city, dispatch]);

  return weatherData ? (
    <div>
      <h1 className="text-2xl m-5">
        Weather of <strong>{city.name}</strong>, Country:{" "}
        <strong>{city.country}</strong> , | Logitude:{" "}
        <strong>{city.longitude}</strong>, Latitude:{" "}
        <strong>{city.latitude}</strong>
      </h1>

      <div>
        <CurrentWeather
          temperature={weatherData.current_weather.temperature}
          windspeed={weatherData.current_weather.windspeed}
          winddirection={weatherData.current_weather.winddirection}
          humidity={weatherData.current_weather.humidity}
        />
      </div>

      <div>
        <DailyWeather
          time={weatherData.daily.time}
          temperature_max={weatherData.daily.temperature_max}
          temperature_min={weatherData.daily.temperature_min}
          sunrise={weatherData.daily.sunrise}
          sunset={weatherData.daily.sunset}
        />
      </div>

      <div>
        <div>
          <HourlyWeather
            time={weatherData.hourly.time}
            temperature={weatherData.hourly.temperature}
            relative_humidity={weatherData.hourly.relative_humidity}
            winddirection={weatherData.hourly.winddirection}
          />
        </div>
      </div>
      <div>
        <MapView
          latitude={city.latitude}
          longitude={city.longitude}
          cityName={city.name}
        />
      </div>
    </div>
  ) : (
    <div>
      <p>Data not found.</p>
    </div>
  );
}

export default Details;
