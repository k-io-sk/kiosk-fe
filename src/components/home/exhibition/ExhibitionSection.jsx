import { useNavigate } from 'react-router-dom';
import styles from './ExhibitionSection.module.css';
import SectionWrapper from '../../global/sectionWrapper/SectionWrapper';
import exhibitionImg from '@assets/images/exhibition.png';

export default function ExhibitionSection({ items = [] }) {
  const navigate = useNavigate();
  const list = items.slice(0, 3);
  const showFallback = list.length === 0;

  const handleCardClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <SectionWrapper>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${exhibitionImg})` }}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.vline} />
            <div className={styles.texts}>
              <h2 className={styles.title}>전시</h2>
              <p className={styles.desc}>
                전통과 예술이 어우러지는 공간,
                <br />
                인사동에서 열리는 전시를 만나보세요
              </p>
              <button className={styles.linkBtn} type='button' onClick={() => navigate('/events')}>
                보러가기 →
              </button>
            </div>
          </div>

          {!showFallback && (
            <div className={styles.gallery}>
              {list.map((event) => (
                <div key={event.eventId} className={styles.card} onClick={() => handleCardClick(event.eventId)}>
                  <img src={event.mainImage} alt={`${event.eventCategory} ${event.eventId}`} loading='lazy' />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
