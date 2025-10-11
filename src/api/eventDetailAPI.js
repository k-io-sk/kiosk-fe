import { APIService } from './axios';

export const getEventDetail = async (eventId) => {
  return APIService.public.get(`/api/events/${eventId}`);
};
