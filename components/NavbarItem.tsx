import React from 'react';

type NavbarItemProps = {
  label: string;
};

export default function NavbarItem({ label }: NavbarItemProps) {
  return (
    <div className='text-slate-50 cursor-pointer hover:text-slate-300 transition'>
      {label}
    </div>
  );
}
