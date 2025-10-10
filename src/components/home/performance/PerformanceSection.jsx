import styles from './PerformanceSection.module.css';
import SectionWrapper from '../../commons/sectionWrapper/SectionWrapper';
import performanceImg from '@assets/images/performance.png';
import img from '@assets/images/img.png';

export default function PerformanceSection() {
  return (
    <SectionWrapper>
      <div className={styles.backgroundImage} style={{ backgroundImage: `url(${performanceImg})` }}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <div className={styles.gallery}>
            <div className={styles.card}>
              <img src={img} alt='festival 1' />
            </div>
            <div className={styles.card}>
              <img src={img} alt='festival 2' />
            </div>
            <div className={styles.card}>
              <img src={img} alt='festival 3' />
            </div>
          </div>

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
