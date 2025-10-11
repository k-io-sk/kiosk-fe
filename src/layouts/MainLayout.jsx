import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/commons/footer/Footer';
import Header from '../components/commons/header/Header';
import BackBar from '../components/commons/backBar/BackBar';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`${styles.layout} ${isHomePage ? styles.isHome : styles.isSub}`}>
      <Header />
      {!isHomePage && <BackBar />}
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
