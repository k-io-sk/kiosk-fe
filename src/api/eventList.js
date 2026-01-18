import { APIService } from './axios';

export const getEventList = async ({ eventRegion, eventCategory, eventPeriod, keyword, pageNum, pageSize }) => {
  try {
    return await APIService.public.get('/api/events', {
      params: {
        eventRegion,
        eventCategory,
        eventPeriod,
        keyword,
        pageNum,
        pageSize,
      },
    });
  } catch (err) {
    console.error('이벤트 페이지 조회 실패:', err);
    throw err;
  }
};
