import { MapPin, Star, UsersFour } from 'phosphor-react';
import { VenueAmenities } from './VenueAmenities';
import { VenueOwner } from './VenueOwner';
export type VenueDetailsProps = {
  location: {
    address: string;
    city: string;
    country: string;
  };

  description: string;
  maxGuests: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    pets: boolean;
    breakfast: boolean;
  };
  price: number;
  rating: number;
  name: string;

  owner: {
    name: string;
    avatar: { url: string; alt: string };
    banner: { url: string; alt: string };
    bio: string;
    email: string;
  };
};

export const VenueDetails: React.FC<VenueDetailsProps> = ({
  description,
  location,
  maxGuests,
  meta,
  name,
  owner,
  price,
  rating,
}) => {
  console.log(meta);
  return (
    <section className="max-w-[40rem] w-full">
      <div className="">
        <p className="flex items-center gap-2">
          <MapPin weight="thin" />
          {location.address}, {location.city}, {location.country}
        </p>
      </div>
      <hr className="my-4" />
      <div>
        <h1>{name}</h1>
        <div className="flex gap-10 py-2 text-sm items-center">
          <p className="flex items-center">
            <UsersFour size={25} />
            {maxGuests} guests
          </p>
          <p className="flex items-center">
            <Star size={25} />
            {rating}
          </p>
          <p>${price}/night</p>
        </div>
      </div>
      <hr className="my-4" />
      <VenueOwner owner={owner} />
      <hr className="my-4" />
      <VenueAmenities
        wifi={meta.wifi}
        pets={meta.pets}
        parking={meta.parking}
        breakfast={meta.breakfast}
      />
      <hr className="my-4" />
      <div>
        <p className="inter-bold py-2">Description </p>
        <p>{description}</p>
      </div>
    </section>
  );
};
