import { useNavigate, useLocation } from 'react-router-dom';
import styles from './KioskHeader.module.css';

import logoImg from '@/assets/images/jongno_black.png';
import QrCode from '@global/qr/QrCode';

const LIST_URL = 'https://skukiosk.netlify.app/events';

export default function KioskHeader({ active = 'today' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => {
    if (location.pathname !== path) navigate(path);
  };

  return (
    <header className={styles.topHeader}>
      <div className={styles.headerRow}>
        <img src={logoImg} alt='IN:JONGNO 로고' className={styles.logo} />

        <div className={styles.moreBox}>
          <p className={styles.more}>더 많은 이벤트 보러가기</p>
          <QrCode value={LIST_URL} size={116} />
        </div>
      </div>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${active === 'today' ? styles.activeTab : ''}`}
          onClick={() => go('/kiosk/events')}
        >
          오늘 행사
        </button>

        <button
          className={`${styles.tab} ${active === 'mbti' ? styles.activeTab : ''}`}
          onClick={() => go('/kiosk/mbti')}
        >
          mbti 추천
        </button>

        <button
          className={`${styles.tab} ${active === 'promo' ? styles.activeTab : ''}`}
          onClick={() => go('/kiosk/promo')}
        >
          프로모션
        </button>
      </nav>
    </header>
  );
}
