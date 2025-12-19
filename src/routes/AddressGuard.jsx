import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export default function AddressGuard({ mode, children }) {
  const location = useLocation();

  useEffect(() => {
    if (mode === 'kiosk') {
      sessionStorage.setItem('APP_MODE', 'kiosk');
    }
  }, [mode]);

  const appMode = sessionStorage.getItem('APP_MODE');

  if (appMode === 'kiosk' && !location.pathname.startsWith('/kiosk')) {
    return <Navigate to='/kiosk' replace />;
  }

  return children;
}
