import styles from './IntroSection.module.css';
import SectionWrapper from '../../global/sectionWrapper/SectionWrapper';
import introImg from '@assets/images/intro.png';

export default function IntoSection() {
  return (
    <SectionWrapper>
      <div className={styles.intro} style={{ backgroundImage: `url(${introImg})` }}>
        <div className={styles.titleBox}>
          <div className={`${styles.line} ${styles.topLine}`}></div>
          <p className={styles.title}>하루의 쉼, 인사동에서</p>
          <div className={`${styles.line} ${styles.bottomLine}`}></div>
        </div>
      </div>
    </SectionWrapper>
  );
}
