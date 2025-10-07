import styles from './Header.module.css';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  return (
    <header className={styles.section}>
      <h1 className={styles.logo}>LOGO</h1>
      <HeaderSearch />
    </header>
  );
}
