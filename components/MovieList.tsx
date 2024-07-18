import { Movie } from '@/hooks/useMovieList';
import React from 'react';
import MovieCard from './MovieCard';

type MovieListProps = {
  title: string;
  movies: Movie[];
};

export default function MovieList({ title, movies }: MovieListProps) {
  return (
    <div className='px-4 md:px-12 mt-4 space-y-8 min-h-[60vh]'>
      <div>
        <h2 className='text-slate-50 text-md md:text-xl lg:text-2xl font-semibold mb-4'>
          {title}
        </h2>
        <div className='grid grid-cols-4 gap-2'>
          {movies &&
            movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
        </div>
      </div>
    </div>
  );
}
