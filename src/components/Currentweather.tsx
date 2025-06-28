import type { CurrenWeatherData } from "../types/types";

function Currentweather({
  temperature,
  windspeed,
  winddirection,
  humidity,
}: CurrenWeatherData) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Current Weather:</h2>
      <div>
        <p>
          Temperature: <strong>{temperature} Celcius</strong>
        </p>
        <p>
          Windspeed: <strong>{windspeed} km/h</strong>
        </p>
        <p>
          Winddirection: <strong>{winddirection}</strong>
        </p>
        <p>
          Humidity: <strong>{humidity} %</strong>
        </p>
      </div>
    </div>
  );
}

export default Currentweather;
