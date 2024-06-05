import { useParams } from 'react-router-dom';
import { useFetchVenue } from 'src/client/api/use-fetch-venue.hook';
import { VenueDetails } from './VenueDetails';
import { VenueImage } from './VenueImage';
import { VenueCalendar } from './VenueCalendar';
import { VenueForm } from './VenueForm';
import { Spinner } from 'src/components/ui/spinner/Spinner';
export const Venue = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchVenue(id as string);
  if (isLoading) return <Spinner />;
  const venueData = data!.data;
  console.log(venueData.media);
  return (
    <section>
      <VenueImage media={data!.data.media} />
      <div>
        <VenueDetails
          id={venueData.id}
          created={venueData.created}
          description={venueData.description}
          location={venueData.location}
          maxGuests={venueData.maxGuests}
          meta={venueData.meta}
          owner={venueData.owner}
          name={venueData.name}
          price={venueData.price}
          rating={venueData.rating}
          updated={venueData.updated}
        />
        <VenueForm bookings={venueData.bookings} />
      </div>
    </section>
  );
};
