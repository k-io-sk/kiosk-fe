import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './MenuOverlay.module.css';

export default function MenuOverlay({ open, onClose }) {
  const location = useLocation();
  if (!open) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.backdrop} role='dialog' aria-modal='true' onClick={onClose}>
      <nav className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <ul className={styles.menu}>
          <li>
            <Link to='/about' className={`${styles.link} ${isActive('/about') ? styles.active : ''}`} onClick={onClose}>
              소개
            </Link>
          </li>
          <li>
            <Link
              to='/events'
              className={`${styles.link} ${isActive('/events') ? styles.active : ''}`}
              onClick={onClose}
            >
              전체 이벤트
            </Link>
          </li>
          <li>
            <Link to='/mbti' className={`${styles.link} ${isActive('/mbti') ? styles.active : ''}`} onClick={onClose}>
              MBTI 이벤트 추천
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

MenuOverlay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
