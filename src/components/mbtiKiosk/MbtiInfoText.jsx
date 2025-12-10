import styles from './MbtiInfoText.module.css';

const MbtiInfoText = () => {
  return (
    <div className={styles.textWrap}>
      <p>
        MBTI 성향과 취향을 반영해
        <br />
        <span className={styles.point}>종로구 이벤트</span>를 맞춤 추천해드립니다!
      </p>
      <br />
      <p>
        MBTI 4가지 유형을 전부 선택하지 않아도
        <br />
        나만의 추천 결과를 받아볼 수 있어요!
      </p>
    </div>
  );
};

export default MbtiInfoText;
