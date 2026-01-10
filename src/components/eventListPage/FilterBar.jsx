import styles from './FilterBar.module.css';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function FilterBar({
  onFilterChange,
  selectedCategoryLabel = '전체',
  className = '',
  showArrows = false,
  onPrev,
  onNext,
}) {
  const categories = ['전체', '공연', '전시', '축제', '교육/강좌', '기타'];
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryLabel);

  useEffect(() => setSelectedCategory(selectedCategoryLabel), [selectedCategoryLabel]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilterChange?.(category);
  };

  return (
    <div className={`${styles.filterBar} ${className}`}>
      <ul className={styles.categoryList}>
        {showArrows && (
          <li className='kioskArrow'>
            <button type='button' className={styles.arrowBtn} onClick={onPrev}>
              <FiChevronLeft size={40} />
            </button>
          </li>
        )}

        {categories.map((category) => (
          <li
            key={category}
            className={`${styles.categoryItem} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}

        {showArrows && (
          <li className='kioskArrow'>
            <button type='button' className={styles.arrowBtn} onClick={onNext}>
              <FiChevronRight size={40} />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
