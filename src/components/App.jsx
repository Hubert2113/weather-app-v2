import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWeatherData, fetchLocationInfo } from '../redux/operations';
import WeatherInput from './WeatherInput/WeatherInput';
import Weather from './Weather/Weather';
import DateSection from './DateSection/DateSection'

function App() {
  const dispatch = useDispatch();
  const utility = useSelector(state => state.utility);

  useEffect(() => {
    Promise.resolve(dispatch(fetchLocationInfo('Warsaw'))).then((data) =>
      dispatch(fetchWeatherData(data.payload))
    );
  });

  return (
    <div className='container'>
      <WeatherInput />
      <Weather />
      {utility.days === 'today' &&
      <DateSection/>}
    </div>
  );
}

export default App;
