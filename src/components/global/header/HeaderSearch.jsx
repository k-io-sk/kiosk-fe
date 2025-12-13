import { useNavigate } from 'react-router-dom';
import styles from './HeaderSearch.module.css';
import { IoSearch } from 'react-icons/io5';
import { useState, useEffect } from 'react';

export default function HeaderSearch({ resetSearch }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (resetSearch) setSearchText('');
  }, [resetSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/events', { state: { keyword: searchText } });
  };

  return (
    <form onSubmit={handleSearch} className={`${styles.form} ${styles.transparentForm}`}>
      <input
        className={`${styles.input} ${styles.whiteInput}`}
        type='search'
        placeholder='검색'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className={styles.button} type='submit'>
        <IoSearch className={styles.searchIcon} />
      </button>
    </form>
  );
}
