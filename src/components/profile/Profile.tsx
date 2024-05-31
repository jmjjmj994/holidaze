import { User } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
type ProfileModalProps = {
  isOpen: boolean;
  handleIsClosed: () => void;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  handleIsClosed,
}) => {
  const [listIndex, setListIndex] = useState(0);
  const ref = useRef(null);
  const menuListRef = useRef<HTMLUListElement | null>(null);
  const menuListItems = Array.from(
    menuListRef?.current?.querySelectorAll('li') || []
  ) as HTMLLIElement[];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleIsClosed();
      }
    };
    window.addEventListener('keydown', handleKeyEvent);

    return () => window.removeEventListener('keydown', handleKeyEvent);
  }, [isOpen, handleIsClosed]);

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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        menuListRef.current &&
        !menuListRef.current.contains(e.target as Node)
      ) {
        handleIsClosed();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [handleIsClosed]);

  return (
    <nav
      ref={ref}
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute top-[30px] right-0 shadow-overlay border rounded sm py-4 px-4 w-[20rem] bg-custom-background_white`}
      role="menu-nav"
    >
      <ul ref={menuListRef} role="menu-list">
        <li tabIndex={-1} role="menu-list-item">
          <a href="#">Link1</a>
        </li>
        <li tabIndex={-1} role="menu-list-item">
          <a href="#">Link1</a>
        </li>
        <li tabIndex={-1} role="menu-list-item">
          <a href="#">Link1</a>
        </li>
        <li tabIndex={-1} role="menu-list-item">
          <a href="#">Link1</a>
        </li>
        <li tabIndex={-1} role="menu-list-item">
          <a href="#">Link1</a>
        </li>
      </ul>
    </nav>
  );
};

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleIsOpen();
  };
  const handleIsOpen = useCallback(() => setIsOpen(true), []);
  const handleIsClosed = useCallback(() => setIsOpen(false), []);

  return (
    <section className="relative flex items-center bg-orange-500">
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handlePropagation}
      >
        <User size={25} />
      </button>
      <ProfileModal isOpen={isOpen} handleIsClosed={handleIsClosed} />
    </section>
  );
};
