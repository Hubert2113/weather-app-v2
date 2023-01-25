import styles from './Weather.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeDay, showMoreInfo } from '../../redux/slices';
import { Cloudy, Rainy, Sunny, Snowy } from '../../icons';

const Weather = () => {
  const dispatch = useDispatch();
  const utility = useSelector((state) => state.utility);
  const weatherData = useSelector((state) => state.weatherData.data.list);
  const locationData = useSelector((state) => state.locationData.data);

  const getWeatherIcon = (data) => {
    switch (data.weather[0].main) {
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

  const getMinTemperature = (currentDay) => {
    const todayArray = [...weatherData]
      .splice(currentDay * 7, 7)
      .map((singleObject) => singleObject.main.temp_min);
    return Math.round(Math.min(...todayArray));
  };

  const getMaxTemperature = (currentDay) => {
    const todayArray = [...weatherData]
      .splice(currentDay * 7, 7)
      .map((singleObject) => singleObject.main.temp_max);
    return Math.round(Math.max(...todayArray));
  };

  const get5days = () => {
    const newArray = [];
    weatherData.forEach((item, index) => {
      if (index % 8 === 0) {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const getDayData = (currentDay) => {
    const dayData = [...weatherData].splice(currentDay * 8, 8);
    return dayData;
  };

  return (
    <section className='section'>
      <div className={styles.weather}>
        <div
          className={
            utility.days === 'today'
              ? styles.weatherItems
              : styles.weatherItems5days
          }
        >
          <div
            className={
              utility.days === 'today'
                ? styles.weatherBox
                : utility.showMoreInfo !== null
                ? styles.weatherBox5daysMoreInfo
                : styles.weatherBox5days
            }
          >
            {locationData && weatherData && utility.days === 'today' && (
              <>
                {getWeatherIcon(weatherData[0])}
                <p className={styles.weatherHeader}>
                  {locationData.name}, {locationData.country}
                </p>
                <p className={styles.weatherTemp}>
                  {Math.round(weatherData[0].main.temp)}&#176;
                </p>
                <div className={styles.weatherTemperatures}>
                  <div className={styles.weatherMinTemp}>
                    <p className={styles.weatherTempLabel}>Min</p>
                    <p className={styles.weatherTempValue}>
                      {getMinTemperature(0)}&#176;
                    </p>
                  </div>
                  <div className={styles.weatherLine} />
                  <div className={styles.weatherMaxTemp}>
                    <p className={styles.weatherTempLabel}>Max</p>
                    <p className={styles.weatherTempValue}>
                      {getMaxTemperature(0)}&#176;
                    </p>
                  </div>
                </div>
                {utility.showMoreData && (
                  <div style={{ height: '300px' }}></div>
                )}
              </>
            )}
            {locationData && weatherData && utility.days === '5days' && (
              <>
                <p className={styles.weatherHeader}>
                  {locationData.name}, {locationData.country}
                </p>
                <div className={styles.weather5daysData}>
                  {get5days().map((item, index) => {
                    const date = new Date(item.dt * 1000);
                    return (
                      <div
                        className={styles.weather5daysDataItem}
                        key={index}
                      >
                        <p className={styles.weatherWeekday}>
                          {date.toLocaleDateString('en', {
                            weekday: 'long',
                          })}
                        </p>
                        <p className={styles.weatherDate}>
                          {date.getDate()}{' '}
                          {date.toLocaleString('en', { month: 'long' })}
                        </p>
                        {getWeatherIcon(item)}
                        <div className={styles.weatherTemperatures}>
                          <div className={styles.weatherMinTemp}>
                            <p className={styles.weatherTempLabel}>Min</p>
                            <p className={styles.weatherTempValue}>
                              {getMinTemperature(index)}&#176;
                            </p>
                          </div>
                          <div className={styles.weatherLine} />
                          <div className={styles.weatherMaxTemp}>
                            <p className={styles.weatherTempLabel}>Max</p>
                            <p className={styles.weatherTempValue}>
                              {getMaxTemperature(index)}&#176;
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(showMoreInfo(index))}
                          className={styles.weatherMoreInfoButton}
                        >
                          More info
                        </button>
                      </div>
                    );
                  })}
                </div>
                {utility.showMoreInfo !== null && (
                  <div className={styles.weatherMoreInfo}>
                    {getDayData(utility.showMoreInfo).map((data, index) => {
                      const date = new Date(data.dt * 1000);
                      return (
                        <div
                          className={styles.weatherMoreInfoBox}
                          key={index}
                        >
                          <p className={styles.weatherMoreInfoTime}>
                            {date.getHours() - 1}:00
                          </p>
                          {getWeatherIcon(data)}
                          <p className={styles.weatherMoreInfoTemp}>
                            {Math.round(data.main.temp)}&#176;
                          </p>
                          <div className={styles.weatherDetails}>
                            <div className={styles.weatherDetail}>
                              <div className={styles.weatherHumidity}></div>
                              <p className={styles.weatherDetailValue}>
                                {data.main.humidity}%
                              </p>
                            </div>
                            <div className={styles.weatherDetail}>
                              <div className={styles.weatherPressure}></div>
                              <p className={styles.weatherDetailValue}>
                                {data.main.pressure} hPa
                              </p>
                            </div>
                            <div className={styles.weatherDetail}>
                              <div className={styles.weatherWind}></div>
                              <p className={styles.weatherDetailValue}>
                                {data.wind.speed} m/s
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.weatherButtons}>
            <button
              onClick={() => dispatch(changeDay('today'))}
              className={
                utility.days === 'today'
                  ? styles.weatherButtonActive
                  : styles.weatherButton
              }
            >
              TODAY
            </button>
            <button
              onClick={() => dispatch(changeDay('5days'))}
              className={
                utility.days === '5days'
                  ? styles.weatherButtonActive
                  : styles.weatherButton
              }
            >
              5 DAYS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
