import { AccountCard } from './AccountCard';
import { AccountOptions } from './AccountOptions';
import { AccountModal } from './AccountEditModal';
import styles from './styles.module.css';
import { useState } from 'react';
export const Account = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <section className="flex items-center justify-center h-full flex-col">
      <h1 className="max-w-[60rem] w-full title-gap ">My account</h1>
      <div className={`max-w-[60rem] w-full 0 h-full flex flex-col gap-10`}>
        <AccountCard handleOpenModal={handleOpenModal} />
        <div className={`${styles.account_grid}`}>
          <AccountOptions />
        </div>
        <AccountModal
          handleCloseModal={handleCloseModal}
          modalVisible={modalVisible}
        />
      </div>
    </section>
  );
};
