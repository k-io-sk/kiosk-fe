import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './KioskHeader.module.css';

import UnavailableModal from '@global/modal/UnavailableModal';

export default function KioskHeader({ active }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 어떤 탭이 막혔는지 상태
  const [blockedPage, setBlockedPage] = useState(null); // 'insadong' | 'promo' | null
  const modalOpen = blockedPage !== null;

  const modalTitle = useMemo(() => {
    if (blockedPage === 'insadong') return '인사동 페이지는 준비 중입니다';
    if (blockedPage === 'promo') return '프로모션 페이지는 준비 중입니다';
    return '';
  }, [blockedPage]);

  const resolvedActive = useMemo(() => {
    if (active) return active;
    if (pathname.startsWith('/kiosk/mbti')) return 'mbti';
    if (pathname.startsWith('/kiosk/events')) return 'jongno';
    return 'jongno';
  }, [active, pathname]);

  // 모달 열리면 2초 후 종로구(/events)로 이동
  useEffect(() => {
    if (!modalOpen) return;

    const timer = setTimeout(() => {
      setBlockedPage(null);
      navigate('/kiosk/events');
    }, 2000);

    return () => clearTimeout(timer);
  }, [modalOpen, navigate]);

  const go = (path) => {
    if (pathname !== path) navigate(path);
  };

  return (
    <header className={styles.topHeader}>
      <nav className={styles.tabs}>
        {/* 종로구 */}
        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'jongno' ? styles.activeTab : ''}`}
          onClick={() => go('/kiosk/events')}
        >
          종로구
        </button>

        {/* 인사동 (막힘) */}
        <button type='button' className={styles.tab} onClick={() => setBlockedPage('insadong')}>
          인사동
        </button>

        {/* MBTI */}
        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'mbti' ? styles.activeTab : ''}`}
          onClick={() => go('/kiosk/mbti')}
        >
          MBTI
        </button>

        {/* 프로모션 (막힘) */}
        <button type='button' className={styles.tab} onClick={() => setBlockedPage('promo')}>
          프로모션
        </button>
      </nav>

      <UnavailableModal
        open={modalOpen}
        title={modalTitle}
        buttonText='확인'
        onClose={() => setBlockedPage(null)}
        onConfirm={() => {
          setBlockedPage(null);
          navigate('/kiosk/events');
        }}
        width='40rem'
        height='20rem'
        titleTop='6rem'
      />
    </header>
  );
}
