import { useLocation } from 'react-router-dom';
import styles from './HeaderSearch.module.css';
import searchIcon from '@assets/images/search.png';

export default function HeaderSearch() {
  const location = useLocation();
  const isIntroPage = location.pathname === '/';
  return (
    <form className={`${styles.form} ${isIntroPage ? styles.transparentForm : ''}`}>
      <input className={`${styles.input} ${isIntroPage ? styles.whiteInput : ''}`} type='search' placeholder='검색' />
      <button className={styles.button} type='button'>
        <img src={searchIcon} alt='검색' className={styles.searchIconicon} />
      </button>
    </form>
  );
}
