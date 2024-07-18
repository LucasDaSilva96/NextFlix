'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { FaCheck } from 'react-icons/fa6';

type buttonProps = {
  movieId: string;
};

export default function FavoriteButton({ movieId }: buttonProps) {
  const { favorites, mutate: mutateFavorites } = useFavorites();
  const { data: user, mutate: mutateUserFavorites } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = user?.favoritesIds || [];

    return list.includes(movieId);
  }, [user.favoritesIds, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response: any;
    try {
      if (isFavorite) {
        response = await axios.delete('/api/favorite', {
          data: { movieId },
        });
      } else {
        response = await axios.post('/api/favorite', { movieId });
      }

      const updatedFavorites: string[] = response?.data?.favoritesIds;

      mutateUserFavorites({ ...user, favoritesIds: updatedFavorites });
      mutateFavorites();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred');
      }
    }
  }, [isFavorite, movieId, mutateFavorites, mutateUserFavorites, user]);

  const Icon = isFavorite ? FaCheck : IoAddOutline;

  return (
    <button
      onClick={toggleFavorite}
      className=' w-6 h-6 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all will-change-transform border-2 hover:scale-105 border-slate-50'
    >
      <Icon className='text-slate-50' />
    </button>
  );
}
