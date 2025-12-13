import { useEffect, useState } from 'react';
import { getRecommendEvents } from '@api/eventRecommendAPI';
import { getRandomEventsByCategory } from '@api/eventRecommendAPI';

const pickFields = (e) => ({
  eventId: e.eventId,
  title: e.title,
  location: e.location,
  startDate: e.startDate,
  endDate: e.endDate,
  mainImage: e.mainImage,
});

export function useEventRecommend({ mbti, requestKey, mode = 'random' } = {}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requestKey === undefined) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        let res;

        if (mode === 'mbti' && mbti) {
          res = await getRecommendEvents(mbti);
          setEvents(Array.isArray(res) ? res : []);
          return;
        }

        if (mode === 'random') {
          const result = await getRandomEventsByCategory();
          const list = Array.isArray(result?.data) ? result.data.map(pickFields) : [];
          setEvents(list);
        }
      } catch (e) {
        setError(e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [mbti, requestKey, mode]);

  return { events, loading, error };
}
