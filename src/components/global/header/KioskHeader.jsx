import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from './KioskHeader.module.css';

import UnavailableModal from '@global/modal/UnavailableModal';

export default function KioskHeader({ active }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [blockedPage, setBlockedPage] = useState(null);
  const modalOpen = blockedPage !== null;

  const modalTitle = useMemo(() => {
    if (blockedPage === 'promo') return '프로모션 페이지는 준비 중입니다';
    return '';
  }, [blockedPage]);

  const regionParam = searchParams.get('region') || 'jongno';

  const resolvedActive = useMemo(() => {
    if (active) return active;
    if (pathname.startsWith('/kiosk/mbti')) return 'mbti';
    if (regionParam === 'insa') return 'insa';
    return 'jongno';
  }, [active, pathname, regionParam]);

  useEffect(() => {
    if (!modalOpen) return;

    const timer = setTimeout(() => {
      setBlockedPage(null);
      setSearchParams({ region: 'jongno' });
      navigate('/kiosk/events?region=jongno');
    }, 2000);

    return () => clearTimeout(timer);
  }, [modalOpen, navigate, setSearchParams]);

  const goRegion = (region) => {
    setSearchParams({ region });
    navigate(`/kiosk/events?region=${region}`);
  };

  const go = (path) => {
    if (pathname !== path) navigate(path);
  };

  return (
    <header className={styles.topHeader}>
      <nav className={styles.tabs}>
        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'jongno' ? styles.activeTab : ''}`}
          onClick={() => goRegion('jongno')}
        >
          종로구
        </button>

        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'insa' ? styles.activeTab : ''}`}
          onClick={() => goRegion('insa')}
        >
          인사동
        </button>

        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'mbti' ? styles.activeTab : ''}`}
          onClick={() => go('/kiosk/mbti')}
        >
          MBTI
        </button>

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
          setSearchParams({ region: 'jongno' });
          navigate('/kiosk/events?region=jongno');
        }}
        width='40rem'
        height='20rem'
        titleTop='6rem'
      />
    </header>
  );
}
