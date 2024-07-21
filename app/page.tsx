'use client';

import Billboard from '@/components/Billboard';
import InfoModal from '@/components/InfoModal';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import useMovieList from '@/hooks/useMovieList';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const { data: user } = useCurrentUser();
  const { movies } = useMovieList();
  const { favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  if (!session) {
    return redirect('/auth');
  }

  return (
    <main className=''>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={user} />
      <Billboard />
      <div className='pt-10'>
        {movies && <MovieList title='Trending now' movies={movies} />}
      </div>
      <div className=''>
        {favorites?.length > 0 && (
          <MovieList title='My List' movies={favorites} />
        )}
      </div>
    </main>
  );
}
