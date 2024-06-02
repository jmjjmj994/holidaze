import { Link } from 'react-router-dom';
import { Star } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { AppSkeletonCards } from './AppSkeletonCards';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { VenuesSchema, Venues } from 'src/client/validation/venues-schema';
import styles from './styles.module.css';

const fetchVenues = async ({ pageParam }: { pageParam: number }) => {
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/venues/?_owner=true&_bookings=true&page=${pageParam}`
    );
    const data = res.data.data.map((page: Venues[]) => page);
    const parsedData = VenuesSchema.safeParse(data);
    if (!parsedData.success) console.error(parsedData);
    return { data: parsedData.data, meta: res.data.meta };
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

export const App = () => {
  const [filteredVenues, setFilteredVenues] = useState<Venues[]>([]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['venues'],
    queryFn: fetchVenues,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextPage;
    },
  });

  useEffect(() => {
    if (!isFetching) {
      const allVenues = data?.pages?.flatMap((page) => page.data);
      const filterVenues = allVenues?.filter((venue) => {
        const imageUrl = venue?.media[0]?.url;
        if (!imageUrl) return false;
        return (
          venue?.location?.address &&
          venue?.location?.city &&
          venue?.location?.country &&
          venue.name.length < 30 &&
          venue.media.length > 0
        );
      });

      setFilteredVenues(filterVenues);
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
          <Link key={id} to={''}>
            <article className="flex flex-col gap-2" key={id}>
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
