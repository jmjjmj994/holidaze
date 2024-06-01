import { SignIn, SignOut, NotePencil, Info, User } from 'phosphor-react';
import { useRef, useState, useEffect } from 'react';
import { useClickOutside } from 'src/hooks/dropdown/use-click-outside.hook';
import { useKeyEvent } from 'src/hooks/dropdown/use-key-event.hook';
import { hasToken } from 'src/helpers/helpers';
import { Link } from 'react-router-dom';
type ProfileDropdownMenuProps = {
  isOpen: boolean;
  handleIsClosed: () => void;
};

export const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({
  isOpen,
  handleIsClosed,
}) => {
  const userHasToken = hasToken();
  const [listIndex, setListIndex] = useState(0);
  const ref = useRef(null);
  const menuListRef = useRef<HTMLUListElement | null>(null);
  const menuListItems = Array.from(
    menuListRef?.current?.querySelectorAll('li') || []
  ) as HTMLLIElement[];

  useKeyEvent(handleIsClosed);
  useClickOutside(handleIsClosed, menuListRef);

  useEffect(() => {
    if (!isOpen) {
      setListIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleListIndex = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const newIndex = listIndex + 1;
        setListIndex(newIndex);
      }
    };

    window.addEventListener('keydown', handleListIndex);

    return () => {
      window.removeEventListener('keydown', handleListIndex);
    };
  }, [listIndex, isOpen]);

  useEffect(() => {
    if (menuListRef.current) {
      const menuListItems = menuListRef.current.querySelectorAll('li');
      menuListItems.forEach((item, index) => {
        item.style.backgroundColor = index + 1 === listIndex ? 'orange' : '';
      });
    }

    if (menuListItems.length + 1 === listIndex) {
      handleIsClosed();
      setListIndex(0);
    }
  }, [listIndex, menuListItems, handleIsClosed, isOpen]);

  const userIsAuthenticated = (
    <>
      <li tabIndex={-1} role="menu-list-item">
        <Link
          onClick={handleIsClosed}
          className="flex items-center gap-4"
          to={'/account'}
        >
          <User size={25} weight="light" />
          My account
        </Link>
      </li>

      <li tabIndex={-1} role="menu-list-item">
        <Link
          onClick={() => {
            handleIsClosed();
            localStorage.clear();
          }}
          className="flex items-center gap-4"
          to={'/'}
        >
          <SignOut size={25} weight="light" />
          Sign out
        </Link>
      </li>

      <li tabIndex={-1} role="menu-list-item">
        <Link className="flex items-center gap-4" to={''}>
          <Info size={25} weight="light" />
          Get help
        </Link>
      </li>
    </>
  );

  const userNotAuthenticated = (
    <>
      <li tabIndex={-1} role="menu-list-item">
        <Link
          className="flex items-center gap-4"
          onClick={handleIsClosed}
          to={'/sign-in'}
        >
          <SignIn size={25} weight="light" />
          Sign in
        </Link>
      </li>
      <li tabIndex={-1} role="menu-list-item">
        <Link className="flex items-center gap-4" to={'/register'}>
          <NotePencil size={25} weight="light" /> Create an account
        </Link>
      </li>
      <li tabIndex={-1} role="menu-list-item">
        <Link className="flex items-center gap-4" to={''}>
          <Info size={25} weight="light" />
          Get help
        </Link>
      </li>
    </>
  );

  return (
    <nav
      ref={ref}
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute top-[50px] right-0 shadow-overlay border rounded sm py-4 px-4 w-[20rem] bg-custom-background_white`}
      role="menu-nav"
    >
      <ul ref={menuListRef} role="menu-list" className="flex flex-col gap-5">
        {userHasToken ? userIsAuthenticated : userNotAuthenticated}
      </ul>
    </nav>
  );
};
