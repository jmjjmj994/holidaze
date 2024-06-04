import { options } from 'src/config/options';
import { useQuery } from '@tanstack/react-query';
import { Venue, VenueSchema, PartialVenueType } from '../validation/venues-schema';
import axios from 'axios';
const fetchVenue = async (id: string) => {
  console.log(id);
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`,
      {
        headers: options.headers,
      }
    );
    const parsedData = VenueSchema.safeParse(res.data.data);
    return parsedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useFetchVenue = (id: string) => {
  return useQuery({
    queryKey: ['venue', id],
    queryFn: () => fetchVenue(id),
  });
};
