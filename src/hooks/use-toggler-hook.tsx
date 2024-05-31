import { useState } from 'react';
type Toggler = {
  isActive: boolean;
  toggleIsActive: () => void;
  setIsActiveFalse: () => void;
};

export const useToggler = (): Toggler => {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => setIsActive((prev) => !prev);
  const setIsActiveFalse = () => setIsActive(false);
  return { isActive, toggleIsActive, setIsActiveFalse };
};