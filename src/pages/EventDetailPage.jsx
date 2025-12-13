import { useParams, Navigate } from 'react-router-dom';
import { EventBasicInfo, EventMap } from '@components/eventDetailPage';
import PageLoader from '../components/global/pageLoader/PageLoader';
import styles from './EventDetailPage.module.css';
import useEventDetail from '../hooks/useEventDetail';

export default function EventDetailPage() {
  const { id } = useParams();
  const { loading, error, data } = useEventDetail(id);

  if (loading) return <PageLoader />;

  if (error || !data) {
    return <Navigate to='/not-found' replace />;
  }

  return (
    <div className={styles.page}>
      <EventBasicInfo data={data} />
      <EventMap data={data} />
    </div>
  );
}
