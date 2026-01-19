import { useState } from 'react';
import styles from './MbtiResult.module.css';
import QrCode from '@global/qr/QrCode';
import QrModal from '@global/modal/QrModal';

const MbtiResult = ({ resultList, topQrUrl, onBack, qrSize }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.resultWrap}>
      <div className={styles.noticeRow}>
        <button
          type='button'
          className={styles.topQrBtn}
          onClick={() => topQrUrl && setOpen(true)}
          aria-label='추천 결과 QR 크게 보기'
          disabled={!topQrUrl}
        >
          <QrCode value={topQrUrl} size={110} />
        </button>

        <p className={styles.noticeText}>
          <span className={styles.arrow}>→</span> QR 클릭!
          <br />
          모바일에서 확인하기
        </p>
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

      <QrModal open={open} onClose={() => setOpen(false)} value={topQrUrl} />
    </section>
  );
};

export default MbtiResult;
