import styles from './MbtiResultCard.module.css';

const MbtiResultCard = ({ title, place, period, time, target, fee, tag, imageUrl, onClickDetail }) => {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <img src={imageUrl} alt={title} className={styles.thumbnail} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>

        <ul className={styles.metaList}>
          <li>
            <span className={styles.label}>장소</span>
            <span>{place}</span>
          </li>
          <li>
            <span className={styles.label}>기간</span>
            <span>{period}</span>
          </li>
          <li>
            <span className={styles.label}>시간</span>
            <span>{time}</span>
          </li>
          <li>
            <span className={styles.label}>대상</span>
            <span>{target}</span>
          </li>
          <li>
            <span className={styles.label}>요금</span>
            <span>{fee}</span>
          </li>
          <li>
            <span className={styles.label}>태그</span>
            <span>{tag}</span>
          </li>
        </ul>

        <button type='button' className={styles.detailButton} onClick={onClickDetail}>
          자세히 보기
        </button>
      </div>
    </article>
  );
};

export default MbtiResultCard;
