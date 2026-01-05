import { useNavigate } from 'react-router-dom';
import styles from './KioskEventCard.module.css';

export default function KioskEventCard({ event }) {
  const navigate = useNavigate();
  const { eventId, mainImage, title, location } = event;

  const handleClick = () => {
    if (!eventId) return;
    navigate(`/kiosk/events/${eventId}`);
  };

  return (
    <div className={styles.card} onClick={handleClick} role='button' tabIndex={0}>
      <img src={mainImage} alt={title} className={styles.img} />
      <p className={styles.title}>{title}</p>
      <p className={styles.place}>{location}</p>
    </div>
  );
}
