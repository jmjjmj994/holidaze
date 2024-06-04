type VenueDetailsProps = {
  id: string;
  created: string;
  location: {
    address: string;
    city: string;
  };
  maxGuests: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    pets: boolean;
    breakfast: boolean;
  };
  name: string;
  owner:
    | {
        avatar: {
          url: string;
          alt: string;
        };
        banner: {
          url: string;
          alt: string;
        };
        bio: string;
        email: string;
        name: string;
        price: number;
        rating: number;
        updated: string;
      }
    | undefined;
};

export const VenueDetails: React.FC<VenueDetailsProps> = (
  props: VenueDetailsProps
) => {
  const {
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
  } = props;

  return <article>hei</article>;
};
