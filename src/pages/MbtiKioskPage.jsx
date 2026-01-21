import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import MbtiCard from '../components/mbtiKiosk/MbtiCard';
import MbtiInfoText from '../components/mbtiKiosk/MbtiInfoText';
import MbtiResult from '../components/mbtiKiosk/MbtiResult';
import styles from './MbtiKioskPage.module.css';
import { useEventRecommend } from '../hooks/useEventRecommend';
import LoadingSpinner from '@global/pageLoader/LoadingSpinner';
import { useKioskUI } from '@/contexts/KioskUIContext';

const MBTI_LIST_DESKTOP = [
  { type: 'E', label: '외향적' },
  { type: 'N', label: '상상적' },
  { type: 'F', label: '감성적' },
  { type: 'P', label: '즉흥적' },
  { type: 'I', label: '내향적' },
  { type: 'S', label: '경험적' },
  { type: 'T', label: '이성적' },
  { type: 'J', label: '계획적' },
];

const MBTI_LIST_MOBILE = [
  { type: 'E', label: '외향적' },
  { type: 'I', label: '내향적' },
  { type: 'N', label: '상상적' },
  { type: 'S', label: '경험적' },
  { type: 'F', label: '감성적' },
  { type: 'T', label: '이성적' },
  { type: 'P', label: '즉흥적' },
  { type: 'J', label: '계획적' },
];

const OPPOSITE_MAP = {
  E: 'I',
  I: 'E',
  S: 'N',
  N: 'S',
  T: 'F',
  F: 'T',
  J: 'P',
  P: 'J',
};

const MbtiKioskPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [requestKey, setRequestKey] = useState(null);
  const [requestedMbti, setRequestedMbti] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const region = (searchParams.get('region') || 'JONGNO').toUpperCase();

  const mbti = useMemo(() => {
    const pick = (a, b) => (selectedTypes.includes(a) ? a : selectedTypes.includes(b) ? b : '');
    const ei = pick('E', 'I');
    const sn = pick('S', 'N');
    const tf = pick('T', 'F');
    const jp = pick('J', 'P');
    const result = `${ei}${sn}${tf}${jp}`;
    return result.length === 4 ? result : '';
  }, [selectedTypes]);

  const {
    events: recommendEvents,
    loading,
    error,
  } = useEventRecommend({
    mbti: requestedMbti,
    region,
    requestKey,
    mode: 'mbti',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const MBTI_LIST = isMobile ? MBTI_LIST_MOBILE : MBTI_LIST_DESKTOP;

  const handleToggle = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      const opposite = OPPOSITE_MAP[type];
      return [...prev.filter((t) => t !== opposite), type];
    });
  };

  const handleSubmit = () => {
    if (loading) return;

    if (!mbti) {
      alert('MBTI 4글자를 모두 선택해 주세요!');
      return;
    }

    setShowResult(true);
    setRequestedMbti(mbti);
    setRequestKey((k) => (k === null ? 1 : k + 1));
  };

  const handleBack = () => setShowResult(false);

  const base = window.location.origin;

  const resultList = (recommendEvents || []).map((item) => ({
    title: item.title,
    description: '',
    eventId: item.eventId,
    imageUrl: item.mainImage,
    qrUrl: item.eventId ? `${base}/mbti/result?eventIds=${item.eventId}` : null,
  }));

  const topQrUrl = useMemo(() => {
    const eventIds = resultList
      .map((e) => e.eventId)
      .filter(Boolean)
      .slice(0, 2);

    if (eventIds.length === 0) return null;

    const query = eventIds.map((id) => `eventIds=${id}`).join('&');
    return `${base}/mbti/result?${query}`;
  }, [resultList, base]);

  const isReady = Boolean(mbti);
  const isLoading = loading;

  const buttonText = useMemo(() => {
    if (isLoading) return '결과 로딩중..';
    return '추천 결과 보기';
  }, [isLoading]);

  const { setHideFooter } = useKioskUI();

  useEffect(() => {
    setHideFooter(showResult);
    return () => setHideFooter(false);
  }, [showResult, setHideFooter]);

  return (
    <div className={`${styles.page} ${!isMobile ? styles.kiosk : ''}`}>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.mbtiGrid}>
            {MBTI_LIST.map((item) => (
              <MbtiCard
                key={item.type}
                type={item.type}
                label={item.label}
                selected={selectedTypes.includes(item.type)}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <button
            className={[
              styles.submitButton,
              !isReady ? styles.disabled : '',
              showResult && !isLoading ? styles.active : '',
              isLoading ? styles.loading : '',
            ].join(' ')}
            onClick={handleSubmit}
            disabled={!isReady || isLoading}
          >
            {isLoading && <span className={styles.btnSpinner} aria-hidden='true' />}
            {buttonText}
          </button>

          {!showResult && <MbtiInfoText />}

          {showResult && (
            <div className={styles.resultSection}>
              {isLoading && (
                <div className={styles.spinnerWrapper}>
                  <LoadingSpinner size={100} />
                </div>
              )}

              {error && (
                <div className={`${styles.spinnerWrapper} ${styles.errorText}`}>추천 결과를 불러오지 못했어요</div>
              )}

              {!isLoading && !error && (
                <MbtiResult
                  resultList={resultList}
                  topQrUrl={topQrUrl}
                  onBack={handleBack}
                  qrSize={isMobile ? 50 : 80}
                />
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MbtiKioskPage;
