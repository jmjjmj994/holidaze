import { options } from 'src/config/options';
import { useQuery } from '@tanstack/react-query';
import { VenueResponse } from '../validation/venueType';
import axios from 'axios';
const fetchVenue = async (id: string): Promise<VenueResponse> => {
  console.log(id);
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`,
      {
        headers: options.headers,
      }
    );
    return res.data;
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
