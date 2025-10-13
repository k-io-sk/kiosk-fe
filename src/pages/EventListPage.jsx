import { EventCard, FilterBar, Pagination } from '@components/eventListPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventList } from '@hooks/useEventList';
import styles from './EventListPage.module.css';

export default function EventListPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');
  const pageSize = 8;

  const categoryMap = {
    전체: 'ALL',
    공연: 'SHOW',
    전시: 'EXHIBITION',
    축제: 'FESTIVAL',
    '교육/강좌': 'EDUEXP',
    기타: 'ETC',
  };
  const periodMap = {
    전체: 'ALL',
    오늘: 'TODAY',
    이번주: 'THIS_WEEK',
    이번달: 'THIS_MONTH',
  };

  const { events, totalPages } = useEventList({
    category: selectedCategory,
    period: selectedPeriod,
    page: currentPage,
    size: pageSize,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (categoryLabel, periodLabel) => {
    const mappedCategory = categoryMap[categoryLabel] || 'ALL';
    const mappedPeriod = periodMap[periodLabel] || 'ALL';
    setSelectedCategory(mappedCategory);
    setSelectedPeriod(mappedPeriod);
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className={styles.container}>
        <div className={styles.grid}>
          {events.map((event, index) => (
            <div
              key={event.id || index}
              onClick={() => navigate(`/events/${event.eventId}`)}
              style={{ cursor: 'pointer' }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
