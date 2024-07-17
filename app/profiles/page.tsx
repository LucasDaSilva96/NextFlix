import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import ProfileBox from '@/components/Profilebox';

export default async function ProfilesPage() {
  const session = await getServerSession();

  if (!session) {
    return redirect('/auth');
  }
  return (
    <section className='w-screen h-screen overflow-clip flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl md:text-6xl text-slate-50 text-center'>
          Who is watching?
        </h1>
        <div className='flex items-center justify-center gap-8 mt-5'>
          <ProfileBox />
        </div>
      </div>
    </section>
  );
}
