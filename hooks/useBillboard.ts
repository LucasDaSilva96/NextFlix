import swr from 'swr';
import fetcher from '@/lib/fetcher';

type Billboard = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
};

const useBillboard = () => {
  const { data, error, isLoading } = swr('/api/random', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data as Billboard,
    error,
    isLoading,
  };
};

export default useBillboard;
