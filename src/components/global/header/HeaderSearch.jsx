import { useLocation } from 'react-router-dom';
import styles from './HeaderSearch.module.css';
import { IoSearch } from 'react-icons/io5';

export default function HeaderSearch() {
  const location = useLocation();
  const isIntroPage = location.pathname === '/';
  return (
    <form className={`${styles.form} ${isIntroPage ? styles.transparentForm : ''}`}>
      <input className={`${styles.input} ${isIntroPage ? styles.whiteInput : ''}`} type='search' placeholder='검색' />
      <button className={styles.button} type='button'>
        <IoSearch className={styles.searchIcon} />
      </button>
    </form>
  );
}
