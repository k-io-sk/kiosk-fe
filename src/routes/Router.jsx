import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout } from '../layouts';

const HomePage = lazy(() => import('../pages/HomePage'));
const EventListPage = lazy(() => import('../pages/EventListPage'));
const EventDetailPage = lazy(() => import('../pages/EventDetailPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound.jsx'));

const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '16px',
      color: '#666',
    }}
  >
    페이지를 불러오는 중...
  </div>
);

export default function AppRouter() {
  const routes = [
    { path: '', element: <HomePage /> },
    { path: 'events', element: <EventListPage /> },
    { path: 'events/:id', element: <EventDetailPage /> },
    { path: '*', element: <NotFoundPage /> },
  ];

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
