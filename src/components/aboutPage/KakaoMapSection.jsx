import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './KakaoMapSection.module.css';

const KAKAO_SDK_URL = 'https://dapi.kakao.com/v2/maps/sdk.js';
const SCRIPT_ATTR = 'data-kakao-sdk';

function loadKakaoSdk(appKey) {
  return new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao);

    const existing = document.querySelector(`script[${SCRIPT_ATTR}="true"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.kakao), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `${KAKAO_SDK_URL}?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.defer = true;
    script.setAttribute(SCRIPT_ATTR, 'true');

    script.onload = () => resolve(window.kakao);
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export default function KakaoMapSection({ title, addressLabel, level = 4, places = [] }) {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState('');

  useEffect(() => {
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (!appKey) {
      setMapError('VITE_KAKAO_MAP_KEY 설정되지 않았습니다.');
      return;
    }

    if (!places.length) {
      setMapError('표시할 키오스크 위치가 없습니다.');
      return;
    }

    let map = null;
    let markers = [];
    let infoWindows = [];

    const init = async () => {
      try {
        const kakao = await loadKakaoSdk(appKey);

        kakao.maps.load(() => {
          if (!mapRef.current) return;

          const first = places[0];
          const center = new kakao.maps.LatLng(first.lat, first.lng);

          map = new kakao.maps.Map(mapRef.current, {
            center,
            level,
          });

          const bounds = new kakao.maps.LatLngBounds();

          places.forEach((p) => {
            const pos = new kakao.maps.LatLng(p.lat, p.lng);
            bounds.extend(pos);

            const marker = new kakao.maps.Marker({ position: pos });
            marker.setMap(map);
            markers.push(marker);

            const iw = new kakao.maps.InfoWindow({
              content: `<div style="padding:6px 10px;font-size:12px;white-space:nowrap;">
                ${p.name}
              </div>`,
            });
            iw.open(map, marker);
            infoWindows.push(iw);
          });

          map.setBounds(bounds, 60, 60, 60, 60);

          setTimeout(() => {
            kakao.maps.event.trigger(map, 'resize');
            map.setBounds(bounds, 60, 60, 60, 60);
          }, 0);
        });
      } catch (e) {
        setMapError('카카오 지도 로딩에 실패했습니다.');
      }
    };

    init();

    return () => {
      infoWindows.forEach((iw) => iw.close());
      markers.forEach((m) => m.setMap(null));
      map = null;
    };
  }, [places, level]);

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.sub}>{addressLabel}</p>
      </div>

      {mapError ? (
        <div className={styles.fallback}>⚠️ {mapError}</div>
      ) : (
        <div ref={mapRef} className={styles.map} aria-label='카카오 지도' />
      )}
    </section>
  );
}

KakaoMapSection.propTypes = {
  title: PropTypes.string.isRequired,
  addressLabel: PropTypes.string,
  level: PropTypes.number,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
