import { EventBasicInfo, EventDescription, EventVideo, EventMap } from '@components/eventDetailPage';
import styles from './EventDetailPage.module.css';

export default function EventDetailPage() {
  return (
    <div className={styles.page}>
      <EventBasicInfo />
      <EventDescription />
      <EventVideo />
      <EventMap />
    </div>
  );
}
