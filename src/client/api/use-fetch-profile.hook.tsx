import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { options } from 'src/config/options';
import { ProfileResponseSchema } from '../validation/profile-schema';
import { ProfileResponse } from '../validation/profileType';

const fetchProfile = async (username: string):Promise<ProfileResponse> => {
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`,
      {
        headers: options.headers,
      }
    );
   return res.data
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
