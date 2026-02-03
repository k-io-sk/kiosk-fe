import bgJongno from '@assets/images/bgJongno.png';
import bgHwaseong from '@assets/images/bgHwaseong.png';
import bgOsansi from '@assets/images/bgOsansi.png';

export const DEFAULT_REGION_KEY = 'jongno';

const JONGNO_BASE = {
  backgroundImage: bgJongno,
  primary: '#FE6C50',
  mbtiSelectedBg: '#FFDDCF',
  resultBorder: '#f8ecde',
  resultBg: '#fffdfa',
  qrNotice: '#FE6C50',
  mbtiCard: { bg: undefined, text: undefined },
};

export const REGION_CONFIG = {
  jongno: {
    key: 'jongno',
    label: '종로구',
    apiRegion: 'JONGNO',
    headerMode: 'jongno',
    ...JONGNO_BASE,
  },

  insa: {
    key: 'insa',
    label: '인사동',
    apiRegion: 'INSA',
    headerMode: 'insa',
    ...JONGNO_BASE,
  },

  hwaseong: {
    key: 'hwaseong',
    label: '화성',
    apiRegion: 'HWASEONG',
    backgroundImage: bgHwaseong,
    primary: '#2559AD',
    headerMode: 'hwaseong',
    mbtiSelectedBg: '#CAEAFF',
    resultBorder: '#ACC9DE',
    resultBg: '#F3F7FC',
    qrNotice: '#FF0000',
    mbtiCard: { bg: undefined, text: undefined },
  },

  osansi: {
    key: 'osansi',
    label: '오산',
    apiRegion: 'OSAN',
    backgroundImage: bgOsansi,
    primary: '#1A4D7E',
    headerMode: 'osansi',
    mbtiSelectedBg: '#7AA7D3',
    resultBorder: '#1A4D7E',
    resultBg: '#ACC9DE',
    qrNotice: '#FF0004',
    mbtiCard: {
      bg: '#7AA7D3',
      text: '#FFFFFF',
    },
  },
};

export const getRegionConfig = (regionKey = DEFAULT_REGION_KEY) =>
  REGION_CONFIG[(regionKey || '').toLowerCase()] ?? REGION_CONFIG[DEFAULT_REGION_KEY];

export const HEADER_TABS = {
  seoul: [
    { key: 'jongno', label: '종로구' },
    { key: 'insa', label: '인사동' },
  ],
  hwaseong: [{ key: 'hwaseong', label: '화성' }],
  osansi: [{ key: 'osansi', label: '오산' }],
};
