'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const { data: user } = useCurrentUser();

  if (!session) {
    return redirect('/auth');
  }

  return (
    <main className=''>
      <h1 className='heading text-slate-100'>NextFlix</h1>

      <button className='bg-slate-50' onClick={() => signOut()}>
        Sign Out
      </button>
    </main>
  );
}
