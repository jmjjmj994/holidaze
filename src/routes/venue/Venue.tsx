import { useParams } from 'react-router-dom';
import { useFetchVenue } from 'src/client/api/use-fetch-venue.hook';
import { VenueDetails } from './VenueDetails';
import { VenueImage } from './VenueImage';

export const Venue = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchVenue(id as string);
  console.log(data);

  console.log(isLoading);
  if (isLoading) return <p>Loading..</p>;
  return (
    <section>
      <VenueImage media={data!.data!.media} />
      <div>
        <VenueDetails
          id={data!.data!.id}
          created={data!.data!.created}
          description={data!.data!.description}
          location={data!.data!.location}
          maxGuests={data!.data!.maxGuests}
          meta={data!.data!.meta}
          name={data!.data!.name}
          owner={data!.data!.owner}
          price={data!.data!.price}
          rating={data!.data!.rating}
          updated={data!.data!.updated}
        />
      </div>
    </section>
  );
};
