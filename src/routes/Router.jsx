import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout } from '../layouts';
import KioskLayout from '../layouts/KioskLayout';
import ScrollToTop from '../components/global/scroll/ScrollToTop.jsx';
import MobileOnlyRoute from './MobileOnlyRoute';
import AddressGuard from './AddressGuard';
import PageLoader from '../components/global/pageLoader/PageLoader';

const HomePage = lazy(() => import('../pages/HomePage'));
const EventListPage = lazy(() => import('../pages/EventListPage'));
const EventDetailPage = lazy(() => import('../pages/EventDetailPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound.jsx'));
const MbtiKioskPage = lazy(() => import('../pages/MbtiKioskPage'));
const MbtiResultPage = lazy(() => import('../pages/MbtiResultPage'));

export default function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* PC */}
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path='events' element={<EventListPage />} />
            <Route path='events/:id' element={<EventDetailPage />} />
            <Route path='about' element={<AboutPage />} />

            <Route
              path='mbti/result'
              element={
                <MobileOnlyRoute redirectTo='/'>
                  <MbtiResultPage />
                </MobileOnlyRoute>
              }
            />

            <Route path='*' element={<NotFoundPage />} />
          </Route>

          {/* Kiosk */}
          <Route
            path='/kiosk'
            element={
              <AddressGuard mode='kiosk'>
                <KioskLayout />
              </AddressGuard>
            }
          >
            <Route index element={<MbtiKioskPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
