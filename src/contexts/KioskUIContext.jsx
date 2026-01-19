import { createContext, useContext, useMemo, useState } from 'react';

const KioskUIContext = createContext(null);

export function KioskUIProvider({ children }) {
  const [hideFooter, setHideFooter] = useState(false);

  const value = useMemo(() => ({ hideFooter, setHideFooter }), [hideFooter]);

  return <KioskUIContext.Provider value={value}>{children}</KioskUIContext.Provider>;
}

export function useKioskUI() {
  const ctx = useContext(KioskUIContext);
  if (!ctx) throw new Error('useKioskUI must be used within KioskUIProvider');
  return ctx;
}
