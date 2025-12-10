import styles from './MbtiCard.module.css';

const MbtiCard = ({ type, label, selected, onToggle }) => {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={() => onToggle(type)}>
      <span className={styles.type}>{type}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default MbtiCard;
