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
          const fontSize = isKiosk ? 40 : 13;
          const padY = isKiosk ? 24 : 8;
          const padX = isKiosk ? 28 : 12;
          const lineHeight = isKiosk ? 1.25 : 1.3;

          const content = `
            <div style="
              padding:${padY}px ${padX}px;
              font-size:${fontSize}px;
              line-height:${lineHeight};
              white-space:nowrap;
            ">
              ${markerTitle ? `<strong style="font-size:${fontSize}px;">${markerTitle}</strong><br/>` : ''}
              ${markerInfo ? `<span style="font-size:${fontSize}px;">${markerInfo}</span>` : ''}
            </div>
          `;

          const infoWindow = new kakao.maps.InfoWindow({ content });
          infoWindow.open(map, marker);
        }

        if (onMarkerClick) {
          kakao.maps.event.addListener(marker, 'click', onMarkerClick);
        }

        setTimeout(() => {
          map.relayout();
          map.setCenter(center);
        }, 0);
      });
    };

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.onload = init;
      script.onerror = () => console.error('Kakao SDK script 로드 실패');
      document.head.appendChild(script);
    } else {
      init();
    }

    const handleResize = () => {
      if (mapObjRef.current && centerRef.current) {
        mapObjRef.current.relayout();
        mapObjRef.current.setCenter(centerRef.current);

        mapObjRef.current.setLevel(isKiosk ? 1 : 3);
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
        overflow: 'hidden',
        background: '#f5f5f5',
      }}
    />
  );
}
