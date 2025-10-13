// 상세 소개
import SectionWrapper from '../global/sectionWrapper/SectionWrapper';
import styles from './EventDescription.module.css';

export default function EventDescription({ data }) {
  const title = data?.title || '-';
  const period = data?.startDate && data?.endDate ? `${data.startDate} ~ ${data.endDate}` : '-';
  const location = data?.location || '-';
  const description = data?.description || '상세 설명이 없습니다.';

  return (
    <SectionWrapper>
      <section className={styles.wrap}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.meta}>
          <p>
            <strong>일시:</strong> {period}
          </p>
          <p>
            <strong>장소:</strong> {location}
          </p>
        </div>

        <p className={styles.desc}>{description}</p>
      </section>
    </SectionWrapper>
  );
}
