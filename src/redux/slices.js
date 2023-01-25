import { createSlice } from '@reduxjs/toolkit';
import { fetchLocationInfo, fetchWeatherData } from './operations';

const geolocationSlice = createSlice({
  name: 'location',
  initialState: {
    isLoading: false,
    error: null,
    data: null,
  },
  extraReducers: {
    [fetchLocationInfo.pending](state) {
      state.isLoading = true;
    },
    [fetchLocationInfo.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    [fetchLocationInfo.rejected](state, action) {
      state.isLoading = false;
      state.error = action.errorx1;
    },
  },
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    isLoading: false,
    error: null,
    data: {},
  },
  extraReducers: {
    [fetchWeatherData.pending](state) {
      state.isLoading = true;
    },
    [fetchWeatherData.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    },
    [fetchWeatherData.rejected](state, action) {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

const utilitySlice = createSlice({
  name: 'utility',
  initialState: {
    days: 'today',
    showMoreInfo: null,
    date: Date.now(),
  },
  reducers: {
    changeDay(state, action) {
      state.days = action.payload;
    },
    showMoreInfo(state, action){
      state.showMoreInfo = action.payload;
    },
    updateTime(state, action){
      state.date = action.payload;
    }
  },
});

export const geolocationReducer = geolocationSlice.reducer;
export const weatherReducer = weatherSlice.reducer;

export const { changeDay, showMoreInfo, updateTime } = utilitySlice.actions;
export const utilityReducer = utilitySlice.reducer