import { useEffect, useState } from 'react';
import { AppSkeletonCards } from './AppSkeletonCards';
import { useFetchVenues } from '../client/api/use-fetch-venues.hook';
import { AppVenueCards } from './AppVenueCards';
import styles from './styles.module.css';
import { Venue } from 'src/client/validation/venues-schema';

export const App = () => {
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useFetchVenues();
  useEffect(() => {
    if (!isFetching) {
      const allVenues = data?.pages?.flatMap((page) => page.data);
      setFilteredVenues(
        allVenues?.filter((venue) => {
          const imageUrl = venue?.media[0]?.url;
          if (!imageUrl) return false;
          return (
            venue?.location?.address &&
            venue?.location?.city &&
            venue?.location?.country &&
            venue.name.length < 30 &&
            venue.media.length > 0
          );
        }) || []
      );
    }
  }, [isFetching, data?.pages]);

  if (status === 'error') return <p>{error.message}</p>;

  return (
    <section>
      <section className={`${styles.app_grid}`}>
        {isFetching &&
          Array.from({ length: 30 }).map((_, i) => (
            <AppSkeletonCards key={i} />
          ))}

        {filteredVenues.map(({ id, media, location, rating, price }) => (
          <AppVenueCards
            id={id}
            media={media}
            location={location}
            rating={rating}
            price={price}
          />
        ))}
      </section>

      <div className="mt-20 flex items-center justify-center">
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage
            ? 'Loading more'
            : hasNextPage
            ? 'Load more'
            : 'Nothing more to load'}
        </button>
      </div>
    </section>
  );
};
