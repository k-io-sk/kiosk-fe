import { useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MbtiResultCard from '../components/mbtiResultPage/MbtiResultCard';
import styles from './MbtiResultPage.module.css';
import { useEventRecommendSummary } from '@hooks/useEventRecommendSummary';
import { shareMbtiResult } from '@/utils/kakao/shareMbtiResult';
import { getRegionConfig, DEFAULT_REGION_KEY } from '@config/kioskConfig';

const MbtiResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const regionKey = useMemo(() => searchParams.get('region') || DEFAULT_REGION_KEY, [searchParams]);
  const regionLabel = useMemo(() => getRegionConfig(regionKey).label, [regionKey]);

  useEffect(() => {
    const currentRegion = searchParams.get('region');

    if (!currentRegion) {
      const params = new URLSearchParams(searchParams);
      params.set('region', regionKey);

      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [searchParams, regionKey, navigate]);

  const eventIds = useMemo(() => {
    return searchParams
      .getAll('eventIds')
      .map((v) => Number(v))
      .filter((n) => Number.isFinite(n) && n > 0);
  }, [searchParams]);

  const requestKey = 1;
  const { summary, loading, error } = useEventRecommendSummary(eventIds, requestKey);

  const cards = useMemo(() => {
    return (summary || []).map((e) => ({
      id: e.eventId,
      title: e.title,
      place: e.location,
      period: `${e.startDate} ~ ${e.endDate}`,
      time: e.eventTime,
      target: e.recruitTarget,
      fee: e.price || '무료',
      tag: e.inquiry || '',
      imageUrl: e.mainImage,
    }));
  }, [summary]);

  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('region', regionKey);

    return `${window.location.origin}/mobile/mbti/result?${params.toString()}`;
  }, [searchParams, regionKey]);

  const handleKakaoShare = useCallback(async () => {
    try {
      const shareUrl = buildShareUrl();
      const imageUrl = cards?.[0]?.imageUrl ?? `${window.location.origin}/og-image.png`;

      await shareMbtiResult({ shareUrl, imageUrl, regionKey });
    } catch (e) {
      console.error(e);
      alert('카카오 공유 실패');
    }
  }, [buildShareUrl, cards, regionKey]);

  const handleClickDetail = useCallback(
    (eventId) => {
      navigate(`/events/${eventId}?region=${regionKey}`);
    },
    [navigate],
  );

  const handleClickMoreEvents = useCallback(() => {
    navigate(`/events?region=${regionKey}`);
  }, [navigate, regionKey]);

  if (!eventIds.length) {
    return (
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h2 className={styles.title}>추천 이벤트</h2>
            <p className={styles.description}>선택하신 결과를 바탕으로 추천된 이벤트예요</p>
          </div>
        </section>

        <div className={`${styles.container} ${styles.centerWrap}`}>
          <div className={styles.centerText}>추천 결과 정보가 없어요</div>
        </div>

        <section className={styles.actions}>
          <button type='button' className={styles.eventListButton} onClick={handleClickMoreEvents}>
            {regionLabel} 이벤트 더 알아보기
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2 className={styles.title}>추천 이벤트</h2>
          <p className={styles.description}>선택하신 결과를 바탕으로 추천된 이벤트예요</p>
        </div>
      </section>

      <div className={`${styles.container} ${styles.body}`}>
        {loading && (
          <div className={styles.centerWrap}>
            <div className={styles.centerText}>추천 결과 불러오는 중...</div>
          </div>
        )}

        {!loading && error && (
          <div className={styles.centerWrap}>
            <div className={styles.centerText}>추천 결과를 불러오지 못했어요</div>
          </div>
        )}

        {!loading && !error && cards.length === 0 && (
          <div className={styles.centerWrap}>
            <div className={styles.centerText}>추천 결과가 없어요.</div>
          </div>
        )}

        {!loading && !error && cards.length > 0 && (
          <section className={styles.listSection}>
            {cards.map((event) => (
              <MbtiResultCard key={event.id} {...event} onClickDetail={() => handleClickDetail(event.id)} />
            ))}
          </section>
        )}

        <section className={styles.actions}>
          <button type='button' className={styles.eventListButton} onClick={handleClickMoreEvents}>
            {regionLabel} 이벤트 더 알아보기
          </button>

          <button type='button' className={styles.shareButton} onClick={handleKakaoShare}>
            테스트 공유하기
          </button>
        </section>
      </div>
    </div>
  );
};

export default MbtiResultPage;
