export type City = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type WeatherData = {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    humidity: number;
    weathercode: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_max: number[];
    temperature_min: number[];
    weathercode: number[];
    sunrise: string[];
    sunset: string[];
    humidity: number[];
    winddirection: number[];
  };
  hourly: {
    time: string[];
    temperature: number[];
    precipitation_probability: number[];
    relative_humidity: number[];
    winddirection: number[];
  };
};

export type CurrenWeatherData = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  humidity: number;
};

export type DailyWeatherData = {
  time: string[];
  temperature_max: number[];
  temperature_min: number[];
  sunrise: string[];
  sunset: string[];
};

export type HourlyWeatherData = {
  time: string[];
  temperature: number[];
  relative_humidity: number[];
  winddirection: number[];
};

export type CitySearch = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export type ListOfCities = {
  cities: City[];
};
