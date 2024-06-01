import { RefObject, useEffect } from 'react';

export const useClickOutside = (fn: () => void, ref:RefObject<HTMLElement>) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        fn();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [fn, ref]);
};
