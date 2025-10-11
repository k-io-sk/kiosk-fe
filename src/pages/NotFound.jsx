import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>페이지를 찾을 수 없습니다.</p>
      <Link to='/' className={styles.link}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
