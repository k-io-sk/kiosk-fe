import styles from './UnavailableModal.module.css';

export default function UnavailableModal({
  open,
  title,
  buttonText = '확인',
  onClose,
  onConfirm,
  width = '40rem',
  height = '20rem',
  titleTop = '6rem',
}) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} role='dialog' aria-modal='true' aria-label='사용 불가 안내' onClick={onClose}>
      <div className={styles.modal} style={{ width, height }} onClick={(e) => e.stopPropagation()}>
        <p className={styles.modalTitle} style={{ top: titleTop }}>
          {title}
        </p>

        <button type='button' className={styles.modalBtn} onClick={onConfirm}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
