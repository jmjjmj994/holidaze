import { useFetchProfile } from 'src/client/api/use-fetch-profile.hook';
import { useParams } from 'react-router-dom';
import { BookingsCard } from './BookingsCard';
import { Spinner } from 'src/components/ui/spinner/Spinner';
import styles from './styles.module.css';

export const Bookings = () => {
  const { username } = useParams();
  const { data, isLoading } = useFetchProfile(username as string);

  const profileData = data?.data?.bookings;
  if (isLoading) return <Spinner />;
  if (profileData?.length === 0) return <p>You have no upcoming bookings</p>;
  return (
    <section className="flex items-center justify-center h-full flex-col ">
      <h1 className=" w-full title-gap text-left">My bookings</h1>
      <ul className={styles.booking_grid}>
        {profileData &&
          profileData.map(
            ({ venue: { id, name, maxGuests, media, meta, price } }) => (
              <BookingsCard
                id={id}
                name={name}
                maxGuests={maxGuests}
                media={media}
                meta={meta}
                price={price}
              />
            )
          )}
      </ul>
    </section>
  );
};
