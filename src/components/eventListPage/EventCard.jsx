import styles from './EventCard.module.css';

export default function EventCard({ event }) {
  const { mainImage, title, startDate, endDate, location } = event;

  return (
    <div className={styles.card}>
      <img src={mainImage} alt={title} className={styles.img} loading='lazy' decoding='async' />
      <p className={styles.title}>{title}</p>
      <p className={styles.date}>
        {startDate} ~ {endDate}
      </p>
      <p className={styles.place}>{location}</p>
    </div>
  );
}
