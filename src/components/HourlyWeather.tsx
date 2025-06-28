import type { HourlyWeatherData } from "../types/types";

function HourlyWeather({time,temperature,relative_humidity,winddirection,}: HourlyWeatherData) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Today's Weather by Hour:</h2>
      <div className="overflow-x-auto">
        <table className="text-center table-auto w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1 border">Time</th>
              <th className="px-2 py-1 border">Temperature (°C)</th>
              <th className="px-2 py-1 border">Humidity (%)</th>
              <th className="px-2 py-1 border">Wind Direction</th>
            </tr>
          </thead>
          <tbody>
            {time.slice(0, 24).map((t, index) => (
              <tr key={t} className="border-t">
                <td className="px-2 py-1 border">
                  {new Date(t).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-2 py-1 border">{temperature[index]}</td>
                <td className="px-2 py-1 border">{relative_humidity[index]}</td>
                <td className="px-2 py-1 border">{winddirection[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HourlyWeather;
