import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './KioskEventListPage.module.css';
import KioskEventCard from '@/components/eventListPage/KioskEventCard';
import Pagination from '@/components/eventListPage/Pagination';
import FilterBar from '@/components/eventListPage/FilterBar';
import LoadingSpinner from '@global/pageLoader/LoadingSpinner';
import { getEventList } from '@/api/eventList';

export default function KioskEventListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const region = searchParams.get('region');
    const category = searchParams.get('category');
    const page = searchParams.get('page');

    if (!region || !category || !page) {
      setSearchParams(
        {
          region: region ?? 'jongno',
          category: category ?? 'ALL',
          page: page ?? '1',
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  const regionParam = (searchParams.get('region') || 'jongno').toLowerCase();
  const eventRegion = useMemo(() => (regionParam === 'insa' ? 'INSA' : 'JONGNO'), [regionParam]);

  const categoryFromURL = (searchParams.get('category') || 'ALL').toUpperCase();
  const pageFromURL = Number(searchParams.get('page') || 1);

  const reverseCategoryMap = {
    ALL: '전체',
    SHOW: '공연',
    EXHIBITION: '전시',
    ETC: '기타',
  };

  const categoryMap = {
    전체: 'ALL',
    공연: 'SHOW',
    전시: 'EXHIBITION',
    기타: 'ETC',
  };

  const [categoryLabel, setCategoryLabel] = useState(reverseCategoryMap[categoryFromURL] ?? '전체');
  const [page, setPage] = useState(pageFromURL);

  const pageSize = 6;

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setCategoryLabel(reverseCategoryMap[categoryFromURL] ?? '전체');
    setPage(pageFromURL);
  }, [categoryFromURL, pageFromURL, eventRegion]);

  const syncURL = (next) => {
    const nextCategory = (next.category ?? categoryFromURL).toUpperCase();
    const nextPage = String(next.page ?? page);

    setSearchParams(
      {
        region: regionParam,
        category: nextCategory,
        page: nextPage,
      },
      { replace: false },
    );
  };

  const handleFilterChange = (label) => {
    const mapped = categoryMap[label] ?? 'ALL';
    setCategoryLabel(label);
    setPage(1);
    syncURL({ category: mapped, page: 1 });
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    syncURL({ page: nextPage });
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        const res = await getEventList({
          eventRegion,
          eventCategory: categoryFromURL,
          pageNum: page,
          pageSize,
        });

        if (!mounted) return;

        const payload = res?.data ?? {};
        setEvents(Array.isArray(payload.content) ? payload.content : []);
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
  }, [eventRegion, categoryFromURL, page]);

  return (
    <div className={styles.page}>
      {' '}
      <main className={styles.content}>
        <FilterBar
          selectedCategoryLabel={categoryLabel}
          onFilterChange={handleFilterChange}
          className={styles.kioskFilter}
          categories={['전체', '공연', '전시', '기타']}
        />
        {loading && (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner size={180} />
          </div>
        )}


        {!loading && errorMsg && <div className={`${styles.spinnerWrapper} ${styles.errorText}`}>{errorMsg}</div>}
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
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
                className={styles.kioskPagination}
              />{' '}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
