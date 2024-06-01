import { useState } from 'react';
import { User } from 'phosphor-react';
import { AccountDropdownMenu } from './AccountDropdownMenu';
export const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsClosed = () => setIsOpen(false);
  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="relative flex items-center justify-center rounded-md border hover:shadow-raised transition-shadow">
      <button
        className=" px-6 py-1 rounded-md"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handlePropagation}
      >
        <User size={25} />
      </button>
      <AccountDropdownMenu isOpen={isOpen} handleIsClosed={handleIsClosed} />
    </section>
  );
};
