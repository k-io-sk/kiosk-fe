import { useEffect, useState } from 'react';
import { getRecommendEvents, getRandomEventsByCategory } from '@api/eventRecommendAPI';

const pickFields = (e) => ({
  eventId: e.eventId,
  title: e.title,
  location: e.location,
  startDate: e.startDate,
  endDate: e.endDate,
  mainImage: e.mainImage,
});

export function useEventRecommend({ mbti, region, requestKey, mode = 'random' } = {}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (requestKey == null) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        if (mode === 'mbti') {
          if (!mbti) {
            setEvents([]);
            return;
          }

          const list = await getRecommendEvents({ mbti, region });
          setEvents(Array.isArray(list) ? list : []);
          return;
        }

        if (mode === 'random') {
          const result = await getRandomEventsByCategory();

          const raw = Array.isArray(result) ? result : Array.isArray(result?.data) ? result.data : [];

          setEvents(raw.map(pickFields));
        }
      } catch (e) {
        setError(e);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [mbti, region, requestKey, mode]);

  return { events, loading, error };
}
