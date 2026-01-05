import styles from './FilterBar.module.css';
import { useEffect, useState } from 'react';

export default function FilterBar({ onFilterChange, selectedCategoryLabel = '전체', className = '' }) {
  const categories = ['전체', '공연', '전시', '축제', '교육/강좌', '기타'];

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryLabel);

  useEffect(() => setSelectedCategory(selectedCategoryLabel), [selectedCategoryLabel]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onFilterChange) onFilterChange(category);
  };

  return (
    <div className={`${styles.filterBar} ${className}`}>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li
            key={category}
            className={`${styles.categoryItem} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
