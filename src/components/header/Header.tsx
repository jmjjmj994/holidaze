import { useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import { HamburgerButton } from './HamburgerButton';
import { useActive } from 'src/hooks/use-active.hook';
import { useMediaMatch } from 'src/hooks/use-media-match.hook';
import { SearchBar } from '../searchbar/SearchBar';
import { Profile } from '../profile/Profile';

export const Header = () => {
  const { isActive, handleIsActiveFalse, handleIsActiveTrue } = useActive();
  const [isMobile] = useMediaMatch('768');
  useEffect(() => {
    if (!isMobile) {
      handleIsActiveFalse();
    }
  }, [isMobile]);

  return (
    <header className="header element-darken">
      <section className="flex flex-col header-wrapper">
        <div className="flex items-center justify-between h-1/2">
          <div>
            <span className="text-2xl inter-bold">Holidaze.</span>
          </div>
          <Navbar
            isMobile={isMobile}
            isActive={isActive}
            handleIsActiveFalse={handleIsActiveFalse}
            handleIsActiveTrue={handleIsActiveTrue}
          />
          <div className="flex items-center justify-center gap-2">
            <Profile />
            <HamburgerButton onClick={handleIsActiveTrue} />
          </div>
        </div>
        <SearchBar />
      </section>
    </header>
  );
};
