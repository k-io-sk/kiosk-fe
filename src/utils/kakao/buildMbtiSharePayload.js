import { getRegionConfig } from '@/config/kioskConfig';

export const buildMbtiSharePayload = ({ shareUrl, imageUrl, regionKey }) => {
  const origin = window.location.origin;
  const fallbackImageUrl = `${origin}/og-image.png`;
  const region = getRegionConfig(regionKey);
  const regionLabel = region.label;

  return {
    objectType: 'feed',
    content: {
      title: 'MBTI 기반 추천 이벤트',
      description: `내 성향으로 추천받은 ${regionLabel} 이벤트를 확인해보세요!`,
      imageUrl: imageUrl || fallbackImageUrl,
      link: {
        webUrl: shareUrl,
        mobileWebUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: '결과 보러가기',
        link: {
          webUrl: shareUrl,
          mobileWebUrl: shareUrl,
        },
      },
    ],
  };
};
