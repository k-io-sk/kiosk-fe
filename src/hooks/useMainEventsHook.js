import { useEffect, useState, useMemo } from 'react';
import { getMainEvents } from '@api/homeAPI';

export default function useMainEventsHook() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getMainEvents();
        if (active) setRaw(data);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // 카테고리별로 분류
  const byCategory = useMemo(() => {
    const map = { EXHIBITION: [], SHOW: [], FESTIVAL: [] };
    if (raw?.data?.length) {
      raw.data.forEach((block) => {
        const { eventCategory, events } = block;
        if (eventCategory && Array.isArray(events)) {
          map[eventCategory] = events;
        }
      });
    }
    return map;
  }, [raw]);

  return { loading, error, data: byCategory };
}
