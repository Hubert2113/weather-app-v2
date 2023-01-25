import { weatherApi } from '../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLocationInfo = createAsyncThunk(
  'location/fetchLocationInfo',
  async (cityName, thunkAPI) => {
    try {
      const response = await weatherApi.get(
        `geo/1.0/direct?q=${cityName}&limit=1&appid=86882c431a5c1fa03f48939e3b313043`
      );
      return response.data[0];
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ lat, lon }, thunkAPI) => {
    try {
      const response = await weatherApi.get(
        `data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=86882c431a5c1fa03f48939e3b313043`
      );
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);
