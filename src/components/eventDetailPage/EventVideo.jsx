// 홍보 영상
import SectionWrapper from '../global/sectionWrapper/SectionWrapper';
import styles from './EventVideo.module.css';

export default function EventVideo() {
  const dummyVideo = {
    title: 'IAW2025',
    caption: '2025 인사아트위크 홍보영상',
  };

  return (
    <SectionWrapper>
      <section className={styles.wrap}>
        <div className={styles.videoBox}>
          <div className={styles.thumbnail}>
            <span className={styles.videoTitle}>{dummyVideo.title}</span>
            <div className={styles.playButton}>▶</div>
          </div>
        </div>
        <p className={styles.caption}>{dummyVideo.caption}</p>
      </section>
    </SectionWrapper>
  );
}
