import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './KioskEventListPage.module.css';
import KioskHeader from '@/components/global/header/KioskHeader';
import KioskEventCard from '@/components/eventListPage/KioskEventCard';
import Pagination from '@/components/eventListPage/Pagination';
import FilterBar from '@/components/eventListPage/FilterBar';
import LoadingSpinner from '@global/pageLoader/LoadingSpinner';

import { getEventList } from '@/api/eventList';

export default function KioskEventListPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [categoryLabel, setCategoryLabel] = useState('전체');

  const categoryMap = {
    전체: 'ALL',
    공연: 'SHOW',
    전시: 'EXHIBITION',
    축제: 'FESTIVAL',
    '교육/강좌': 'EDUEXP',
    기타: 'ETC',
  };

  const handleFilterChange = (label) => {
    setCategoryLabel(label);
    setPage(1);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        const res = await getEventList({
          eventCategory: categoryMap[categoryLabel] ?? 'ALL',
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
  }, [page, categoryLabel]);

  return (
    <div className={styles.page}>
      <KioskHeader />

      <main className={styles.content}>
        <FilterBar
          selectedCategoryLabel={categoryLabel}
          onFilterChange={handleFilterChange}
          className={styles.kioskFilter}
        />

        {loading && (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner size={72} />
          </div>
        )}

        {!loading && errorMsg && <div className={styles.spinnerWrapper}>{errorMsg}</div>}

        {!loading && !errorMsg && events.length === 0 && (
          <div className={styles.emptyWrapper}>
            해당 카테고리에 등록된 행사가 없습니다.
            <br />
            다른 카테고리를 선택해 주세요.
          </div>
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
