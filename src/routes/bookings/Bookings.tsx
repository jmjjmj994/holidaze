import { useFetchProfile } from 'src/client/api/use-fetch-profile.hook';
import { useParams } from 'react-router-dom';
import { Users, WifiMedium, Cat, Pizza } from 'phosphor-react';
import { CiParking1 } from 'react-icons/ci';
import { useMediaMatch } from 'src/hooks/use-media-match.hook';
import { BookingCardsLarge } from './BookingsCardsLarge';
import { BookingsCardsSmall } from './BookingsCardsSmall';

import styles from './styles.module.css';
export const Bookings = () => {
  const { username } = useParams();
  const { data } = useFetchProfile(username as string);
  const [isMobile] = useMediaMatch('510');
  const bookings = data?.data._count?.bookings;
  const venue = data?.data.bookings.map((venue) => venue?.venue);

  return (
    <section className="flex items-center justify-center h-full flex-col b">
      <h1 className="max-w-[70rem] w-full title-gap text-left bg-red-500 ">
        My bookings
      </h1>

      <ul className={`${styles.booking_grid}  max-w-[70rem] w-full`}>
        {venue?.map(
          ({
            id,
            created,
            description,
            location: { address, city },
            maxGuests,
            media,
            meta: { wifi, parking, breakfast, pets },
            name,
            price,
            rating,
          }) => (
            <li key={id}>
              <article
                className={`${styles.booking_grid__card} flex bg-orange-500 py-2 px-2 items-center`}
              >
                {media.length > 0 && (
                  <img
                    className={`${styles.booking_grid__card_img} w-[15rem] h-[8rem] object-cover aspect-auto rounded-md`}
                    src={media[0].url}
                    alt={`${media[0].alt}-image`}
                  ></img>
                )}

                <div
                  className={`${styles.booking_grid__card_content} flex flex-col gap-1 justify-between h-full`}
                >
                  <div className="flex flex-col gap-2">
                    <p>{name}</p>
                    <p>
                      {address}, {city}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <p className="flex items-center gap-1">
                      <Users />
                      {maxGuests}
                    </p>
                    {wifi && (
                      <p className="flex items-center gap-1">
                        <WifiMedium /> Wifi
                      </p>
                    )}
                    {pets && (
                      <p className="flex items-center gap-1">
                        <Cat /> Pets
                      </p>
                    )}
                    {breakfast && (
                      <p className="flex items-center gap-1">
                        <Pizza /> Breakfast
                      </p>
                    )}
                    {parking && (
                      <p className="flex items-center gap-1">
                        <CiParking1 />
                        Parking
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.booking_grid__card_details}   flex flex-col gap-2 self-start justify-between h-full`}
                >
                  <p>Check-in: 2204-05-2023</p>
                  <p>Check-out: 2204-06-2023</p>
                  <p>Cost {price}</p>
                </div>
                <div className={styles.booking_grid__card_actions}>
                  delete update
                </div>
              </article>
            </li>
          )
        )}
      </ul>
    </section>
  );
};
