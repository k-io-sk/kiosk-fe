import { APIService } from './axios';

/**
 * GET /api/events/main
 * 메인 화면에서 카테고리별 이벤트(전시/공연/축제) 3개씩 반환
 */
export const getMainEvents = async () => {
  try {
    const res = await APIService.public.get('/api/events/main');
    return res;
  } catch (err) {
    console.error('메인 이벤트 조회 실패:', err);
    throw err;
  }
};
