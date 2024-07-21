'use client';

import { Movie } from '@/hooks/useMovieList';
import Image from 'next/image';
import React from 'react';
import FavoriteButton from './FavoriteButton';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';
import { CiCircleInfo } from 'react-icons/ci';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { openModal } = useInfoModal();

  const handleOpenModal = () => {
    openModal(movie.id);
  };

  return (
    <div>
      <article className='group bg-zinc-900 col-span relative h-[300px] min-w-[250px]'>
        <Image
          src={movie.thumbnailUrl}
          alt={movie.title}
          fill
          className='cursor-pointer object-cover transition-all duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0  w-full h-[12vw]'
        />
        <div className='opacity-0 absolute top-0 transition-all duration-200 z-10 invisible sm:visible w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[5px] group-hover:translate-x-[2vw] group-hover:opacity-100'>
          <div className='relative w-full h-[12vw]'>
            <Image
              src={movie.thumbnailUrl}
              alt={movie.title}
              fill
              className=' rounded-md object-cover '
            />
          </div>

          <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition-all shadow-md rounded-b-md'>
            <div className='flex items-center gap-3'>
              <PlayButton movieId={movie.id} />
              <FavoriteButton movieId={movie.id} />

              <CiCircleInfo
                onClick={handleOpenModal}
                className=' ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 text-slate-50 cursor-pointer hover:text-neutral-300'
              />
            </div>
            <h3 className='mt-4 font-semibold text-green-400'>
              New{' '}
              <span className='text-slate-50'>{new Date().getFullYear()}</span>
            </h3>
            <div className='flex  mt-4 gap-2 items-center'>
              <p className='text-slate-50 text-[10px] lg:text-sm'>
                {movie.duration}
              </p>
            </div>
            <div className='flex  mt-4 gap-2 items-center'>
              <p className='text-slate-50 text-[10px] lg:text-sm'>
                {movie.genre}
              </p>
            </div>
          </div>
        </div>
      </article>
      <button
        onClick={handleOpenModal}
        className=' bg-neutral-50/50 rounded-md py-[6.5px]  w-full mt-2 text-xs lg:text-lg font-semibold  justify-center gap-1 hover:bg-slate-50 transition-colors flex items-center md:hidden'
      >
        <CiCircleInfo /> <span className='text-black'>More Info</span>
      </button>
    </div>
  );
}
