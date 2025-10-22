import { EventCard, FilterBar, Pagination } from '@components/eventListPage';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useEventList } from '@hooks/useEventList';
import styles from './EventListPage.module.css';

export default function EventListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const presetCategory = location.state?.presetCategory || 'ALL';
  const presetPeriod = location.state?.presetPeriod || 'ALL';
  const presetKeyword = location.state?.keyword || '';

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL = searchParams.get('category') || location.state?.presetCategory || 'ALL';
  const periodFromURL = searchParams.get('period') || location.state?.presetPeriod || 'ALL';
  const keywordFromURL = searchParams.get('q') || location.state?.keyword || '';
  const pageFromURL = Number(searchParams.get('page') || 1);

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [selectedPeriod, setSelectedPeriod] = useState(periodFromURL);
  const [keyword, setKeyword] = useState(keywordFromURL);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
    setSelectedPeriod(periodFromURL);
    setKeyword(keywordFromURL);
    setCurrentPage(pageFromURL);
  }, [categoryFromURL, periodFromURL, keywordFromURL, pageFromURL]);

  const pageSize = 8;

  const categoryMap = {
    전체: 'ALL',
    공연: 'SHOW',
    전시: 'EXHIBITION',
    축제: 'FESTIVAL',
    '교육/강좌': 'EDUEXP',
    기타: 'ETC',
  };
  const periodMap = {
    전체: 'ALL',
    오늘: 'TODAY',
    이번주: 'THIS_WEEK',
    이번달: 'THIS_MONTH',
  };

  const reverseCategoryMap = {
    ALL: '전체',
    SHOW: '공연',
    EXHIBITION: '전시',
    FESTIVAL: '축제',
    EDUEXP: '교육/강좌',
    ETC: '기타',
  };
  const reversePeriodMap = {
    ALL: '전체',
    TODAY: '오늘',
    THIS_WEEK: '이번주',
    THIS_MONTH: '이번달',
  };

  const { events, totalPages } = useEventList({
    category: selectedCategory,
    period: selectedPeriod,
    page: currentPage,
    size: pageSize,
    keyword,
  });

  useEffect(() => {
    if (presetKeyword !== keyword) {
      setKeyword(presetKeyword);
      setCurrentPage(1);
    }
  }, [presetKeyword]);

  const syncURL = (next) => {
    // next: { category, period, q, page }
    setSearchParams(
      {
        category: next.category ?? selectedCategory,
        period: next.period ?? selectedPeriod,
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

  const handleFilterChange = (categoryLabel, periodLabel) => {
    const mappedCategory = categoryMap[categoryLabel] || 'ALL';
    const mappedPeriod = periodMap[periodLabel] || 'ALL';

    setSelectedCategory(mappedCategory);
    setSelectedPeriod(mappedPeriod);
    setCurrentPage(1);
    syncURL({ category: mappedCategory, period: mappedPeriod, page: 1 });
  };

  return (
    <div className={styles.page}>
      <FilterBar
        onFilterChange={handleFilterChange}
        selectedCategoryLabel={reverseCategoryMap[selectedCategory]}
        selectedPeriodLabel={reversePeriodMap[selectedPeriod]}
      />
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
