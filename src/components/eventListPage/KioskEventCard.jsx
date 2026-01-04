import styles from './KioskEventCard.module.css';

export default function KioskEventCard({ event }) {
  const { mainImage, title, location } = event;

  return (
    <div className={styles.card}>
      <img src={mainImage} alt={title} className={styles.img} loading='lazy' decoding='async' />
      <p className={styles.title}>{title}</p>
      <p className={styles.place}>{location}</p>
    </div>
  );
}
