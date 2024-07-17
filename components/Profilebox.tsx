'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import Image from 'next/image';
import React from 'react';
import profileImage from '@/public/images/red_profile.webp';
import { useRouter } from 'next/navigation';

type ProfileBoxProps = {
  image: string;
  name: string | null | undefined;
};

export default function ProfileBox() {
  const { data } = useCurrentUser();
  const router = useRouter();
  if (!data)
    return <h2 className='text-xl text-slate-50 text-center'>No user found</h2>;

  return (
    <article onClick={() => router.push('/')}>
      <div className='group flex-row w-44 mx-auto'>
        <div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden transition-all duration-200'>
          <Image
            src={data.image || profileImage}
            alt='profile icon'
            width='1000'
            height='0'
            className='max-w-44 max-h-44 h-auto w-auto'
          />
        </div>
        {data.name && (
          <p className='mt-4 text-gray-400 text-2xl group-hover:text-slate-50 text-center'>
            {data.name}
          </p>
        )}
      </div>
    </article>
  );
}
