import type { DailyWeatherData } from "../types/types";

function DailyWeather({
  time,
  temperature_max,
  temperature_min,
  sunrise,
  sunset,
}: DailyWeatherData) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Weather for 7 Days</h2>
      <div>
        {time.map((date, index) => (
          <div key={date} className="border px-4 py-1">
            <p>
              <strong>{new Date(date).toDateString()}</strong>
            </p>
            <p>Minimum Temperature: {temperature_min[index]}</p>
            <p>Maximum Temperature: {temperature_max[index]}</p>
            <p>Sunrise: {sunrise[index]}</p>
            <p>Sunset: {sunset[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyWeather;
