import { AccountCard } from './AccountCard';
import { AccountOptions } from './AccountOptions';
import styles from './styles.module.css';
export const Account = () => {
  return (
    <section className="flex items-center justify-center h-full flex-col">
      <h1 className="max-w-[60rem] w-full title-gap ">My account</h1>
      <div className={`max-w-[60rem] w-full 0 h-full flex flex-col gap-10`}>
        <AccountCard />
        <div className={`${styles.account_grid}`}>
          <AccountOptions />
        </div>
      </div>
    </section>
  );
};
