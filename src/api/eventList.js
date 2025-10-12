import { APIService } from './axios';

export const getEventList = async ({ eventCategory, eventPeriod, keyword, pageNum, pageSize }) => {
  try {
    const res = await APIService.public.get('/api/events', {
      params: {
        eventCategory,
        eventPeriod,
        keyword,
        pageNum,
        pageSize,
      },
    });
    return res.data;
  } catch (err) {
    console.error('이벤트 페이지 조회 실패:', err);
    throw err;
  }
};
