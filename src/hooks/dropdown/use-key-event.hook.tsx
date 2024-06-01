import { useEffect } from 'react';

export const useKeyEvent = (fn: () => void) => {
  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        fn();
      }
    };
    document.addEventListener('keydown', handleKeyEvent);
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [fn]);
};
