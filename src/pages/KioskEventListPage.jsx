import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KioskEventListPage.module.css';
import KioskHeader from '@/components/global/header/KioskHeader';
import KioskEventCard from '@/components/eventListPage/KioskEventCard';
import Pagination from '@/components/eventListPage/Pagination';

import logoImg from '@/assets/images/jongno_black.png';
import QrCode from '@global/qr/QrCode';
import LoadingSpinner from '@global/pageLoader/LoadingSpinner';

import { getEventList } from '@/api/eventList';

const LIST_URL = 'https://skukiosk.netlify.app/events';

export default function KioskEventListPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        const serverPageNum = Math.max(0, page - 1);

        const res = await getEventList({
          eventCategory: 'ALL',
          pageNum: page,
          pageSize,
        });

        if (!mounted) return;

        const root = res?.data ? res.data : res;
        const payload = root?.data ?? root ?? {};
        const nextEvents = Array.isArray(payload.content) ? payload.content : [];
        setEvents(nextEvents);
        setTotalPages(Number(payload.totalPages) || 1);
      } catch (e) {
        if (!mounted) return;
        console.error(e);
        setEvents([]);
        setTotalPages(1);
        setErrorMsg('이벤트를 불러오지 못했어요');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [page]);

  return (
    <div className={styles.page}>
      <KioskHeader />

      <main className={styles.content}>
        {loading && (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner size={72} />
          </div>
        )}

        {!loading && errorMsg && <div className={styles.spinnerWrapper}>{errorMsg}</div>}

        {!loading && !errorMsg && events.length === 0 && (
          <div className={styles.spinnerWrapper}>표시할 이벤트가 없어요</div>
        )}

        {!loading && !errorMsg && events.length > 0 && (
          <>
            <section className={styles.grid}>
              {events.map((event) => (
                <KioskEventCard key={event.eventId} event={event} />
              ))}
            </section>

            <div className={styles.paginationWrap}>
              <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
