import { Header } from 'src/components/header/Header';
import { Footer } from 'src/components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
export const Layout = () => {
  return (
    <HelmetProvider>
      <Header />
      <main className="main">
        <section className="main-wrapper">
          <Outlet />
        </section>
      </main>
      <Footer />
    </HelmetProvider>
  );
};
