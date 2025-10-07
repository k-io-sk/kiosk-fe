import styles from './HeaderSearch.module.css';
import searchIcon from '@assets/images/search.png';

export default function HeaderSearch() {
  return (
    <form className={styles.form}>
      <input className={styles.input} type='search' placeholder='검색' />
      <button className={styles.button} type='button'>
        <img src={searchIcon} alt='검색' className={styles.searchIconicon} />
      </button>
    </form>
  );
}
