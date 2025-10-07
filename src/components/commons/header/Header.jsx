import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  const location = useLocation();
  const isIntroPage = location.pathname === '/';
  return (
    <header className={`${styles.section} ${isIntroPage ? styles.whiteLogo : ''}`}>
      {' '}
      <h1 className={styles.logo}>LOGO</h1>
      <HeaderSearch />
    </header>
  );
}
