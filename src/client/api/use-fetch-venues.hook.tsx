import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  VenuesSchema,
  Venue,
  VenuesResponse,
} from 'src/client/validation/venues-schema';
const fetchVenues = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<VenuesResponse> => {
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/venues/?_owner=true&_bookings=true&page=${pageParam}`
    );
    const data = res.data.data.map((page: Venue[]) => page);
    const parsedData = VenuesSchema.safeParse(data);
    if (!parsedData.success) console.error(parsedData);
    return res.data;
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
