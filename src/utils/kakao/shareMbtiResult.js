import { loadKakaoSdk } from './loadKakaoSdk';
import { buildMbtiSharePayload } from './buildMbtiSharePayload';

export const shareMbtiResult = async ({ shareUrl, imageUrl }) => {
  const Kakao = await loadKakaoSdk();

  if (!Kakao?.Share?.sendDefault) {
    throw new Error('Kakao Share API not available');
  }

  const payload = buildMbtiSharePayload({ shareUrl, imageUrl });
  Kakao.Share.sendDefault(payload);
};
