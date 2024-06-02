import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  VenuesSchema} from 'src/client/validation/venues-schema';
const fetchVenues = async ({ pageParam }: { pageParam: number }) => {
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/venues/?_owner=true&_bookings=true&page=${pageParam}`
    );
    const parsedData = VenuesSchema.safeParse(res.data);
    if (!parsedData.success) throw new Error('Error in validation');
    return parsedData.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};
export const useFetchVenues = () => {
  return useInfiniteQuery({
    queryKey: ['venues'],
    queryFn: fetchVenues,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.nextPage;
    },
  });
};
