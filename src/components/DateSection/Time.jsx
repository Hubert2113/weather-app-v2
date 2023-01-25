import styles from './DateSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateTime } from '../../redux/slices';
import { Sunset, Sunrise } from '../../icons';

const Time = () => {
  const dispatch = useDispatch();
  const unixTime = useSelector((state) => state.utility.date);
  const cityData = useSelector((state) => state.weatherData.data.city);
  //   setInterval(() => {
  //     dispatch(updateTime(Date.now()));
  //   }, 1000);

  const date = new Date(unixTime);
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en', { weekday: 'short' });
  const month = date.toLocaleDateString('en', { month: 'long' });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const getSunTiming = (date) => {
    const hoursLessThan10 = date.getHours() < 10;
    const minutesLessThan10 = date.getMinutes() < 10;
    let result = '';
    if (hoursLessThan10) {
      result = '0';
    }
    result = result + date.getHours() + ':';
    if (minutesLessThan10) {
      result = result + '0';
    }
    result = result + date.getMinutes();
    return result;
  };

  return (
    <div className={styles.dateBox}>
      <h3 className={styles.dateBoxHeader}>
        {day}
        <sup>th</sup> {weekday}
      </h3>
      <div className={styles.dateBoxDetails}>
        <p style={{borderRight: 'solid 1px #9d9d9d71'}} className={styles.dateBoxDetail}>{month}</p>
        <p className={styles.dateBoxDetail}>
          {/* {hours < 10 && 0}
          {hours}:{minutes < 10 && 0}
          {minutes}:{seconds < 10 && 0}
        {seconds} */}
          10:10:10
        </p>
        <div style={{borderRight: 'solid 1px #9d9d9d71'}} className={styles.dateBoxDetailBox}>
          <Sunrise />
          <p className={styles.dateBoxDetail}>
            {getSunTiming(new Date(cityData?.sunrise * 1000))}
          </p>
        </div>
        <div className={styles.dateBoxDetailBox}>
          <Sunset />
          <p className={styles.dateBoxDetail}>
            {getSunTiming(new Date(cityData?.sunset * 1000))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Time;
