import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { weather } from "../redux/Weather"
import type { City } from "../redux/City";
import type { RootState,AppDispatch } from "../redux/store";
import MapView from "../components/Map";

function Details() {
    const dispatch:AppDispatch = useDispatch()
    const location = useLocation()
    const city = location.state as City
    const weatherData = useSelector((state:RootState)=>state.weather.details)

    useEffect(()=>{
        if(city){
            dispatch(weather({latitude:city.latitude, longitude:city.longitude}))
        }
    },[city,dispatch])

if(weatherData){
    return (
    <div>
       <h1 className="text-2xl m-5">Weather of <strong>{city.name}</strong>, Country: <strong>{city.country}</strong> , | Logitude: <strong>{city.longitude}</strong>, Latitude: <strong>{city.latitude}</strong></h1>

       <div >
        <h2 className="text-lg font-semibold mb-2">Current Weather:</h2>
        <div className="border rounded-md p-4 shadow-md bg-gray-50 mb-6">
        <p>Temperature: {weatherData.current_weather.temperature} Celcius</p>
        <p>Windspeed: {weatherData.current_weather.windspeed} Km/h</p>
        <p>Wind Direction: {weatherData.current_weather.winddirection}</p>
        <p>Humidity: {
          weatherData.hourly.relative_humidity[0]
        }%</p>
        </div>
      </div>

       <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Weather for Next 7 Days:</h2>
        <div>
          {weatherData.daily.time.map((date, index) => (
            <div key={date} className="p-4 border rounded shadow-sm bg-white mb-5">
              <p><strong>{new Date(date).toDateString()}</strong></p>
              <p>Maximum Temperature: {weatherData.daily.temperature_max[index]} Celcius</p>
              <p>Minimum Temperature {weatherData.daily.temperature_min[index]} Celcius</p>
              <p>Sunrise: {new Date(weatherData.daily.sunrise[index]).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(weatherData.daily.sunset[index]).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Weather Next 24 Hours:</h2>
        <div className="my-5">
          <table className="table-auto w-full border text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1">Time</th>
                <th className="px-2 py-1">Temperature (Celcius)</th>
                <th className="px-2 py-1">Humidity (%)</th>
                <th className="px-2 py-1">Wind Direction</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.hourly.time.slice(0, 24).map((time, index) => (
                <tr key={time} className="border-t">
                  <td className="px-2 py-1">{new Date(time).toLocaleTimeString()}</td>
                  <td className="px-2 py-1">{weatherData.hourly.temperature[index]}</td>
                  <td className="px-2 py-1">{weatherData.hourly.relative_humidity[index]}</td>
                  <td className="px-2 py-1">{weatherData.hourly.winddirection[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
  )
}
else{
    return(
    <div>
        <p>Data not found.</p>
    </div>
    )
}

}

export default Details
