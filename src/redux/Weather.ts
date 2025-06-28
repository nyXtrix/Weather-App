import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { WeatherData } from "../types/types";

type WeatherState = {
  details: WeatherData | null;
  error: string | null;
};

const initialState: WeatherState = {
  details: null,
  error: null,
};

const DETAILS_URL = import.meta.env.VITE_OPEN_METEO_API_URL;

export const weather = createAsyncThunk<
  WeatherData,
  { latitude: number; longitude: number }
>("weather/fetchWeather", async ({ latitude, longitude }) => {
  const response = await fetch(
    `${DETAILS_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,windspeed_10m,winddirection_10m&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,relative_humidity_2m_mean,winddirection_10m_dominant&timezone=auto`
  );

  const data = await response.json();

  return {
    current_weather: {
      temperature: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
      winddirection: data.current_weather.winddirection,
      humidity: data.hourly.relative_humidity_2m?.[0] ?? 0,
      weathercode: data.current_weather.weathercode,
      time: data.current_weather.time,
    },
    daily: {
      time: data.daily.time,
      temperature_max: data.daily.temperature_2m_max,
      temperature_min: data.daily.temperature_2m_min,
      weathercode: data.daily.weathercode,
      sunrise: data.daily.sunrise,
      sunset: data.daily.sunset,
      humidity: data.daily.relative_humidity_2m_mean,
      winddirection: data.daily.winddirection_10m_dominant,
    },
    hourly: {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      precipitation_probability: data.hourly.precipitation_probability,
      relative_humidity: data.hourly.relative_humidity_2m,
      winddirection: data.hourly.winddirection_10m,
    },
  };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather(state) {
      state.details = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(weather.fulfilled, (state, action) => {
      state.details = action.payload;
      state.error = null;
    });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
