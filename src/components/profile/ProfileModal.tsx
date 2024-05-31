import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
export const ProfileModal = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);
  return (
    <dialog ref={ref} className={styles.dialog}>
      my dialog
    </dialog>
  );
};
