import { APIService } from './axios';

export const getRecommendEvents = async (mbti) => {
  try {
    const res = await APIService.public.get('/api/events/recommend', {
      params: { mbti },
    });
    return res.data;
  } catch (err) {
    console.error('MBTI 이벤트 추천 조회 실패:', err);
    throw err;
  }
};

export const getRandomEventsByCategory = async () => {
  return APIService.public.get('/api/events/random-by-category');
};
