import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { KioskUIProvider } from './contexts/KioskUIContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KioskUIProvider>
      <App />
    </KioskUIProvider>
  </StrictMode>,
);
