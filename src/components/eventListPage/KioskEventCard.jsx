import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './KioskEventCard.module.css';

export default function KioskEventCard({ event }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { eventId, mainImage, title, location } = event;

  const handleClick = () => {
    if (!eventId) return;
    const region = searchParams.get('region') || 'jongno';
    navigate(`/kiosk/events/${eventId}?region=${region}`);
  };

  return (
    <div className={styles.card} onClick={handleClick} role='button' tabIndex={0}>
      <div className={styles.thumb}>
        <img src={mainImage} alt={title} className={styles.img} />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.place}>{location}</p>
    </div>
  );
}
