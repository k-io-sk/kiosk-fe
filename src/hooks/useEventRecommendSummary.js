import { useEffect, useState } from 'react';
import { getRecommendSummary } from '@api/eventRecommendSummaryAPI';

export function useEventRecommendSummary(eventIds, requestKey) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!requestKey || !eventIds?.length) return;

    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);

        const list = await getRecommendSummary(eventIds);
        setSummary(list || []);
      } catch (e) {
        setError(e);
        setSummary([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [eventIds, requestKey]);

  return { summary, loading, error };
}
