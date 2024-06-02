import { Link } from 'react-router-dom';
import { Star } from 'phosphor-react';

type AppVenueCardsProps = {
  id: string;
  media: {
    url: string;
    alt: string;
  }[];
  location?: { city?: string | null };
  rating: number;
  price: number;
};

export const AppVenueCards: React.FC<AppVenueCardsProps> = ({
  id,
  media,
  location,
  rating,
  price,
}) => {
  return (
    <Link key={id} to={''}>
      <article className="flex flex-col gap-2">
        <div>
          <img
            loading="lazy"
            className="h-full w-full  aspect-square object-cover rounded-md"
            src={media[0].url}
            alt={`image of venue`}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <p>{location?.city}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star /> {Math.trunc(rating)}
          </div>
        </div>
        <div>
          <p>${price} night</p>
        </div>
      </article>
    </Link>
  );
};
