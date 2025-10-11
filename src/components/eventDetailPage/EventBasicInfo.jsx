// 전시 기본 정보
import SectionWrapper from '../commons/sectionWrapper/SectionWrapper';
import styles from './EventBasicInfo.module.css';
import artweekPoster from '@assets/images/artweek.png'; 

export default function EventBasicInfo({
  posterSrc = artweekPoster,
  title = '2025 인사아트위크',
  location = '인사동 일대 참여',
  period = '2025-06-04 ~ 2025-06-14',
  target = '전체',
  submitWindow = '-',
  price = '-',
  contact = '-',
  note = '-',
}) {
  return (
    <SectionWrapper>
      <section className={styles.wrap} aria-labelledby='event-basic-title'>
        {/* 포스터 */}
        <div className={styles.posterCard}>
          {posterSrc ? (
            <img src={posterSrc} alt={`${title} 포스터`} />
          ) : (
            <div className={styles.posterPlaceholder}>포스터</div>
          )}
        </div>

        {/* 기본 정보 */}
        <div className={styles.info}>
          <h2 id='event-basic-title' className={styles.title}>
            {title}
          </h2>

          <dl className={styles.meta}>
            <div>
              <dt>장소</dt>
              <dd>{location}</dd>
            </div>
            <div>
              <dt>기간</dt>
              <dd>{period}</dd>
            </div>
            <div>
              <dt>모집대상</dt>
              <dd>{target}</dd>
            </div>
            <div>
              <dt>접수기간</dt>
              <dd>{submitWindow}</dd>
            </div>
            <div>
              <dt>기본가</dt>
              <dd>{price}</dd>
            </div>
            <div>
              <dt>문의</dt>
              <dd>{contact}</dd>
            </div>
            <div>
              <dt>비고</dt>
              <dd>{note}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <button type='button' className={styles.btn}>
              신청하기
            </button>
            <button type='button' className={styles.btn}>
              홈페이지
            </button>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
