import styles from './PerformanceSection.module.css';
import SectionWrapper from '../../global/sectionWrapper/SectionWrapper';
import performanceImg from '@assets/images/performance.png';

export default function PerformanceSection({ items = [] }) {
  const list = items.slice(0, 3);
  const showFallback = list.length === 0;

  return (
    <SectionWrapper>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${performanceImg})` }}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          {list.length > 0 && (
            <div className={styles.gallery}>
              {list.map((ev) => (
                <div className={styles.card} key={ev.eventId}>
                  <img src={ev.mainImage} alt={`show ${ev.eventId}`} loading='lazy' />
                </div>
              ))}
            </div>
          )}

          <div className={styles.description}>
            <div className={styles.vline} />
            <div className={styles.texts}>
              <h2 className={styles.title}>공연</h2>
              <p className={styles.desc}>
                예술이 살아 숨쉬는 무대,
                <br />
                인사동 공연에서 특별한 순간을 만나보세요
              </p>
              <button className={styles.linkBtn} type='button'>
                보러가기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
