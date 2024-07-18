'use client';
import useBillboard from '@/hooks/useBillboard';
import React from 'react';
import { CiCircleInfo } from 'react-icons/ci';

export default function Billboard() {
  const { data, error, isLoading } = useBillboard();

  if (!data) {
    return null;
  }

  console.log(data.thumbnailUrl);
  return (
    <article className='relative h-[36.25vw]'>
      <video
        autoPlay
        muted
        loop
        poster={data.thumbnailUrl}
        src={data.videoUrl}
        className='w-full h-full object-cover brightness-[60%]'
      ></video>
      <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
        <p className='text-slate-50 text-xl md:text-5xl h-full max-w-[70%] lg:text-6xl font-bold drop-shadow-xl'>
          {data.title}
        </p>

        <p className='text-slate-50 text-[8px] sm:text-base md:text-lg mt-3 md:mt-8 max-w-[60%] drop-shadow-xl'>
          {data.description}
        </p>
        <button className='bg-red-700 text-white flex items-center gap-1 p transition-all  text-sm md:text-base mt-3 md:mt-8 px-4 py-2 rounded-md font-semibold hover:bg-opacity-75'>
          <CiCircleInfo />
          <p>More info</p>
        </button>
      </div>
    </article>
  );
}
