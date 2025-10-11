import styles from './Pagination.module.css';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push('…');

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push('…');
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  const handleClick = (page) => {
    if (page !== '…' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.pageArrow} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>

      {getPageNumbers().map((page, idx) => (
        <button
          key={idx}
          className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
          onClick={() => handleClick(page)}
          disabled={page === '…'}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.pageArrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
}
