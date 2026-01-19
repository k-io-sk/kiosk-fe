import { APIService } from './axios';

export const getEventList = async ({ eventRegion, eventCategory, keyword, pageNum, pageSize }) => {
  try {
    const params = { eventRegion, eventCategory, pageNum, pageSize };

    const trimmed = (keyword ?? '').trim();
    if (trimmed) params.keyword = trimmed;

    return await APIService.public.get('/api/events', { params });
  } catch (err) {
    console.error('이벤트 페이지 조회 실패:', err?.response?.data ?? err);
    throw err;
  }
};
