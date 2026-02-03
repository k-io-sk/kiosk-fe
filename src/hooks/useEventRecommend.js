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

const mapRecommendErrorMessage = (serverMessage = '') => {
  if (serverMessage.includes('2개의 이벤트 추천에 실패했습니다')) {
    return '진행 중인 행사 수가 적어 추천 결과를 불러오지 못했어요';
  }
  return '추천 결과를 불러오지 못했어요';
};

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
        const serverMessage = e?.response?.data?.message || e?.response?.data?.error?.message || '';

        const userMessage = mapRecommendErrorMessage(serverMessage);

        setError({ message: userMessage });
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [mbti, region, requestKey, mode]);

  return { events, loading, error };
}
