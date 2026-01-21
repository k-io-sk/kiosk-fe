import { Outlet, useSearchParams } from 'react-router-dom';
import styles from './KioskLayout.module.css';
import KioskHeader from '@/components/global/header/KioskHeader';
import KioskFooter from '@/components/global/footer/KioskFooter';
import { useKioskUI } from '@/contexts/KioskUIContext';
import { DEFAULT_REGION_KEY, getRegionConfig } from '@/config/kioskConfig';

export default function KioskLayout() {
  const { hideFooter } = useKioskUI();
  const [searchParams] = useSearchParams();

  const regionKey = (searchParams.get('region') || DEFAULT_REGION_KEY).toLowerCase();
  const region = getRegionConfig(regionKey);

  return (
    <div
      className={styles.shell}
      style={{
        '--kiosk-bg': `url(${region.backgroundImage})`,
        '--primary': region.primary,
        '--qr-notice-text': region.qrNotice,
        '--mbti-selected-bg': region.mbtiSelectedBg,
        '--result-border': region.resultBorder,
        '--result-bg': region.resultBg,
      }}
    >
      <header className={styles.header}>
        <KioskHeader />
      </header>

      <main className={styles.main}>
        <Outlet context={{ regionKey, region }} />
      </main>

      {!hideFooter && (
        <footer className={styles.footer}>
          <KioskFooter />
        </footer>
      )}
    </div>
  );
}
