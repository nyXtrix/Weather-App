import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type City = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

export const cities = createAsyncThunk("city/fetchCities", async (cityName: string) => {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
  const data = await response.json();
  return data.results || [];
});

const CitySlice = createSlice({
  name: "city",
  initialState: {
    searchResults: [] as City[],
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cities.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export default CitySlice.reducer;
