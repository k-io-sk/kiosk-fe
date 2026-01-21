import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import styles from './KioskHeader.module.css';
import UnavailableModal from '@global/modal/UnavailableModal';
import { DEFAULT_REGION_KEY, getRegionConfig, HEADER_TABS } from '@/config/kioskConfig';

export default function KioskHeader({ active }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const regionKey = (searchParams.get('region') || DEFAULT_REGION_KEY).toLowerCase();
  const region = getRegionConfig(regionKey);

  const regionTabs = HEADER_TABS[region.headerMode] ?? HEADER_TABS.seoul;

  const [blockedPage, setBlockedPage] = useState(null);
  const modalOpen = blockedPage !== null;

  const modalTitle = useMemo(() => {
    if (blockedPage === 'promo') return '프로모션 페이지는 준비 중입니다';
    return '';
  }, [blockedPage]);

  const resolvedActive = useMemo(() => {
    if (active) return active;
    if (pathname.startsWith('/kiosk/mbti')) return 'mbti';
    return regionKey;
  }, [active, pathname, regionKey]);

  const goEvents = (nextRegionKey) => {
    const next = new URLSearchParams(searchParams);
    next.set('region', nextRegionKey);
    setSearchParams(next, { replace: true });
    navigate(`/kiosk/events?${next.toString()}`);
  };

  const goMbti = () => {
    const next = new URLSearchParams(searchParams);
    next.set('region', regionKey);
    setSearchParams(next, { replace: true });
    navigate(`/kiosk/mbti?${next.toString()}`);
  };

  useEffect(() => {
    if (!modalOpen) return;

    const timer = setTimeout(() => {
      setBlockedPage(null);
      goEvents(DEFAULT_REGION_KEY);
    }, 2000);

    return () => clearTimeout(timer);
  }, [modalOpen]);

  return (
    <header className={styles.topHeader}>
      <nav className={styles.tabs}>
        {regionTabs.map((t) => (
          <button
            key={t.key}
            type='button'
            className={`${styles.tab} ${resolvedActive === t.key ? styles.activeTab : ''}`}
            onClick={() => goEvents(t.key)}
          >
            {t.label}
          </button>
        ))}

        <button
          type='button'
          className={`${styles.tab} ${resolvedActive === 'mbti' ? styles.activeTab : ''}`}
          onClick={goMbti}
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
          goEvents(DEFAULT_REGION_KEY);
        }}
        width='40rem'
        height='20rem'
        titleTop='6rem'
      />
    </header>
  );
}
