import { useLocation } from 'react-router-dom';
export const Footer = () => {
  const location = useLocation();
  return (
    <footer
      className={`${location.pathname === '/' ? 'root-footer' : 'footer'}`}
    >
      <section className="footer-wrapper">Footer</section>
    </footer>
  );
};
