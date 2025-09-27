import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts";
import EventListPage from "../pages/EventListPage";
import EventDetailPage from "../pages/EventDetailPage";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<EventListPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
