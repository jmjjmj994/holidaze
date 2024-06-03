import styles from './styles.module.css';
export const Spinner = () => (
  <div className="loader-h flex items-center justify-center">
    <span className={styles.loader}></span>
  </div>
);
