import SectionWrapper from '../global/sectionWrapper/SectionWrapper';
import styles from './EventBasicInfo.module.css';
import artweekPoster from '@assets/images/artweek.png';

export default function EventBasicInfo({ data, kiosk = false }) {
  const {
    mainImage,
    title,
    location,
    startDate,
    endDate,
    eventTime,
    recruitTarget,
    price,
    inquiry,
    description,
    orgLink,
    isFree,
  } = data || {};

  const hasValue = (v) => v !== null && v !== undefined && String(v).trim() !== '';

  const openLink = (url) => {
    if (!hasValue(url)) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <SectionWrapper>
      <section className={`${styles.wrap} ${kiosk ? styles.kioskWrap : ''}`} aria-labelledby='event-basic-title'>
        {/* 포스터 */}
        <div className={`${styles.posterCard} ${kiosk ? styles.kioskPosterCard : ''}`}>
          <img
            src={hasValue(mainImage) ? mainImage : artweekPoster}
            alt={`${hasValue(title) ? title : '이벤트'} 포스터`}
            loading='lazy'
            decoding='async'
          />
        </div>

        {/* 기본 정보 */}
        <div className={`${styles.info} ${kiosk ? styles.kioskInfo : ''}`}>
          <h2 id='event-basic-title' className={`${styles.title} ${kiosk ? styles.kioskTitle : ''}`}>
            {hasValue(title) ? title : '제목 없음'}
          </h2>

          <dl className={`${styles.meta} ${kiosk ? styles.kioskMeta : ''}`}>
            {hasValue(location) && (
              <div>
                <dt>장소</dt>
                <dd>{location}</dd>
              </div>
            )}

            {(hasValue(startDate) || hasValue(endDate)) && (
              <div>
                <dt>기간</dt>
                <dd className={styles.period}>
                  <span className={styles.date}>
                    {hasValue(startDate) ? startDate : ''} ~ {hasValue(endDate) ? endDate : ''}
                  </span>
                  {hasValue(eventTime) && (
                    <span className={`${styles.time} ${kiosk ? styles.kioskTime : ''}`}>{eventTime}</span>
                  )}
                </dd>
              </div>
            )}

            {hasValue(recruitTarget) && (
              <div>
                <dt>모집대상</dt>
                <dd>{recruitTarget}</dd>
              </div>
            )}

            {(hasValue(price) || isFree) && (
              <div>
                <dt>기본가</dt>
                <dd>{isFree ? '무료' : price}</dd>
              </div>
            )}

            {hasValue(inquiry) && (
              <div>
                <dt>문의</dt>
                <dd>{inquiry}</dd>
              </div>
            )}

            {hasValue(description) && (
              <div>
                <dt>비고</dt>
                <dd>{description}</dd>
              </div>
            )}
          </dl>

          {!kiosk && hasValue(orgLink) && (
            <div className={styles.actions}>
              <button type='button' className={styles.btn} onClick={() => openLink(orgLink)}>
                홈페이지
              </button>
            </div>
          )}
        </div>
      </section>
    </SectionWrapper>
  );
}
