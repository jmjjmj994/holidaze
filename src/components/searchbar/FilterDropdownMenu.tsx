import { useRef, useState, useEffect } from 'react';
import { useClickOutside } from 'src/hooks/dropdown/use-click-outside.hook';
import { useKeyEvent } from 'src/hooks/dropdown/use-key-event.hook';
import { Link } from 'react-router-dom';
type FilterDropdownMenuProps = {
  isOpen: boolean;
  handleIsClosed: () => void;
};

export const FilterDropdownMenu: React.FC<FilterDropdownMenuProps> = ({
  isOpen,
  handleIsClosed,
}) => {
  const [listIndex, setListIndex] = useState(0);
  const ref = useRef(null);
  const filterListRef = useRef<HTMLUListElement | null>(null);
  const filterListItems = Array.from(
    filterListRef?.current?.querySelectorAll('li') || []
  ) as HTMLLIElement[];
  console.log(isOpen);
  useKeyEvent(handleIsClosed);
  useClickOutside(handleIsClosed, filterListRef);
  useEffect(() => {
    if (!isOpen) return;
    const handleListIndex = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setListIndex(listIndex + 1);
      }
      if (filterListRef.current) {
        const filterListItems = filterListRef.current.querySelectorAll('li');
        filterListItems.forEach((item, index) => {
          if (index === listIndex) {
            item.style.backgroundColor = 'orange';
          } else {
            item.style.backgroundColor = '';
          }
        });
      }

      if (filterListItems.length - 1 + 1 === listIndex) {
        handleIsClosed();
        setListIndex(0);
      }
    };
    window.addEventListener('keydown', handleListIndex);
    return () => window.removeEventListener('keydown', handleListIndex);
  }, [listIndex, filterListItems, handleIsClosed, isOpen]);

  return (
    <nav
      ref={ref}
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute top-[50px] right-0 shadow-overlay border rounded sm py-4 px-4 w-[20rem] bg-custom-background_white`}
      role="filter-nav"
    >
      <ul ref={filterListRef} role="menu-list" className="flex flex-col gap-5">
        <li
          tabIndex={-1}
          role="menu-list-item"
          className="flex items-center gap-4"
        >
          <Link onClick={handleIsClosed} to={'/sign-in'}>
            Sign in
          </Link>
        </li>
        <li
          tabIndex={-1}
          role="menu-list-item"
          className="flex items-center gap-4"
        >
          <Link to={'/'}>Sign out</Link>
        </li>
        <li
          tabIndex={-1}
          role="menu-list-item"
          className="flex items-center gap-4"
        >
          <Link to={'/register'}>Create an account</Link>
        </li>
        <li
          tabIndex={-1}
          role="menu-list-item"
          className="flex items-center gap-4"
        >
          <Link to={''}>Get help</Link>
        </li>
      </ul>
    </nav>
  );
};
