import { Faders } from 'phosphor-react';
import { useState, useCallback } from 'react';
import { FilterDropdownMenu } from './FilterDropdownMenu';
export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsClosed = useCallback(() => setIsOpen(false), []);
  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  return (
    <section className="relative">
      <button
        onClick={handlePropagation}
        className="px-2 py-2 border rounded-sm"
      >
        <Faders size={25} weight="light" />
      </button>
      <FilterDropdownMenu isOpen={isOpen} handleIsClosed={handleIsClosed} />
    </section>
  );
};
