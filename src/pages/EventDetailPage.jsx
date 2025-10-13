import { useParams } from 'react-router-dom';
import { EventBasicInfo, EventDescription, EventVideo, EventMap } from '@components/eventDetailPage';
import PageLoader from '../components/global/pageLoader/PageLoader';
import styles from './EventDetailPage.module.css';
import useEventDetail from '../hooks/useEventDetailHook';

export default function EventDetailPage() {
  const { id } = useParams();
  const { loading, error, data } = useEventDetail(id);

  if (loading) return <PageLoader />;
  if (error) return <div className={styles.page}>이벤트 상세를 불러오지 못했습니다.</div>;

  return (
    <div className={styles.page}>
      <EventBasicInfo data={data} />
      <EventDescription data={data} />
      <EventVideo data={data} />
      <EventMap data={data} />
    </div>
  );
}
