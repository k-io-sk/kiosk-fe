import { useState, useEffect } from 'react';
import { getEventList } from '@api/eventList';

export function useEventList({ category, period, page, size }) {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      const res = await getEventList({
        eventCategory: category,
        eventPeriod: period,
        keyword: '',
        pageNum: page,
        pageSize: size,
      });

      const data = res || {};
      setEvents(data.content || []);
      setTotalPages(data.totalPages || 1);
    };
    fetch();
  }, [category, period, page, size]);

  return { events, totalPages };
}
