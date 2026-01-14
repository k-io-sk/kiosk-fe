import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './KioskHeader.module.css';

export default function KioskHeader({ active }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [promoOpen, setPromoOpen] = useState(false);

  const resolvedActive = useMemo(() => {
    if (active) return active;

    if (pathname.startsWith('/kiosk/mbti')) return 'mbti';
    if (pathname.startsWith('/kiosk/promo')) return 'promo';
    if (pathname.startsWith('/kiosk/events')) return 'events';

    return 'events';
  }, [active, pathname]);

  useEffect(() => {
    if (!promoOpen) return;

    const timer = setTimeout(() => {
      setPromoOpen(false);
      if (pathname !== '/kiosk/events') navigate('/kiosk/events');
    }, 2000);

    return () => clearTimeout(timer);
  }, [promoOpen, navigate, pathname]);

  const onClickTab = (path) => {
    if (pathname !== path) navigate(path);
  };

  const onClickPromo = (e) => {
    e.preventDefault();
    setPromoOpen(true);
  };

  return (
    <header className={styles.topHeader}>
      <nav className={styles.tabs}>
        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'events' ? styles.activeTab : ''}`}
          onClick={() => onClickTab('/kiosk/events')}
        >
          오늘 행사
        </button>

        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'mbti' ? styles.activeTab : ''}`}
          onClick={() => onClickTab('/kiosk/mbti')}
        >
          MBTI 추천
        </button>

        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'promo' ? styles.activeTab : ''}`}
          onClick={onClickPromo}
        >
          프로모션
        </button>
      </nav>

      {promoOpen && (
        <div
          className={styles.modalOverlay}
          role='dialog'
          aria-modal='true'
          aria-label='프로모션 안내'
          onClick={() => setPromoOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalTitle}>프로모션 페이지는 준비 중입니다.</p>

            <button
              type='button'
              className={styles.modalBtn}
              onClick={() => {
                setPromoOpen(false);
                navigate('/kiosk/events');
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
