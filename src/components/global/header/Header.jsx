import { useLocation, Link } from 'react-router-dom';
import styles from './Header.module.css';
import HeaderSearch from './HeaderSearch';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import MenuOverlay from './MenuOverlay';
import logoImg from '@/assets/images/jongno.png';

export default function Header() {
  const location = useLocation();
  const isMobile = location.pathname === '/mobile' || location.pathname.startsWith('/mobile/');
  const isKiosk = location.pathname === '/kiosk' || location.pathname.startsWith('/kiosk/');
  const isHomeStyle = location.pathname === '/' || location.pathname === '/mobile';
  const logoTo = isMobile ? '/mobile' : '/';
  const [resetSearch, setResetSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setResetSearch(true);
    setTimeout(() => setResetSearch(false), 0);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (isKiosk) return null;

  return (
    <>
      <header
        className={`${styles.section} ${
          isHomeStyle ? styles.homeHeader : styles.fixedHeader
        } ${isHomeStyle ? styles.whiteLogo : ''}`}
      >
        <Link to={logoTo} className={styles.logo} onClick={handleLogoClick}>
          <img src={logoImg} alt='IN:JONGNO 로고' className={styles.logoImg} />
        </Link>

        <div className={styles.right}>
          <HeaderSearch resetSearch={resetSearch} />
          <span className={styles.menuBtnSlot} />
        </div>
      </header>

      <button
        type='button'
        className={`
          ${styles.fixedMenuBtn}
          ${menuOpen ? styles.open : ''}
          ${isHomeStyle ? styles.homeMenuBtn : ''}
        `}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
      >
        <span className={styles.iconWrap}>
          {menuOpen ? <FiX className={styles.menuIcon} /> : <FiMenu className={styles.menuIcon} />}
        </span>
      </button>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
