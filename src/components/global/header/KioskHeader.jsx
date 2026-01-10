import { useNavigate, useLocation } from 'react-router-dom';
import styles from './KioskHeader.module.css';

import logoImg from '@/assets/images/square_logo.png';
import QrCode from '@global/qr/QrCode';

const LIST_URL = 'https://skukiosk.netlify.app/events';

export default function KioskHeader({ active }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (path) => {
    if (pathname !== path) navigate(path);
  };

  const resolvedActive = (() => {
    if (active) return active;

    if (pathname.startsWith('/kiosk/mbti')) return 'mbti';
    if (pathname.startsWith('/kiosk/promo')) return 'promo';
    if (pathname.startsWith('/kiosk/events')) return 'events';

    return 'events';
  })();

  return (
    <header className={styles.topHeader}>
      {/* <div className={styles.headerRow}>
        <img src={logoImg} alt='IN:JONGNO 로고' className={styles.logo} />

        <div className={styles.moreBox}>
          <p className={styles.more}>모바일로 보기</p>
          <QrCode value={LIST_URL} size={116} />
        </div>
      </div> */}

      <nav className={styles.tabs}>
        <a href='/kiosk/events' className={`${styles.tab} ${resolvedActive === 'events' ? styles.activeTab : ''}`}>
          오늘 행사
        </a>

        <a href='/kiosk/mbti' className={`${styles.tab} ${resolvedActive === 'mbti' ? styles.activeTab : ''}`}>
          MBTI 추천
        </a>

        <a href='/kiosk/promo' className={`${styles.tab} ${resolvedActive === 'promo' ? styles.activeTab : ''}`}>
          프로모션
        </a>
      </nav>
    </header>
  );
}
