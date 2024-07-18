'use client';
import useBillboard from '@/hooks/useBillboard';
import React from 'react';
import { CiCircleInfo } from 'react-icons/ci';
import SmallLoader from './SmallLoader';
import PlayButton from './PlayButton';

export default function Billboard() {
  const { data, error, isLoading } = useBillboard();

  if (!data) {
    return null;
  }

  return (
    <article className='relative h-[56.25vw] xl:h-[45.25vw]'>
      <video
        autoPlay
        muted
        loop
        poster={data.thumbnailUrl}
        src={data.videoUrl}
        className='w-full h-full object-cover brightness-[60%]'
      ></video>
      <div className='absolute top-[30%]  ml-4 md:ml-16'>
        <h1 className='text-slate-50 text-xl md:text-2xl h-full max-w-[70%] lg:text-6xl font-bold drop-shadow-xl'>
          {data.title}
        </h1>

        <p className='text-slate-50 text-[8px] sm:text-base  mt-3 md:mt-8 max-w-[60%] drop-shadow-xl'>
          {data.description.split(' ').slice(0, 40).join(' ')}...
        </p>
        <div className='flex items-center gap-2 mt-3 md:mt-8'>
          <PlayButton movieId={data.id} />
          <button className='bg-neutral-500 text-white flex items-center gap-1 p transition-all  text-sm md:text-base  px-4 py-2 rounded-md font-semibold hover:bg-opacity-75'>
            <CiCircleInfo />
            <p>More info</p>
          </button>
        </div>
      </div>
      {isLoading && <SmallLoader size={36} />}
    </article>
  );
}
