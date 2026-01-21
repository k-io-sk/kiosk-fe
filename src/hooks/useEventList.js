import { useState, useEffect, useCallback } from 'react';
import { getEventList } from '@api/eventList';

export function useEventList({ eventRegion = 'JONGNO', category, period = 'ALL', page, size, keyword = '' }) {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const refetch = useCallback(() => setRetryKey((k) => k + 1), []);

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getEventList({
          eventRegion,
          eventCategory: category,
          keyword,
          pageNum: page,
          pageSize: size,
        });

        if (!mounted) return;

        const payload = res?.data ?? res ?? {};
        setEvents(Array.isArray(payload.content) ? payload.content : []);
        setTotalPages(Number(payload.totalPages) || 1);
      } catch (e) {
        if (!mounted) return;
        setError(e);
        setEvents([]);
        setTotalPages(1);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();

    return () => {
      mounted = false;
    };
  }, [eventRegion, category, period, page, size, keyword, retryKey]);

  return { events, totalPages, loading, error, refetch };
}
