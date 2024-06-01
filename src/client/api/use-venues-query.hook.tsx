import { useQuery } from '@tanstack/react-query';
import { VenuesSchema, Venues } from '../validation/venues-schema';
import { options } from 'src/config/options';
import axios from 'axios';
import { useCallback, useState } from 'react';

export const useVenuesQuery = () => {
  const [page, setPage] = useState(1);
  const handlePage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);
  const { isPending, data } = useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://v2.api.noroff.dev/holidaze/venues/?_owner=true&_bookings=true&page=${page}`,
          {
            headers: options.headers,
          }
        );
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
  });
   return { isPending, Error, data, handlePage }; 

};
