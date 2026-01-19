import { useState } from 'react';
import styles from './KioskFooter.module.css';
import QrCode from '@global/qr/QrCode';
import QrModal from '@global/modal/QrModal';

const LIST_URL = 'https://skukiosk.netlify.app/events';

export default function KioskFooter() {
  const [open, setOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          QR 클릭! ←
          <br />
          모바일에서 확인하기
        </p>

        <button type='button' className={styles.qrBtn} onClick={() => setOpen(true)} aria-label='QR 크게 보기'>
          <div className={styles.qr}>
            <QrCode value={LIST_URL} size={115} />
          </div>
        </button>
      </div>
      <QrModal open={open} onClose={() => setOpen(false)} value={LIST_URL} />
    </footer>
  );
}
