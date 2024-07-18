import React from 'react';

type MobileMenuProps = {
  visible: boolean;
};

export default function MobileMenu({ visible }: MobileMenuProps) {
  if (!visible) return null;
  return (
    <aside className='bg-black w-56 absolute top-7 left-0 py-5 flex-col gap-3 border-2 border-gray-800 flex'>
      <div className='px-3 text-center text-slate-50 hover:underline transition'>
        Home
      </div>
      <div className='px-3 text-center text-slate-50 hover:underline transition'>
        Series
      </div>
      <div className='px-3 text-center text-slate-50 hover:underline transition'>
        Films
      </div>
      <div className='px-3 text-center text-slate-50 hover:underline transition'>
        New & Popular
      </div>
      <div className='px-3 text-center text-slate-50 hover:underline transition'>
        My List
      </div>
      <div className='px-3 text-center text-slate-50 hover:underline transition'>
        Browse bt Languages
      </div>
    </aside>
  );
}
