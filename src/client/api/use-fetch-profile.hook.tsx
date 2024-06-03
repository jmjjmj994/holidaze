import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { options } from 'src/config/options';
import { ProfileResponseSchema } from '../validation/profile-schema';

const fetchProfile = async (username: string) => {
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`,
      {
        headers: options.headers,
      }
    );
    const parsedData = ProfileResponseSchema.safeParse(res.data);
    if (!parsedData.success)
      console.error('error parsing profile:', parsedData);

    console.log(parsedData, 'parsed data here');

    return parsedData.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const useFetchProfile = (username: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetchProfile(username),
  });

  return { data, isLoading, error };
};
