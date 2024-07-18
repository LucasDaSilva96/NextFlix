import swr from 'swr';
import fetcher from '@/lib/fetcher';
import { Movie } from './useMovieList';

const useFavorites = () => {
  const { data, error, mutate } = swr('/api/favorite', fetcher);

  return {
    favorites: data as Movie[],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useFavorites;
