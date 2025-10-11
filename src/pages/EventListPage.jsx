import { EventCard } from '@components/eventListPage';
import { useState, useEffect } from 'react';
import styles from './EventListPage.module.css';

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        thumbnail: '/images/event1.png',
        title: 'AW2025 인사아트위크',
        startDate: '2025-06-04',
        endDate: '2025-06-14',
        place: '인사동 아트센터',
      },
      {
        id: 2,
        thumbnail: '/images/event2.png',
        title: '현대미술 특별전',
        startDate: '2025-09-01',
        endDate: '2025-09-31',
        place: '국립현대미술관',
      },
    ];
    setEvents(dummyData);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
