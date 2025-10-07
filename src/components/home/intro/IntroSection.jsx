import styles from './IntroSection.module.css';
import SectionWrapper from '../commons/SectionWrapper';
import introImg from '@assets/images/intro.png';

export default function IntoSection() {
  return (
    <SectionWrapper>
      <div className={styles.intro} style={{ backgroundImage: `url(${introImg})` }}>
        <p className={styles.title}>하루의 쉼, 인사동에서</p>
      </div>
    </SectionWrapper>
  );
}
