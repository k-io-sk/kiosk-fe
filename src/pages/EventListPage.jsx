import { EventCard, FilterBar, Pagination, EventRecommend } from '@components/eventListPage';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEventList } from '@hooks/useEventList';
import { useEventRecommend } from '@hooks/useEventRecommend';
import styles from './EventListPage.module.css';
import isMobileDevice from '@utils/isMobileDevice';

export default function EventListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const presetCategory = location.state?.presetCategory || 'ALL';
  const presetKeyword = location.state?.keyword || '';

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL = searchParams.get('category') || location.state?.presetCategory || 'ALL';
  const keywordFromURL = searchParams.get('q') || location.state?.keyword || '';
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
    축제: 'FESTIVAL',
    '교육/강좌': 'EDUEXP',
    기타: 'ETC',
  };

  const reverseCategoryMap = {
    ALL: '전체',
    SHOW: '공연',
    EXHIBITION: '전시',
    FESTIVAL: '축제',
    EDUEXP: '교육/강좌',
    ETC: '기타',
  };

  const { events, totalPages } = useEventList({
    category: selectedCategory,
    page: currentPage,
    size: pageSize,
    keyword,
  });

  const { events: recommendEvents, loading } = useEventRecommend({
    mode: 'random',
    requestKey: 1,
  });

  useEffect(() => {
    if (presetKeyword !== keyword) {
      setKeyword(presetKeyword);
      setCurrentPage(1);
    }
  }, [presetKeyword]);

  const syncURL = (next) => {
    // next: { category, q, page }
    setSearchParams(
      {
        category: next.category ?? selectedCategory,
        q: next.q ?? keyword,
        page: String(next.page ?? currentPage),
      },
      { replace: false },
    );
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

  return (
    <div className={styles.page}>
      {isMobileDevice() && <EventRecommend events={recommendEvents} />}

      <FilterBar onFilterChange={handleFilterChange} selectedCategoryLabel={reverseCategoryMap[selectedCategory]} />
      <div className={styles.container}>
        <div className={styles.grid}>
          {events.map((event, index) => (
            <div
              key={event.id || index}
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
