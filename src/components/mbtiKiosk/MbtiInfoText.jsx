import styles from './MbtiInfoText.module.css';
import { useOutletContext } from 'react-router-dom';

const MbtiInfoText = () => {
  const { region } = useOutletContext();
  const isHwaseong = region.key === 'hwaseong';
  return (
    <div className={styles.textWrap}>
      <p>
        MBTI 성향과 취향을 반영해
        <br />
        <span
          className={styles.point}
          style={{
            color: region.primary,
            fontSize: '68px',
            fontWeight: 700,
          }}
        >
          {region.label} 이벤트
        </span>
        를 맞춤 추천해드립니다!
      </p>
      <br />
      <p>
        MBTI 4가지 유형을 선택하고
        <br />
        나만의 추천 이벤트를 확인해 보세요!
      </p>
    </div>
  );
};

export default MbtiInfoText;
