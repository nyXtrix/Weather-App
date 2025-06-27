import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './City';
import weatherReducer from './Weather'
export const store = configureStore({
  reducer: {
    city:cityReducer,
    weather:weatherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
