import fetcher from '@/lib/fetcher';
import swr from 'swr';

export type Movie = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
};

const useMovieList = () => {
  const { data, error } = swr('/api/movies', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    movies: data as Movie[],
    isError: error,
  };
};

export default useMovieList;
