'use client';
import useBillboard from '@/hooks/useBillboard';
import React, { useEffect } from 'react';
import { CiCircleInfo } from 'react-icons/ci';
import SmallLoader from './SmallLoader';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

export default function Billboard() {
  const { data, isLoading } = useBillboard();
  const { openModal } = useInfoModal();

  const [screenWidth, setScreenWidth] = React.useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, []);

  if (!data) {
    return null;
  }
  const handleOpenModal = () => {
    openModal(data.id);
  };

  return (
    <article className='relative h-[56.25vw] xl:h-[45.25vw]'>
      <video
        autoPlay={screenWidth > 768 ? true : false}
        muted
        loop
        poster={data.thumbnailUrl}
        src={data.videoUrl}
        className='w-full h-full object-cover brightness-[60%]'
      ></video>
      <div className='absolute top-[30%]  ml-4 md:ml-16'>
        <h1 className='text-slate-50 text-xl md:text-2xl h-full max-w-[70%] lg:text-6xl font-bold drop-shadow-xl'>
          {data.title}
        </h1>

        <p className='text-slate-50 text-[8px] sm:text-base  mt-3 md:mt-8 max-w-[60%] drop-shadow-xl'>
          {data.description.split(' ').slice(0, 40).join(' ')}...
        </p>
        <div className='flex items-center gap-2 mt-3 md:mt-8'>
          <PlayButton movieId={data.id} />
          <button className='bg-neutral-50/50 rounded-md py-[6.5px] px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors'>
            <CiCircleInfo />
            <p onClick={handleOpenModal}>More info</p>
          </button>
        </div>
      </div>
      {isLoading && <SmallLoader size={36} />}
    </article>
  );
}
