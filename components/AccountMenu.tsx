import { CurrentUser } from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type AccountMenuProps = {
  visible: boolean;
  user?: CurrentUser;
};

export default function AccountMenu({ visible, user }: AccountMenuProps) {
  if (!visible) return null;
  return (
    <div className='bg-black w-56 absolute top-10 lg:top-14 right-0 py-5 flex flex-col border-2 border-gray-800'>
      <div className='flex flex-col gap-3'>
        <div className='px-3 group/item flex gap-3 items-center w-full cursor-pointer'>
          <Image
            src={user?.image || '/images/red_profile.webp'}
            alt='profile image'
            width='100'
            height='0'
            className='w-8 rounded h-auto'
            loading='eager'
          />
          <p className='text-slate-50 text-sm group-hover/item:underline'>
            {user?.name}
          </p>
        </div>
        <hr className='bg-gray-600 border-0 h-px my-4' />
        <button
          onClick={() => signOut()}
          className='px-3 text-center text-slate-50 text-sm hover:text-gray-400'
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
