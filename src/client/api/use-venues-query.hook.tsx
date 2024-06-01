import { useQuery } from '@tanstack/react-query';
import { VenuesSchema, Venues } from '../validation/venues-schema';
import { options } from 'src/config/options';

export const useVenuesQuery = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      return fetch(
        `https://v2.api.noroff.dev/holidaze/venues/?_owner=true&_bookings=true&page=1`,
        {
          headers: options.headers,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response not ok');
          }
          return response.json();
        })
        .then((results) => {
          const { data, meta } = results; 
          const parsedData = VenuesSchema.safeParse(data);
          if (!parsedData.success)
            console.error('Zod parse error in use-venues-query');
          return { data: parsedData.data, meta: meta };
        })
        .catch((error) => {
          throw new Error(`Error fetching venues ${error.message}`);
        });
    },
  });
  return { isPending, isError, data };
};
