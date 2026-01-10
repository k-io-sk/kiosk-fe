import styles from './KioskFooter.module.css';
import QrCode from '@global/qr/QrCode';

const LIST_URL = 'https://skukiosk.netlify.app/events';

export default function KioskFooter({ text = '모바일로 이동하시면 더 많은 행사를 확인하실 수 있습니다!' }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />

      <div className={styles.inner}>
        <p className={styles.text}>{text}</p>

        <div className={styles.qr}>
          <QrCode value={LIST_URL} size={70} />
        </div>
      </div>
    </footer>
  );
}
