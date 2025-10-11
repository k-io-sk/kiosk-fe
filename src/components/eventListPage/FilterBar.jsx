import styles from './FilterBar.module.css';
import { useState } from 'react';

export default function FilterBar() {
  const categories = ['전체', '공연', '전시', '축제', '교육/강좌', '기타'];
  const periods = ['전체', '오늘', '이번주', '이번달'];

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedPeriod, setSelectedPeriod] = useState('전체');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log('Category filter applied:', category);
  };

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
    console.log('Period filter applied:', period);
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
