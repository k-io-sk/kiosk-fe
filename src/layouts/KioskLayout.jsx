import { Outlet } from 'react-router-dom';
import styles from './KioskLayout.module.css';
import KioskHeader from '@/components/global/header/KioskHeader';
import KioskFooter from '@/components/global/footer/KioskFooter';

export default function KioskLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <KioskHeader />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <KioskFooter />
      </footer>
    </div>
  );
}
