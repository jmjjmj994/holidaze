import { useParams } from 'react-router-dom';
import { useFetchVenue } from 'src/client/api/use-fetch-venue.hook';
import { VenueDetails } from './VenueDetails';
import { VenueImage } from './VenueImage';

export const Venue = () => {
  const { data. } = useParams();
  const { data, isLoading } = useFetchVenue(id as string);
  console.log(data);

  console.log(isLoading);
  if (isLoading) return <p>Loading..</p>;
  return (
    <section>
      <VenueImage media={data!.data!.media} />
      <div>
        <VenueDetails
          id={data.id}
          created={created}
          description={description}
          location={location}
          maxGuests={maxGuests}
          meta={meta}
          name={name}
          owner={owner}
          price={price}
          rating={rating}
          updated={updated}
        />
      </div>
    </section>
  );
};
