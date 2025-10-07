import { Outlet } from 'react-router-dom';
import Footer from '../components/commons/footer/Footer';
import Header from '../components/commons/header/Header';

export default function MainLayout() {
  return (
    <div className='layout'>
      <Header />
      <main className='content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
