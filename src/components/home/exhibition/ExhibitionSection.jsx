import styles from './ExhibitionSection.module.css';
import SectionWrapper from '../commons/SectionWrapper';

export default function ExhibitionSection() {
  return (
    <SectionWrapper>
      <p className={styles.title}>전시</p>
    </SectionWrapper>
  );
}
