import styles from './TodayWeather.module.scss';
import { Cloudy, Rainy, Sunny, Snowy } from '../../icons';
import { useSelector } from 'react-redux';

const TodayWeather = () => {
  const weatherData = useSelector((state) => state.weatherData.data);
  const locationData = useSelector((state) => state.locationData.data);

  const getWeatherIcon = () => {
    switch (weatherData[0].weather[0].main) {
      case 'Clouds':
        return <Cloudy />;
      case 'Rain':
        return <Rainy />;
      case 'Snow':
        return <Snowy />;
      case 'Clear':
        return <Sunny />;
      default:
        return 'icon not found';
    }
  };

  const getMinTemperature = () => {
    const todayArray = [...weatherData]
      .splice(8, Infinity)
      .map((singleObject) => singleObject.main.temp_min);
    return Math.round(Math.min(...todayArray));
  };

  const getMaxTemperature = () => {
    const todayArray = [...weatherData]
      .splice(8, Infinity)
      .map((singleObject) => singleObject.main.temp_max);
    return Math.round(Math.max(...todayArray));
  };

  return (
    <>
      <div className={styles.weatherBox}>
        {weatherData[0] && getWeatherIcon()}
        {locationData && weatherData[0] && (
          <>
            <p className={styles.weatherCityName}>
              {locationData.name}, {locationData.country}
            </p>
            <p className={styles.weatherTemp}>
              {Math.round(weatherData[0].main.temp)}&#176;
            </p>
            <div className={styles.weatherTemperatures}>
              <div className={styles.weatherMinTemp}>
                <p className={styles.weatherTempLabel}>Min</p>
                <p className={styles.weatherTempValue}>
                  {getMinTemperature()}&#176;
                </p>
              </div>
              <div className={styles.weatherLine} />
              <div className={styles.weatherMaxTemp}>
                <p className={styles.weatherTempLabel}>Max</p>
                <p className={styles.weatherTempValue}>
                  {getMaxTemperature()}&#176;
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      
    </>
  );
};

export default TodayWeather;
