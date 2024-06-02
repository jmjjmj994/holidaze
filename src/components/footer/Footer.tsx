import { useLocation } from 'react-router-dom';
export const Footer = () => {
  const location = useLocation();
  return (
    <footer
      className={`${
        location.pathname === '/' ? 'root-footer' : 'footer'
      } bg-blue-500`}
    >
      <section className="footer-wrapper bg-orange-500">Footer wh</section>
    </footer>
  );
};
