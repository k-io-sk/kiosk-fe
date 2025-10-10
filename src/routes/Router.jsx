import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts';
import EventListPage from '../pages/EventListPage';
import EventDetailPage from '../pages/EventDetailPage';
import HomePage from '../pages/HomePage';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/events' element={<EventListPage />} />
          <Route path='/events/:id' element={<EventDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
