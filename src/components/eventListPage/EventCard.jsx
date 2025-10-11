import styles from './EventCard.module.css';

export default function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <img src={event.thumbnail} alt={event.title} />
      <p className={styles.title}>{event.title}</p>
      <p className={styles.date}>
        {event.startDate} ~ {event.endDate}
      </p>
      <p className={styles.place}>{event.place}</p>
    </div>
  );
}
