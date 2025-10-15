import { useLocation, Link } from 'react-router-dom';
import styles from './Header.module.css';
import HeaderSearch from './HeaderSearch';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [resetSearch, setResetSearch] = useState(false);

  const handleLogoClick = () => {
    setResetSearch(true);
    setTimeout(() => setResetSearch(false), 0);
  };

  return (
    <header
      className={`${styles.section} ${
        isHomePage ? styles.homeHeader : styles.fixedHeader
      } ${isHomePage ? styles.whiteLogo : ''}`}
    >
      <Link to='/' className={styles.logo} onClick={handleLogoClick}>
        LOGO
      </Link>
      <HeaderSearch resetSearch={resetSearch} />
    </header>
  );
}
