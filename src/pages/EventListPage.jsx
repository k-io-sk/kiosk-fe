import { EventCard, FilterBar, Pagination } from '@components/eventListPage';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventList } from '@api/eventList';
import styles from './EventListPage.module.css';

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEventList({
          eventCategory: selectedCategory,
          eventPeriod: selectedPeriod,
          keyword: '',
          pageNum: currentPage,
          pageSize: pageSize,
        });
        console.log('API 응답:', res);
        const data = res?.data?.data || res?.data || res || {};
        setEvents(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('이벤트 목록 조회 실패:', error);
      }
    };
    fetchEvents();
  }, [currentPage, selectedCategory, selectedPeriod]);

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
            <div key={event.id || index} onClick={() => navigate(`/events/${event.id}`)} style={{ cursor: 'pointer' }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
