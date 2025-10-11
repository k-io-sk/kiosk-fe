import { useNavigate } from 'react-router-dom';
import styles from './BackBar.module.css';
import { IoArrowBack } from 'react-icons/io5';

export default function BackBar() {
  const navigate = useNavigate();

  return (
    <div className={styles.backBar}>
      <button className={styles.iconButton} onClick={() => navigate(-1)} aria-label='이전 페이지로 이동'>
        <IoArrowBack className={styles.icon} />
      </button>
    </div>
  );
}
