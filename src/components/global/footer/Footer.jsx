import styles from './Footer.module.css';
import witLogo from '@/assets/images/wit.webp';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={witLogo} alt='Witglobal 로고' className={styles.logo} />

        <div className={styles.textBox}>
          <p className={styles.copyright}>© Witglobal with Heejun, Sieon, Jiu, Chaerin</p>

          <p className={styles.notice}>
            본 서비스는 서울특별시 문화본부 문화정책과가 제공한
            <br />
            ‘서울시 문화행사 정보’(공공누리 제1유형) 데이터를 활용하여 재가공한 것입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
