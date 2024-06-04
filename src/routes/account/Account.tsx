import { AccountCard } from './AccountCard';
import { AccountOptions } from './AccountOptions';
import { AccountModal } from './AccountModal';
import { Spinner } from 'src/components/ui/spinner/Spinner';
import styles from './styles.module.css';
import { useState } from 'react';
import { getUsername } from 'src/utilities/utilities';
import { useFetchProfile } from 'src/client/api/use-fetch-profile.hook';
export const Account = () => {
  const username = getUsername();
  const { data, isLoading, error } = useFetchProfile(username);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <section className="flex items-center justify-center h-full flex-col">
      {isLoading && <Spinner />}
      <h1 className="max-w-[60rem] w-full title-gap ">My account</h1>
      <div className={`max-w-[60rem] w-full 0 h-full flex flex-col gap-10`}>
        {data?.data && (
          <>
            <AccountCard
              avatar={{
                url: data?.data?.avatar?.url,
                alt: data?.data?.avatar?.alt,
              }}
              name={data.data.name}
              handleOpenModal={handleOpenModal}
              bio={data.data.bio}
              venueManager={data.data.venueManager}
            />

            <div className={`${styles.account_grid}`}>
              <AccountOptions
                name={data.data.name}
                venueManager={data.data.venueManager}
              />
            </div>
            <AccountModal
              handleCloseModal={handleCloseModal}
              modalVisible={modalVisible}
            />
          </>
        )}
      </div>
    </section>
  );
};
