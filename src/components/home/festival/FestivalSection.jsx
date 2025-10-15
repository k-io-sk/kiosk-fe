import { useNavigate } from 'react-router-dom';
import styles from '../exhibition/ExhibitionSection.module.css';
import festivalImg from '@assets/images/festival.png';
import SectionWrapper from '../../global/sectionWrapper/SectionWrapper';

export default function FestivalSection({ items = [] }) {
  const navigate = useNavigate();
  const list = items.slice(0, 3);
  const showFallback = list.length === 0;

  const handleCardClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <SectionWrapper>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${festivalImg})` }}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.vline} />
            <div className={styles.texts}>
              <h2 className={styles.title}>축제</h2>
              <p className={styles.desc}>
                거리가 즐거움으로 물드는 순간,
                <br />
                인사동 축제에서 특별한 하루를 즐기세요
              </p>
              <button
                className={styles.linkBtn}
                type='button'
                onClick={() => navigate('/events', { state: { presetCategory: 'FESTIVAL', presetPeriod: 'ALL' } })}
              >
                보러가기 →
              </button>
            </div>
          </div>

          {!showFallback && (
            <div className={styles.gallery}>
              {list.map((ev) => (
                <div className={styles.card} key={ev.eventId} onClick={() => handleCardClick(ev.eventId)}>
                  <img src={ev.mainImage} alt={`festival ${ev.eventId}`} loading='lazy' />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
