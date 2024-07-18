'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import NavbarItem from './NavbarItem';
import { GoChevronDown } from 'react-icons/go';
import MobileMenu from './MobileMenu';
import { GoSearch } from 'react-icons/go';
import { FiBell } from 'react-icons/fi';
import { CurrentUser } from '@/hooks/useCurrentUser';
import AccountMenu from './AccountMenu';

type NavbarProps = {
  user?: CurrentUser;
};

const TOP_OFFSET = 66;

export default function Navbar({ user }: NavbarProps) {
  const [visible, setVisible] = React.useState(false);
  const [openAccountMenu, setOpenAccountMenu] = React.useState(false);
  const [background, setBackground] = React.useState(false);

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  const toggleAccountMenu = () => {
    setOpenAccountMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    console.log(background);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='w-full fixed z-50'>
      <div
        className={`px-2 md:px-16 flex items-center transition duration-500 ${
          background ? ' bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <Image
          src='/images/logo.png'
          alt='Netflix logo'
          width='100'
          height='0'
          priority
          className='max-w-[150px] max-h-[90px]'
        />
        <div className='ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by language' />
        </div>

        <div className='lg:hidden  cursor-pointer relative'>
          <div className='flex items-center gap-1 ml-8' onClick={toggleVisible}>
            <p className='text-slate-50 text-sm'>Browse</p>

            <GoChevronDown
              className={`text-slate-50  mt-1 transition-all duration-150 ${
                visible ? 'rotate-[180deg]' : 'rotate-0'
              }`}
            />
          </div>
          <MobileMenu visible={visible} />
        </div>

        <div className='flex ml-auto gap-7 items-center'>
          <p className='text-gray-200 hover:text-gray-400 cursor-pointer transition-all'>
            <GoSearch size={22} />
          </p>
          <p className='text-gray-200 hover:text-gray-400 cursor-pointer transition-all'>
            <FiBell size={22} />
          </p>

          <div className='relative'>
            <div
              onClick={toggleAccountMenu}
              className='flex items-center gap-1 cursor-pointer'
            >
              <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-sm lg:rounded-md overflow-hidden relative'>
                <Image
                  src={user?.image || '/images/red_profile.webp'}
                  alt='profile icon'
                  fill
                  sizes='100'
                />
              </div>

              <GoChevronDown
                className={`text-slate-50 transition mt-1 ${
                  openAccountMenu ? 'rotate-[180deg]' : 'rotate-0'
                }`}
              />
            </div>
            <AccountMenu user={user} visible={openAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
