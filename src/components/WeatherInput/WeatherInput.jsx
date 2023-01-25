import { SubmitIcon } from '../../icons';
// import { Star, StarFill } from '@styled-icons/bootstrap';
import styles from './WeatherInput.module.scss';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { fetchLocationInfo, fetchWeatherData } from '../../redux/operations';



// const StarIcon = styled(Star)`
//   color: grey;
//   width: 20px;
//   height: 20px;
//   opacity: 0.7;
// `;

// const StarFillIcon = styled(StarFill)`
//   color: grey;
//   width: 20px;
//   height: 20px;
//   opacity: 0.7;
// `;

const WeatherInput = () => {
  const dispatch = useDispatch();
  const cityInput = useRef();

  const submitCity = (ev) => {
    ev.preventDefault();
    Promise.resolve(dispatch(fetchLocationInfo(cityInput.current.value))).then(
      (data) => dispatch(fetchWeatherData(data.payload))
    );
  };

  return (
    <section className='section'>
      <header className={styles.header}>
        <form>
          <label className={styles.headerLabel}>
            <button
              type='submit'
              onClick={submitCity}
              className={styles.headerSubmitBtn}
            >
              <SubmitIcon />
            </button>
            <input
              ref={cityInput}
              className={styles.headerInput}
              placeholder='Enter the city'
              type='text'
            />
          </label>
        </form>
      </header>
    </section>
  );
};

export default WeatherInput;
