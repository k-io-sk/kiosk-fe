import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`${styles.section} ${
        isHomePage ? styles.homeHeader : styles.fixedHeader
      } ${isHomePage ? styles.whiteLogo : ''}`}
    >
      <h1 className={styles.logo}>LOGO</h1>
      <HeaderSearch />
    </header>
  );
}
 