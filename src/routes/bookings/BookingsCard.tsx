import styles from './styles.module.css';
import { formatISO } from 'date-fns';
import {
  Users,
  Pizza,
  PawPrint,
  WifiHigh,
  ArrowsClockwise,
  TrashSimple,
} from 'phosphor-react';
import { CiParking1 } from 'react-icons/ci';

type BookingsCardProps = {
  media: {
    url: string;
    alt: string;
  }[];
  name: string;
  id: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    pets: boolean;
    breakfast: boolean;
  };
  maxGuests: number;
  dateFrom: string;
  dateTo: string;
  price: number;
};
export const BookingsCard: React.FC<BookingsCardProps> = ({
  media,
  name,
  price,
  dateFrom,
  dateTo,
  id,
  maxGuests,
  meta: { wifi, parking, pets, breakfast },
}) => {
  console.log(dateFrom);
  return (
    <li key={id}>
      <article
        className={`${styles.booking_grid__card} shadow-overlay border rounded-md px-2 py-2 `}
        key={id}
      >
        <div className={styles.booking_grid__card_img}>
          <img
            loading="lazy"
            className="h-full w-full  aspect-square object-cover rounded-md"
            src={media[0].url}
            alt=""
          />
        </div>
        <div className={styles.booking_grid__card_name}>
          <p className="inter-bold">Name of the venue:</p>
          <p>{name}</p>
        </div>
        <div className={styles.booking_grid__card_details}>
          <p className="inter-bold">Details</p>
          <p>${price}/night</p>
          <div className="flex flex-col">
            <span>
              Check in: {formatISO(dateFrom, { representation: 'date' })}
            </span>
            <span>
              Check out: {formatISO(dateTo, { representation: 'date' })}
            </span>
          </div>
        </div>
        <div className={`${styles.booking_grid__card__amenities} `}>
          <p className="inter-bold">Provided amenities;</p>
          <div className="flex flex-wrap gap-2">
            {wifi && (
              <p className="inline-flex flex-col  items-center gap-1 py-2 text-sm">
                <WifiHigh size={20} />
                Wifi
              </p>
            )}
            {pets && (
              <p className="inline-flex flex-col  items-center gap-1 py-2 text-sm">
                <PawPrint size={20} />
                Pets
              </p>
            )}
            {parking && (
              <p className="inline-flex flex-col  items-center gap-1 py-2 text-sm">
                <CiParking1 size={20} />
                Parking
              </p>
            )}
            {breakfast && (
              <p className="inline-flex flex-col  items-center gap-1 py-2 text-sm">
                <Pizza size={20} />
                Breakfast
              </p>
            )}
          </div>
          <div className="gap-1 py-2">
            <p className="inter-bold">Number of guests:</p>
            <div className="flex gap-1 items-center">
              <Users size={20} /> <p>{maxGuests}</p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.booking_grid__card_buttons} flex flex-wrap  gap-4`}
        >
          <button className="text-black p-2  bg-system-special-fill grow items-center inline-flex gap-2 justify-center border-system-special-strokeStrong border rounded-sm">
            <ArrowsClockwise size={20} className={styles.booking_update} />
            <p>Update</p>
          </button>
          <button className=" p-2  text-red-600  bg-system-error-fill gap-2 grow items-center inline-flex justify-center border-system-error-strokeStrong border rounded-sm">
            <TrashSimple size={20} className={styles.booking_delete} />
            <p>Delete venue</p>
          </button>
        </div>
      </article>
    </li>
  );
};
