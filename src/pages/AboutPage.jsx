import styles from './AboutPage.module.css';
import KakaoMapSection from '../components/aboutPage/KakaoMapSection';
import { FiMapPin, FiSearch, FiFileText, FiShuffle } from 'react-icons/fi';

export default function AboutPage() {
  const kioskPlaces = [
    {
      name: '북인사마당 키오스크',
      lat: 37.57436,
      lng: 126.98574,
    },
    {
      name: '안녕인사동 키오스크',
      lat: 37.57384,
      lng: 126.9851,
    },
    {
      name: '인사아트프라자 키오스크',
      lat: 37.57329,
      lng: 126.98459,
    },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>소개</h1>

      <section className={styles.section}>
        <p className={styles.desc}>
          종로구에서 열리는 <strong>공연·전시·축제·교육 행사</strong>를 한눈에 확인할 수 있는 문화 이벤트 안내
          서비스입니다.
        </p>
        <p className={styles.desc}>
          원하는 이벤트를 빠르게 검색하고, 카테고리별로 정리된 추천을 통해 나에게 맞는 행사를 쉽게 찾아보세요.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>주요 기능</h2>
        <ul className={styles.list}>
          <li>
            <FiMapPin className={styles.icon} />
            <span className={styles.text}>전체 이벤트 탐색 및 카테고리별 정리</span>
          </li>
          <li>
            <FiSearch className={styles.icon} />
            <span className={styles.text}>키워드 기반 빠른 검색</span>
          </li>
          <li>
            <FiFileText className={styles.icon} />
            <span className={styles.text}>이벤트 상세 정보 제공 (장소, 일시, 가격, 지도)</span>
          </li>
          <li>
            <FiShuffle className={styles.icon} />
            <span className={styles.text}>모바일 전용 랜덤 이벤트 추천</span>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subtitle}>인사동 키오스크</h2>
        <p className={styles.desc}>
          인사동에 설치된 키오스크에서는 <strong>MBTI 기반 맞춤형 이벤트 추천</strong>을 제공합니다.
        </p>
        <p className={styles.desc}>
          키오스크에 오셔서 MBTI를 입력하면, 나의 성향에 맞는 공연·전시·축제를 추천해드립니다.
        </p>

        <div className={styles.mapWrap}>
          <KakaoMapSection
            title='인사동 키오스크 위치'
            addressLabel='북인사마당 · 안녕인사동 · 인사아트프라자'
            places={kioskPlaces}
            level={4}
          />
        </div>
      </section>
    </div>
  );
}
