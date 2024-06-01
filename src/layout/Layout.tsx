import { Header } from 'src/components/header/Header';
import { Footer } from 'src/components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
export const Layout = () => {
  const location = useLocation();

  return (
    <HelmetProvider>
      <Header />
      <main className={`${location.pathname === '/' ? 'root-main' : 'main'}`}>
        <section className="main-wrapper">
          <Outlet />
        </section>
      </main>
      <Footer />
    </HelmetProvider>
  );
};
