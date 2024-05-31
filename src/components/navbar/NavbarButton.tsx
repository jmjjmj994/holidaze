import { X } from 'phosphor-react';
type NavbarButtonProps = {
  onClick: () => void;
};
export const NavbarButton: React.FC<NavbarButtonProps> = ({ onClick }) => {
  return (
    <div className="self-end px-4 py-4 md:hidden">
      <button aria-label="close menu" onClick={onClick}>
        <X aria-label="x icon" size={25} />
      </button>
    </div>
  );
};
