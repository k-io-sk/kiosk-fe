import bgJongno from '@assets/images/bgJongno.png';
import bgHwaseong from '@assets/images/bgHwaseong.png';

export const DEFAULT_REGION_KEY = 'jongno';

export const REGION_CONFIG = {
  jongno: {
    key: 'jongno',
    label: '종로구',
    apiRegion: 'JONGNO',
    backgroundImage: bgJongno,
    primary: '#FE6C50',
    headerMode: 'seoul',
  },
  insa: {
    key: 'insa',
    label: '인사동',
    apiRegion: 'INSA',
    backgroundImage: bgJongno,
    primary: '#FE6C50',
    headerMode: 'seoul',
  },
  hwaseong: {
    key: 'hwaseong',
    label: '화성',
    apiRegion: 'HWASEONG',
    backgroundImage: bgHwaseong,
    primary: '#2559AD',
    headerMode: 'hwaseong',
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
};
