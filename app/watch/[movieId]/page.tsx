'use client';

import BigLoader from '@/components/BigLoader';
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
export default function WatchMoviePage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;
  const { movie } = useMovie(movieId);
  const router = useRouter();
  const [isPLaying, setIsPlaying] = React.useState(false);

  if (!movie) {
    return <BigLoader size={100} />;
  }

  return (
    <section className='bg-black w-screen h-screen text-slate-50'>
      <nav
        className={`fixed w-full p-4 z-10 flex items-center gap-8 bg-opacity-70 bg-black transition-all duration-200 hover:opacity-100 ${
          isPLaying ? 'opacity-10' : 'opacity-100'
        }`}
      >
        <FaArrowLeft
          size={26}
          onClick={() => router.back()}
          className='cursor-pointer'
        />
        <p className='text-xl md:text-3xl font-bold'>
          <span className='font-light'>Watching: </span>
          {movie.title}
        </p>
      </nav>
      <video
        className='w-screen h-screen absolute inset-0'
        autoPlay
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        src={movie.videoUrl}
      ></video>
    </section>
  );
}
