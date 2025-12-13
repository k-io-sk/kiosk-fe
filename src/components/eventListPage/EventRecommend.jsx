import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './EventRecommend.module.css';

export default function EventRecommend({ title = '오늘은 이런 행사 어때요? 👀', events = [] }) {
  const navigate = useNavigate();

  if (!Array.isArray(events) || events.length === 0) return null;

  const formatDate = (start, end) => {
    if (!start) return '';
    if (!end || start === end) return start;
    return `${start} ~ ${end}`;
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>

      <div className={styles.list}>
        {events.map((event, idx) => (
          <button
            key={event.eventId ?? idx}
            type='button'
            className={styles.card}
            onClick={() => navigate(`/events/${event.eventId}`)}
          >
            <div className={styles.posterWrap}>
              <img className={styles.poster} src={event.mainImage} alt={event.title} loading='lazy' />
            </div>

            <div className={styles.info}>
              <p className={styles.title} title={event.title}>
                {event.title}
              </p>
              <p className={styles.meta}>{formatDate(event.startDate, event.endDate)}</p>
              <p className={styles.meta}>{event.location}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

EventRecommend.propTypes = {
  title: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.object),
};
