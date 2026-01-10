import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

import KioskHeader from '@/components/global/header/KioskHeader';
import EventBasicInfo from '@/components/eventDetailPage/EventBasicInfo';
import EventMap from '@/components/eventDetailPage/EventMap';
import LoadingSpinner from '@global/pageLoader/LoadingSpinner';
import NotFound from './NotFound';
import KioskFooter from '@/components/global/footer/KioskFooter';

import styles from './KioskEventDetailPage.module.css';
import { getEventDetail } from '@/api/eventDetailAPI';

export default function KioskEventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setHasError(false);

        const res = await getEventDetail(id);
        if (!mounted) return;

        const root = res?.data ?? res;
        setData(root?.data ?? root);
      } catch (e) {
        console.error(e);
        if (!mounted) return;

        setHasError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.fullCenter}>
          <LoadingSpinner size={64} />
        </div>
      </div>
    );
  }

  if (hasError || !data) {
    return (
      <div className={styles.page}>
        <div className={styles.fullCenter}>
          <NotFound />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.page}>
      <KioskHeader active='events' />

      <main className={styles.content}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <IoChevronBack size={32} />
          <span>목록으로</span>
        </button>

        {data && (
          <div className={styles.kiosk}>
            <EventBasicInfo data={data} kiosk />
            <EventMap data={data} kiosk />
          </div>
        )}
      </main>
      <KioskFooter />
    </div>
  );
}
