import styles from './ExhibitionSection.module.css';
import SectionWrapper from '../commons/SectionWrapper';
import exhibitionImg from '@assets/images/exhibition.png';
import e1 from '@assets/images/exhibition_1.png';
import e2 from '@assets/images/exhibition_2.png';
import e3 from '@assets/images/exhibition_3.png';

export default function ExhibitionSection() {
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
              <button className={styles.linkBtn} type='button'>
                보러가기 →
              </button>
            </div>
          </div>

          <div className={styles.gallery}>
            <div className={styles.card}>
              <img src={e1} alt='exhibition 1' />
            </div>
            <div className={styles.card}>
              <img src={e2} alt='exhibition 2' />
            </div>
            <div className={styles.card}>
              <img src={e3} alt='exhibition 3' />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
