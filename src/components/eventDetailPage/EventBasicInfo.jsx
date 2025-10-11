// 전시 기본 정보
import SectionWrapper from '../global/sectionWrapper/SectionWrapper';
import styles from './EventBasicInfo.module.css';
import artweekPoster from '@assets/images/artweek.png';

export default function EventBasicInfo({ data }) {
  const { mainImage, title, location, startDate, endDate, eventTime, recruitTarget, price, inquiry, eventCategory } =
    data || {};

  const safe = (v) => (v && v !== '' ? v : '-');

  return (
    <SectionWrapper>
      <section className={styles.wrap} aria-labelledby='event-basic-title'>
        {/* 포스터 */}
        <div className={styles.posterCard}>
          <img src={safe(mainImage) !== '-' ? mainImage : artweekPoster} alt={`${safe(title)} 포스터`} />
        </div>

        {/* 기본 정보 */}
        <div className={styles.info}>
          <h2 id='event-basic-title' className={styles.title}>
            {safe(title)}
          </h2>

          <dl className={styles.meta}>
            <div>
              <dt>장소</dt>
              <dd>{safe(location)}</dd>
            </div>
            <div>
              <dt>기간</dt>
              <dd>
                {safe(startDate)} ~ {safe(endDate)} {safe(eventTime)}
              </dd>
            </div>
            <div>
              <dt>모집대상</dt>
              <dd>{safe(recruitTarget)}</dd>
            </div>
            <div>
              <dt>기본가</dt>
              <dd>{safe(price)}</dd>
            </div>
            <div>
              <dt>문의</dt>
              <dd>{safe(inquiry)}</dd>
            </div>
            <div>
              <dt>비고</dt>
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
