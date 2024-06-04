import { options } from 'src/config/options';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchVenue = async (id) => {
  const res = axios
    .get(
      `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`,
      {
        headers: options.headers,
      }
    )
    .then((res) => {
      console.log(res);
    });
};

export const useFetchVenue = (id:string) => {
  useQuery({
    queryKey: ['venue', id],
    queryFn: () => fetchVenue(id),
  });
};
