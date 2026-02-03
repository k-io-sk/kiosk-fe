import styles from './MbtiCard.module.css';
import { useOutletContext } from 'react-router-dom';

const MbtiCard = ({ type, label, selected, onToggle }) => {
  const { region } = useOutletContext();
  const isOsanSelected = selected && region?.mbtiCard?.bg && region?.mbtiCard?.text;
  const cardStyle = isOsanSelected ? { backgroundColor: region.mbtiCard.bg } : undefined;
  const textStyle = isOsanSelected ? { color: region.mbtiCard.text } : undefined;

  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onToggle(type)}
      style={cardStyle}
    >
      <span className={styles.type} style={textStyle}>
        {type}
      </span>
      <span className={styles.label} style={textStyle}>
        {label}
      </span>
    </div>
  );
};

export default MbtiCard;
