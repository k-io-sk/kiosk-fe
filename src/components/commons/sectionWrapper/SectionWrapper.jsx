import styles from './SectionWrapper.module.css';

function SectionWrapper({ children }) {
  return <div className={styles.section}>{children}</div>;
}

export default SectionWrapper;
