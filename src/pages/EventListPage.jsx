import { EventCard, FilterBar, Pagination } from '@components/eventListPage';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventListPage.module.css';
import poster from '@assets/images/poster.png';

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const totalPages = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 2,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 3,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 4,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 5,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 6,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 7,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 8,
        thumbnail: poster,
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
    ];
    setEvents(dummyData);
  }, []);

  const handlePageChange = (page) => {
    console.log(`Page changed to: ${page}`);
    setCurrentPage(page);
  };

  return (
    <div className={styles.page}>
      <FilterBar />
      <div className={styles.container}>
        <div className={styles.grid}>
          {events.map((event) => (
            <div key={event.id} onClick={() => navigate(`/events/${event.id}`)} style={{ cursor: 'pointer' }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
