import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { City } from "../types/types";

const CITY_URL = import.meta.env.VITE_GEOCODING_API_URL;
export const cities = createAsyncThunk(
  "city/fetchCities",
  async (cityName: string) => {
    const response = await fetch(
      `${CITY_URL}?name=${cityName}`
    );
    const data = await response.json();
    return data.results || [];
  }
);

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
