import swr from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from '@prisma/client';

const useMovie = (id?: string) => {
  const { data, error, mutate } = swr(`/api/movies/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    movie: data as Movie,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useMovie;
