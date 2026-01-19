import styles from './FilterBar.module.css';
import { useEffect, useState } from 'react';

export default function FilterBar({
  onFilterChange,
  selectedCategoryLabel = '전체',
  className = '',
  categories = ['전체', '공연', '전시', '기타'],
}) {
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryLabel);

  useEffect(() => {
    setSelectedCategory(selectedCategoryLabel);
  }, [selectedCategoryLabel]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilterChange?.(category);
  };

  return (
    <div className={`${styles.filterBar} ${className}`}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li
            key={category}
            className={`${styles.categoryItem} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
            role='button'
            tabIndex={0}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
