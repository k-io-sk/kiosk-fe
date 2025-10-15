import styles from './FilterBar.module.css';
import { useEffect, useState } from 'react';

export default function FilterBar({ onFilterChange, selectedCategoryLabel = '전체', selectedPeriodLabel = '전체' }) {
  const categories = ['전체', '공연', '전시', '축제', '교육/강좌', '기타'];
  const periods = ['전체', '오늘', '이번주', '이번달'];

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryLabel);
  const [selectedPeriod, setSelectedPeriod] = useState(selectedPeriodLabel);

  useEffect(() => setSelectedCategory(selectedCategoryLabel), [selectedCategoryLabel]);
  useEffect(() => setSelectedPeriod(selectedPeriodLabel), [selectedPeriodLabel]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onFilterChange) onFilterChange(category, selectedPeriod);
  };

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
    if (onFilterChange) onFilterChange(selectedCategory, period);
  };

  return (
    <div className={styles.filterBar}>
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
      <ul className={styles.periodList}>
        {periods.map((period) => (
          <li
            key={period}
            className={`${styles.periodItem} ${selectedPeriod === period ? styles.active : ''}`}
            onClick={() => handlePeriodClick(period)}
          >
            {period}
          </li>
        ))}
      </ul>
    </div>
  );
}
