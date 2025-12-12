import { useEffect, useState } from 'react';
import { getRecommendEvents } from '@api/eventRecommendAPI';

export function useEventRecommend(mbti, requestKey) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!requestKey || !mbti) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const list = await getRecommendEvents(mbti);
        setEvents(list || []);
      } catch (e) {
        setError(e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [mbti, requestKey]);

  return { events, loading, error };
}
