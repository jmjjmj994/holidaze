import styles from './styles.module.css';
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
};
export const BookingsCard: React.FC<BookingsCardProps> = ({
  media,
  name,
  id,
  maxGuests,
  meta: { wifi, parking, pets, breakfast },
}) => (
  <li key={id}>
    <article className={styles.booking_grid__card} key={id}>
      <div className={styles.booking_grid__card_img}>
        <img
          loading="lazy"
          className="h-full w-full  aspect-square object-cover rounded-md"
          src={media[0].url}
          alt=""
        />
      </div>
      <div className={styles.booking_grid__card_name}>
        <p>{name}</p>
      </div>
      <div className={`${styles.booking_grid__card__amenities} `}>
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
        <div className="flex items-center gap-1 py-2">
          <Users size={20} /> {maxGuests}
        </div>
      </div>
      <div
        className={`${styles.booking_grid__card_buttons} flex justify-between`}
      >
        <button className=" text-white p-2  bg-system-special-fill border-system-special-strokeStrong border rounded-sm">
          <ArrowsClockwise
            size={20}
            color="black"
            className={styles.booking_update}
          />
        </button>
        <button className="text-white p-2   bg-system-error-fill border-system-error-strokeStrong border rounded-sm">
          <TrashSimple
            size={20}
            color="red"
            className={styles.booking_delete}
          />
        </button>
      </div>
    </article>
  </li>
);
