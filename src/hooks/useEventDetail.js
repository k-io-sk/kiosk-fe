import { useEffect, useState } from 'react';
import { getEventDetail } from '@api/eventDetailAPI';

export default function useEventDetail(eventId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await getEventDetail(eventId);
        if (active) setData(res.data);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [eventId]);

  return { loading, error, data };
}
