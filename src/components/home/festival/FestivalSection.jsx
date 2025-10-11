import styles from '../exhibition/ExhibitionSection.module.css';
import festivalImg from '@assets/images/festival.png';
import img from '@assets/images/img.png';
import SectionWrapper from '../../global/sectionWrapper/SectionWrapper';

export default function FestivalSection() {
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
              <button className={styles.linkBtn} type='button'>
                보러가기 →
              </button>
            </div>
          </div>

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
        </div>
      </div>
    </SectionWrapper>
  );
}
