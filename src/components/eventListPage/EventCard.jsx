import styles from './EventCard.module.css';

export default function EventCard({ event }) {
  const { thumbnail, title, startDate, endDate, place } = event;

  return (
    <div className={styles.card}>
      <img src={thumbnail || ''} alt={title} className={styles.img} />
      <p className={styles.title}>{title}</p>
      <p className={styles.date}>
        {startDate} ~ {endDate}
      </p>
      <p className={styles.place}>{place}</p>
    </div>
  );
}
