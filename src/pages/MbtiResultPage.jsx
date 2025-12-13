import { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MbtiResultCard from '../components/mbtiResultPage/MbtiResultCard';
import styles from './MbtiResultPage.module.css';
import { useEventRecommendSummary } from '@hooks/useEventRecommendSummary';

import { shareMbtiResult } from '@/utils/kakao/shareMbtiResult';

const MbtiResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const handleKakaoShare = async () => {
    try {
      const shareUrl = window.location.origin + window.location.pathname + '?' + searchParams.toString();

      const imageUrl = cards?.[0]?.imageUrl ?? 'https://skukiosk.netlify.app/og-image.png';

      await shareMbtiResult({ shareUrl, imageUrl });
    } catch (e) {
      console.error(e);
      alert('카카오 공유 실패');
    }
  };

  const handleClickDetail = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleClickMoreEvents = () => {
    navigate('/events');
  };

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
            인사동 이벤트 더 알아보기
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
