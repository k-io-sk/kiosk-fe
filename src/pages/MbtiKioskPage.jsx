import { useState, useEffect } from 'react';
import MbtiCard from '../components/mbtiKiosk/MbtiCard';
import MbtiInfoText from '../components/mbtiKiosk/MbtiInfoText';
import MbtiResult from '../components/mbtiKiosk/MbtiResult';
import styles from './MbtiKioskPage.module.css';

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

  const dummyResults = [
    {
      title: '가을의 햇살 1',
      description: '감성적인 F / N 타입에게 딱 맞는 야간 감성 플리마켓!',
    },
    {
      title: '가을의 햇살 2',
      description: 'T / J 타입을 위한 계획적인 종로구 문화 탐방 코스',
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const MBTI_LIST = isMobile ? MBTI_LIST_MOBILE : MBTI_LIST_DESKTOP;

  const handleToggle = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      const opposite = OPPOSITE_MAP[type];
      return [...prev.filter((t) => t !== opposite), type];
    });
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.more}>더 많은 이벤트 보러가기</div>
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

          <button className={styles.submitButton} onClick={handleSubmit}>
            추천 결과
          </button>

          {!showResult && <MbtiInfoText />}

          {showResult && (
            <div className={styles.resultSection}>
              <MbtiResult resultList={dummyResults} onBack={handleBack} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MbtiKioskPage;
