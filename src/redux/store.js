import { configureStore } from '@reduxjs/toolkit';
import { geolocationReducer, weatherReducer, utilityReducer } from './slices';

const store = configureStore({
  reducer: {
    locationData: geolocationReducer,
    weatherData: weatherReducer,
    utility: utilityReducer,
  },
});

export default store;
