import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { options } from 'src/config/options';
import {
  ProfileResponse,
  Profile,
  ProfileSchema,
} from '../validation/profile-schema';
const fetchProfile = async (username: string): Promise<ProfileResponse> => {
  try {
    const res = await axios.get(
      `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`,
      {
        headers: options.headers,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const useFetchProfile = (username: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetchProfile(username),
  });

  return { data, isLoading, isError };
};
