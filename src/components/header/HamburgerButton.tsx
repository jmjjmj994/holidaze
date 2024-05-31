import { List } from 'phosphor-react';
type HamburgerButtonProps = {
  onClick: () => void;
};

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  onClick,
}) => {
  return (
    <button className="md:hidden" aria-label="show menu" onClick={onClick}>
      <List aria-label="hamburger icon" size={25} />
    </button>
  );
};
