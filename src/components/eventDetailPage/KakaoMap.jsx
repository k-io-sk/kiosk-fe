import { useEffect, useRef } from 'react';

export default function KakaoMap({
  latitude,
  longitude,
  markerTitle = '',
  markerInfo = '',
  onMarkerClick,
  height = 420,
}) {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    console.log(
      'SDK URL =',
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${(import.meta.env.VITE_KAKAO_MAP_KEY || '').trim()}&autoload=false`,
    );

    console.log('Kakao Key:', import.meta.env.VITE_KAKAO_MAP_KEY);

    console.log('useEffect 실행됨');
    console.log('받은 좌표:', { latitude, longitude });

    if (!latitude || !longitude) {
      console.warn('위도·경도 값이 없습니다. 지도 초기화 중단');
      return;
    }

    const init = () => {
      console.log('Kakao SDK 로드 완료, 지도 초기화 시작');
      const kakao = window.kakao;
      kakao.maps.load(() => {
        console.log('🗺 kakao.maps.load() 실행됨');

        const center = new kakao.maps.LatLng(latitude, longitude);
        centerRef.current = center;

        const map = new kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });
        mapObjRef.current = map;
        console.log('지도 객체 생성 완료:', map);

        const marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);
        console.log('마커 생성 완료:', marker);

        if (markerTitle || markerInfo) {
          const content = `
            <div style="padding:8px 12px;font-size:13px;">
              ${markerTitle ? `<strong>${markerTitle}</strong><br/>` : ''}
              ${markerInfo}
            </div>`;
          const infoWindow = new kakao.maps.InfoWindow({ content });
          infoWindow.open(map, marker);
          console.log('인포윈도우 표시 완료');
        }

        if (onMarkerClick) {
          kakao.maps.event.addListener(marker, 'click', onMarkerClick);
          console.log('🖱 마커 클릭 이벤트 등록됨');
        }

        // 지연 보정
        setTimeout(() => {
          map.relayout();
          map.setCenter(center);
          console.log('map.relayout() 호출됨');
        }, 0);
      });
    };

    // SDK 로드
    if (!window.kakao || !window.kakao.maps) {
      console.log('📦 SDK가 아직 없어요. 스크립트 추가 중...');
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        console.log('Kakao SDK script 로드 완료');
        init();
      };
      script.onerror = () => console.error('Kakao SDK script 로드 실패');
      document.head.appendChild(script);
    } else {
      console.log('SDK 이미 로드됨');
      init();
    }

    // 윈도우 리사이즈
    const handleResize = () => {
      if (mapObjRef.current && centerRef.current) {
        mapObjRef.current.relayout();
        mapObjRef.current.setCenter(centerRef.current);
        console.log('창 크기 변경 → 지도 재정렬');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [latitude, longitude, markerTitle, markerInfo, onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        margin: '0 auto',
        height: `${height}px`,
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#f5f5f5',
      }}
    />
  );
}
