import { EventCard, FilterBar, Pagination, EventRecommend } from '@components/eventListPage';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEventList } from '@hooks/useEventList';
import { useEventRecommend } from '@hooks/useEventRecommend';
import styles from './EventListPage.module.css';
import isMobileDevice from '@utils/isMobileDevice';
import PageLoader from '@components/global/pageLoader/PageLoader';

export default function EventListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const presetKeyword = location.state?.keyword || '';

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL = searchParams.get('category') || 'ALL';
  const keywordFromURL = searchParams.get('q') || '';
  const pageFromURL = Number(searchParams.get('page') || 1);

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [keyword, setKeyword] = useState(keywordFromURL);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
    setKeyword(keywordFromURL);
    setCurrentPage(pageFromURL);
  }, [categoryFromURL, keywordFromURL, pageFromURL]);

  const pageSize = 8;

  const categoryMap = {
    전체: 'ALL',
    공연: 'SHOW',
    전시: 'EXHIBITION',
    기타: 'ETC',
  };

  const reverseCategoryMap = {
    ALL: '전체',
    SHOW: '공연',
    EXHIBITION: '전시',
    ETC: '기타',
  };

  const { events, totalPages, loading } = useEventList({
    eventRegion: 'JONGNO',
    category: selectedCategory,
    page: currentPage,
    size: pageSize,
    keyword,
  });

  const { events: recommendEvents } = useEventRecommend({
    mode: 'random',
    requestKey: 1,
  });

  useEffect(() => {
    if (presetKeyword && presetKeyword !== keyword) {
      setKeyword(presetKeyword);
      setCurrentPage(1);

      const params = { category: selectedCategory, page: '1', q: presetKeyword };
      setSearchParams(params, { replace: false });
    }
  }, [presetKeyword]);

  const syncURL = (next) => {
    const nextCategory = next.category ?? selectedCategory;
    const nextQ = next.q ?? keyword;
    const nextPage = String(next.page ?? currentPage);

    const params = { category: nextCategory, page: nextPage };
    if (nextQ) params.q = nextQ;

    setSearchParams(params, { replace: false });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    syncURL({ page });
  };

  const handleFilterChange = (categoryLabel) => {
    const mappedCategory = categoryMap[categoryLabel] || 'ALL';

    setSelectedCategory(mappedCategory);
    setCurrentPage(1);
    syncURL({ category: mappedCategory, page: 1 });
  };

  if (loading) return <PageLoader />;

  return (
    <div className={styles.page}>
      {isMobileDevice() && <EventRecommend events={recommendEvents} />}

      <FilterBar
        onFilterChange={handleFilterChange}
        selectedCategoryLabel={reverseCategoryMap[selectedCategory]}
        categories={['전체', '공연', '전시', '기타']}
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          {events.map((event, index) => (
            <div
              key={event.eventId ?? event.id ?? index}
              onClick={() => navigate(`/events/${event.eventId}`)}
              style={{ cursor: 'pointer' }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
