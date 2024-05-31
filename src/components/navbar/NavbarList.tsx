import { Link } from 'react-router-dom';
const navbarListItems: { id: number; path: string; name: string }[] = [
  { id: 1, path: '/', name: 'home' },
  { id: 2, path: '', name: 'link' },
  { id: 3, path: '', name: 'link' },
  { id: 4, path: '', name: 'link' },
  { id: 5, path: '', name: 'link' },
] as const;

export const NavbarList = () => {
  return (
    <ul className="flex flex-col h-full gap-10 px-10 text-2xl inter-bold md:flex-row md:gap-5 md:px-0 md:text-base">
      {navbarListItems.map(({ id, path, name }) => (
        <li key={id}>
          <Link to={path}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
