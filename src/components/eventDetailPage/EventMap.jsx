import KakaoMap from './KakaoMap';
import styles from './EventMap.module.css';

export default function EventMap({ data, kiosk = false }) {
  const { latitude, longitude, title, address } = data?.data ?? data ?? {};

  const handleMarkerClick = () => {
    if (!latitude || !longitude) return;
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(title || address || '목적지')},${latitude},${longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`${styles.wrap} ${kiosk ? styles.kioskWrap : ''}`}>
      <div className={styles.headerRow}>
        <h3 className={`${styles.title} ${kiosk ? styles.kioskTitle : ''}`}>오시는 길 안내</h3>
      </div>

      {address && <p className={`${styles.note} ${kiosk ? styles.kioskNote : ''}`}>{address}</p>}

      <KakaoMap
        latitude={latitude}
        longitude={longitude}
        markerTitle={title}
        markerInfo={address}
        onMarkerClick={handleMarkerClick}
        height={kiosk ? 620 : 420}
        isKiosk={kiosk}
      />
    </section>
  );
}
