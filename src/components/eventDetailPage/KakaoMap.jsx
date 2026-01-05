import { useEffect, useRef } from 'react';

export default function KakaoMap({
  latitude,
  longitude,
  markerTitle = '',
  markerInfo = '',
  onMarkerClick,
  height = 420,
  isKiosk = false,
}) {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      console.warn('위도·경도 값이 없습니다. 지도 초기화 중단');
      return;
    }

    const init = () => {
      const kakao = window.kakao;
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(latitude, longitude);
        centerRef.current = center;

        const map = new kakao.maps.Map(mapRef.current, {
          center,
          level: isKiosk ? 1 : 3,
        });
        mapObjRef.current = map;

        const marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);

        if (markerTitle || markerInfo) {
          const content = `
            <div style="padding:8px 12px;font-size:13px;">
              ${markerTitle ? `<strong>${markerTitle}</strong><br/>` : ''}
              ${markerInfo}
            </div>`;
          const infoWindow = new kakao.maps.InfoWindow({ content });
          infoWindow.open(map, marker);
        }

        if (onMarkerClick) {
          kakao.maps.event.addListener(marker, 'click', onMarkerClick);
        }

        // 지연 보정
        setTimeout(() => {
          map.relayout();
          map.setCenter(center);
        }, 0);
      });
    };

    // SDK 로드
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = () => {
        init();
      };
      script.onerror = () => console.error('Kakao SDK script 로드 실패');
      document.head.appendChild(script);
    } else {
      init();
    }

    // 윈도우 리사이즈
    const handleResize = () => {
      if (mapObjRef.current && centerRef.current) {
        mapObjRef.current.relayout();
        mapObjRef.current.setCenter(centerRef.current);
        mapObjRef.current.setLevel(isKiosk ? 2 : 3);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [latitude, longitude, markerTitle, markerInfo, onMarkerClick, isKiosk]);

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
