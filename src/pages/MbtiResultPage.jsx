import MbtiResultCard from '../components/mbtiResultPage/MbtiResultCard';
import styles from './MbtiResultPage.module.css';
import resultPoster from '../assets/images/resultPoster.png';

const MOCK_EVENTS = [
  {
    id: 1,
    title: '가을의 랩소디',
    place: '공예박물관 예술극장',
    period: '2025-09-27 ~ 2025-09-27',
    time: '16:00',
    target: '만 5세 이상',
    fee: '유료',
    tag: 'E02-0229',
    imageUrl: resultPoster,
  },
  {
    id: 2,
    title: '가을의 랩소디',
    place: '공예박물관 예술극장',
    period: '2025-09-27 ~ 2025-09-27',
    time: '16:00',
    target: '만 5세 이상',
    fee: '유료',
    tag: 'E02-0229',
    imageUrl: resultPoster,
  },
];

const MbtiResultPage = () => {
  const handleClickDetail = (eventId) => {
    console.log('go to detail:', eventId);
  };

  const handleClickMoreEvents = () => {
    console.log('go to event list');
  };

  const handleClickShare = () => {
    console.log('share test result');
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h2 className={styles.title}>추천 이벤트</h2>
          <p className={styles.description}>추천 결과 설명 추천 결과 설명 추천 결과 설명</p>
        </div>
      </section>

      <div className={`${styles.container} ${styles.body}`}>
        <section className={styles.listSection}>
          {MOCK_EVENTS.map((event) => (
            <MbtiResultCard key={event.id} {...event} onClickDetail={() => handleClickDetail(event.id)} />
          ))}
        </section>

        <section className={styles.actions}>
          <button type='button' className={styles.eventListButton} onClick={handleClickMoreEvents}>
            인사동 이벤트 더 알아보기
          </button>

          <button type='button' className={styles.shareButton} onClick={handleClickShare}>
            테스트 공유하기
          </button>
        </section>
      </div>
    </div>
  );
};

export default MbtiResultPage;
