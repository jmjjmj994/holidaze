import { MapPin, Star, UsersFour } from 'phosphor-react';
import { VenueAmenities } from './VenueAmenities';
import { VenueOwner } from './VenueOwner';
export type VenueDetailsProps = {
  id: string;
  created: string;
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
  updated: string;
  owner: {
    name: string;
    avatar: { url: string; alt: string };
    banner: { url: string; alt: string };
    bio: string;
    email: string;
  };
};

export const VenueDetails: React.FC<VenueDetailsProps> = ({
  id,
  created,
  description,
  location,
  maxGuests,
  meta,
  name,
  owner,
  price,
  rating,
  updated,
}) => {
  console.log(meta);
  return (
    <section>
      <div>
        <p className="flex items-center gap-2">
          <MapPin weight="thin" />
          {location.address}, {location.city}, {location.country}
        </p>
      </div>
      <div className="bg-orange-300">
        <h1>{name}</h1>
        <div className="flex">
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
      <VenueOwner owner={owner} />
      <VenueAmenities
        wifi={meta.wifi}
        pets={meta.pets}
        parking={meta.parking}
        breakfast={meta.breakfast}
      />

      <div>
        <p className="inter-bold">Description </p>
        <p>{description}</p>
      </div>
    </section>
  );
};
