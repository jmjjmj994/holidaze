import { useParams } from 'react-router-dom';
import { useFetchVenue } from 'src/client/api/use-fetch-venue.hook';
import { VenueDetails } from './VenueDetails';
import { VenueImage } from './VenueImage';
import { VenueForm } from './VenueForm';
import { Spinner } from 'src/components/ui/spinner/Spinner';
import { VenueSlider } from './VenueSlider';
export const Venue = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchVenue(id as string);
  if (isLoading) return <Spinner />;
  const venueData = data!.data;
  return (
    <section>
      <div className="flex">
        {venueData.media.length > 1 ? (
          <VenueSlider />
        ) : (
          <VenueImage media={data!.data.media} />
        )}
      </div>

      <div className="flex flex-col lg:flex-row justify-between">
        <VenueDetails
     
       
          description={venueData.description}
          location={venueData.location}
          maxGuests={venueData.maxGuests}
          meta={venueData.meta}
          owner={venueData.owner}
          name={venueData.name}
          price={venueData.price}
          rating={venueData.rating}
   
        />
        <VenueForm
          id={venueData.id}
          bookings={venueData.bookings}
          maxGuests={venueData.maxGuests}
        />
      </div>
    </section>
  );
};
