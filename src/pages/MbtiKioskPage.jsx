import { useState, useEffect, useMemo } from 'react';
import MbtiCard from '../components/mbtiKiosk/MbtiCard';
import MbtiInfoText from '../components/mbtiKiosk/MbtiInfoText';
import MbtiResult from '../components/mbtiKiosk/MbtiResult';
import styles from './MbtiKioskPage.module.css';
import { useEventRecommend } from '../hooks/useEventRecommend';
import LoadingSpinner from '@global/pageLoader/LoadingSpinner';
import QrCode from '@global/qr/QrCode';
import logoImg from '@/assets/images/jongno_black.png';

const LIST_URL = 'https://skukiosk.netlify.app/events';

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

  const resultList = (recommendEvents || []).map((item) => ({
    title: item.title,
    description: '',
    eventId: item.eventId,
    imageUrl: item.mainImage,
  }));

  const topQrUrl = useMemo(() => {
    const base = window.location.origin;
    const eventIds = resultList
      .map((e) => e.eventId)
      .filter(Boolean)
      .slice(0, 2);

    if (eventIds.length === 0) return null;

    const query = eventIds.map((id) => `eventIds=${id}`).join('&');
    return `${base}/mbti/result?${query}`;
  }, [resultList]);

  return (
    <div className={`${styles.page} ${!isMobile ? styles.kiosk : ''}`}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} alt='IN:JONGNO 로고' className={styles.logoImg} />
        </div>

        <div className={styles.moreBox}>
          <div className={styles.more}>더 많은 이벤트 보러가기</div>
          <QrCode value={LIST_URL} size={isMobile ? 50 : 150} />
        </div>
      </header>

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

          <button className={styles.submitButton} onClick={handleSubmit} disabled={!mbti || loading}>
            {loading ? '결과 불러오는 중...' : '추천 결과 보기'}
          </button>

          {!showResult && <MbtiInfoText />}

          {showResult && (
            <div className={styles.resultSection}>
              {loading && (
                <div className={styles.spinnerWrapper}>
                  <LoadingSpinner size={56} />
                </div>
              )}

              {error && <div className={styles.spinnerWrapper}>추천 결과를 불러오지 못했어요</div>}

              {!loading && !error && (
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
