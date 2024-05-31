import { useState } from 'react';

type UseActive = {
  isActive: boolean;
  handleIsActiveFalse: () => void;
  handleIsActiveTrue: () => void;
};

export const useActive = (): UseActive => {
  const [isActive, setIsActive] = useState(false);
  const handleIsActiveFalse = () => setIsActive(false);
  const handleIsActiveTrue = () => setIsActive(true);
  return { isActive, handleIsActiveFalse, handleIsActiveTrue };
};