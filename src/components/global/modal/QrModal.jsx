import styles from './QrModal.module.css';
import QrCode from '@global/qr/QrCode';

export default function QrModal({ open, onClose, value }) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type='button' className={styles.close} onClick={onClose}>
          ×
        </button>

        <div className={styles.qrWrapper}>
          <span className={`${styles.corner} ${styles.tl}`} />
          <span className={`${styles.corner} ${styles.tr}`} />
          <span className={`${styles.corner} ${styles.bl}`} />
          <span className={`${styles.corner} ${styles.br}`} />

          <div className={styles.qrBox}>
            <QrCode value={value} size={490} />
          </div>
        </div>

        <p className={styles.text}>QR코드를 화면에 맞춰주세요.</p>
      </div>
    </div>
  );
}
