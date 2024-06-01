import { useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import { HamburgerButton } from './HamburgerButton';
import { useActive } from 'src/hooks/use-active.hook';
import { useMediaMatch } from 'src/hooks/use-media-match.hook';
import { SearchBar } from '../searchbar/SearchBar';
import { Profile } from '../profile/Profile';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { isActive, handleIsActiveFalse, handleIsActiveTrue } = useActive();
  const [isMobile] = useMediaMatch('768');
  const location = useLocation();

  useEffect(() => {
    if (!isMobile) {
      handleIsActiveFalse();
    }
  }, [handleIsActiveFalse, isMobile]);

  return (
    <header className="header element-darken">
      <section className="flex flex-col header-wrapper">
        <div className="flex items-center justify-between h-1/2">
          <div>
            <Link className="text-2xl inter-bold" to={'/'}>
              Holidaze.
            </Link>
          </div>
          <Navbar
            isMobile={isMobile}
            isActive={isActive}
            handleIsActiveFalse={handleIsActiveFalse}
            handleIsActiveTrue={handleIsActiveTrue}
          />
          <div className="flex items-center justify-center gap-4">
            <Profile />
            <HamburgerButton onClick={handleIsActiveTrue} />
          </div>
        </div>
        {location.pathname === '/' && <SearchBar />}
      </section>
    </header>
  );
};
