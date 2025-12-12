import { APIService } from './axios';

export const getRecommendSummary = async (eventIds = []) => {
  try {
    const res = await APIService.public.get('/api/events/recommend/summary', {
      params: { eventIds },
    });
    return res.data;
  } catch (err) {
    console.error('추천 이벤트 요약 조회 실패:', err);
    throw err;
  }
};
