import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/commons/footer/Footer";
import Header from "../components/commons/header/Header";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
