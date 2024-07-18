import swr from 'swr';
import fetcher from '@/lib/fetcher';

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  favoritesIds: string[];
};
// This hook is used to get the current user
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = swr('/api/current', fetcher);

  return {
    data: data as CurrentUser,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
