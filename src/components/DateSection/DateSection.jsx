import styles from './DateSection.module.scss';
import Time from './Time';

const DateSection = () => {
  return (
    <section className='section'>
      <div className={styles.DateSectionContainer}>
        <Time />
      </div>
    </section>
  );
};

export default DateSection;
