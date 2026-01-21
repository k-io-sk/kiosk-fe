import { loadKakaoSdk } from './loadKakaoSdk';
import { buildMbtiSharePayload } from './buildMbtiSharePayload';

export const shareMbtiResult = async ({ shareUrl, imageUrl, regionKey }) => {
  const Kakao = await loadKakaoSdk();

  if (!Kakao?.Share?.sendDefault) {
    throw new Error('Kakao Share API not available');
  }

  const payload = buildMbtiSharePayload({ shareUrl, imageUrl, regionKey });
  Kakao.Share.sendDefault(payload);
};
