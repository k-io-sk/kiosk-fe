import { QRCodeCanvas } from 'qrcode.react';
import styles from './QrCode.module.css';

const QrCode = ({ value, label, size = 140 }) => {
  if (!value) return null;

  return (
    <div className={styles.wrap}>
      <QRCodeCanvas value={value} size={size} level='H' />
      {label && <p className={styles.label}>{label}</p>}
    </div>
  );
};

export default QrCode;
