import { SignIn, SignOut, NotePencil, Info } from 'phosphor-react';
import { useRef, useState, useEffect } from 'react';
import { useClickOutside } from 'src/hooks/dropdown/use-click-outside.hook';
import { useKeyEvent } from 'src/hooks/dropdown/use-key-event.hook';
import { Link } from 'react-router-dom';
type AccountDropdownMenuProps = {
  isOpen: boolean;
  handleIsClosed: () => void;
};

export const AccountDropdownMenu: React.FC<AccountDropdownMenuProps> = ({
  isOpen,
  handleIsClosed,
}) => {
  const [listIndex, setListIndex] = useState(0);
  const ref = useRef(null);
  const menuListRef = useRef<HTMLUListElement | null>(null);
  const menuListItems = Array.from(
    menuListRef?.current?.querySelectorAll('li') || []
  ) as HTMLLIElement[];

  useKeyEvent(handleIsClosed);
  useClickOutside(handleIsClosed, menuListRef);

  useEffect(() => {
    if (!isOpen) return;
    const handleListIndex = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setListIndex(listIndex + 1);
      }
      if (menuListRef.current) {
        const menuListItems = menuListRef.current.querySelectorAll('li');
        menuListItems.forEach((item, index) => {
          if (index === listIndex) {
            item.style.backgroundColor = 'orange';
          } else {
            item.style.backgroundColor = '';
          }
        });
      }

      if (menuListItems.length - 1 + 1 === listIndex) {
        handleIsClosed();
        setListIndex(0);
      }
    };
    window.addEventListener('keydown', handleListIndex);
    return () => window.removeEventListener('keydown', handleListIndex);
  }, [listIndex, menuListItems, handleIsClosed, isOpen]);

  return (
    <nav
      ref={ref}
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute top-[50px] right-0 shadow-overlay border rounded sm py-4 px-4 w-[20rem] bg-custom-background_white`}
      role="menu-nav"
    >
      <ul ref={menuListRef} role="menu-list" className="flex flex-col gap-5">
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
          <Link className="flex items-center gap-4" to={'/'}>
            <SignOut size={25} weight="light" />
            Sign out
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
      </ul>
    </nav>
  );
};
