import styles from './Footer.module.css';
import locationIcon from '@assets/images/location.png';
import phoneIcon from '@assets/images/phone.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>LOGO</div>

        <div className={styles.siteInfo}>
          <nav className={styles.nav}>
            <a href='#'>개인정보처리방침</a>
            <a href='#'>저작권정책</a>
            <a href='#'>안전신문고</a>
            <a href='#'>도로명주소안내</a>
          </nav>

          <div className={styles.contactInfo}>
            <img src={locationIcon} alt='' className={styles.iconImg} />
            <span>(우)04535 서울 중구 소공로 70, 서울광장위쪽(포스트타워) 15층, 12345</span>
            <img src={phoneIcon} alt='' className={styles.iconImg} />
            <span>02-6450-3800</span>
          </div>

          <p className={styles.copy}>
            © Cultural Heritage Administration Royal Palaces and Tombs Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
