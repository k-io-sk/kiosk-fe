// 상세 소개
import SectionWrapper from '../global/sectionWrapper/SectionWrapper';
import styles from './EventDescription.module.css';

export default function EventDescription() {
  const dummyData = {
    title: '2025 인사아트위크',
    period: '2025년 6월 4일 ~ 6월 14일',
    location: '인사동 일대 참여 갤러리 자체 기획 전시',
    description: `
      2025 인사아트위크(Insa Art Week 2025)는 한국 예술의 중심지인 인사동에서 
      전통과 현대, 지역성과 세계가 교차하는 복합문화예술축제로, 
      오는 6월 4일(수)부터 11일간 개최됩니다.

      2023년과 2024년에 이어 ‘예술은 어디에나 있다 – Art takes alive!’라는 주제 아래, 
      도시 공간은 예술의 무대로 확장되며, 예술의 사회적 역할과 일상 속 감각을 재조명하고자 합니다.

      10곳의 갤러리를 방문해 엽서를 모아오시면
      추첨을 통해 소정의 상품을 드리는 이벤트도 진행 예정입니다.

      많은 관심과 참여 부탁드립니다!

      상품 받는 곳: 인사동홍보관 (종로구 인사동11길 19)
    `,
  };

  return (
    <SectionWrapper>
      <section className={styles.wrap}>
        <h2 className={styles.title}>&lt;{dummyData.title}&gt;</h2>

        <div className={styles.meta}>
          <p>
            <strong>일시:</strong> {dummyData.period}
          </p>
          <p>
            <strong>장소:</strong> {dummyData.location}
          </p>
        </div>

        <p className={styles.desc}>{dummyData.description}</p>
      </section>
    </SectionWrapper>
  );
}
