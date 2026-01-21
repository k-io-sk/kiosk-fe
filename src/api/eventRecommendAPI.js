import { APIService } from './axios';

export const getRecommendEvents = async ({ mbti, region }) => {
  try {
    const res = await APIService.public.get('/api/events/recommend', {
      params: { mbti, region },
    });

    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;

    return [];
  } catch (err) {
    console.error('MBTI 이벤트 추천 조회 실패:', err);
    throw err;
  }
};

export const getRandomEventsByCategory = async () => {
  return APIService.public.get('/api/events/random-by-category');
};
