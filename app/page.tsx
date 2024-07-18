'use client';

import Billboard from '@/components/Billboard';
import Navbar from '@/components/Navbar';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const { data: user } = useCurrentUser();

  if (!session) {
    return redirect('/auth');
  }

  return (
    <main className=''>
      <Navbar user={user} />
      <Billboard />
    </main>
  );
}
