'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

type PlayButtonProps = {
  movieId: string;
};

export default function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className='bg-slate-50 rounded-md py-[6.5px] px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center justify-center gap-1 hover:bg-neutral-300 transition-colors'
    >
      <FaPlay size={13} />
      <span>Play</span>
    </button>
  );
}
