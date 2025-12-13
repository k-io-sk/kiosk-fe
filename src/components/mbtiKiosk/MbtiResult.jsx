import styles from './MbtiResult.module.css';
import QrCode from '@global/qr/QrCode';

const MbtiResult = ({ resultList, topQrUrl, onBack, qrSize }) => {
  return (
    <section className={styles.resultWrap}>
      <div className={styles.noticeRow}>
        {topQrUrl && <QrCode value={topQrUrl} size={qrSize} />}
        <div className={styles.notice}>
          <p>※ 추천 결과는 모바일에서 바로 확인할 수 있어요!</p>
          <p>추천 리스트와 상세 페이지까지 모두 제공합니다.</p>
        </div>
      </div>

      <div className={styles.cardsRow}>
        {resultList.map((item, index) => (
          <div key={item.eventId ?? index} className={styles.card}>
            <div className={styles.thumbnail}>
              <img src={item.imageUrl} alt={item.title} className={styles.thumbnailImg} loading='lazy' />
            </div>

            <div className={styles.cardTitle}>{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MbtiResult;
