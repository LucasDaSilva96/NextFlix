import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import FavoriteButton from './FavoriteButton';
import PlayButton from './PlayButton';
import useMovie from '@/hooks/useMovie';
import useInfoModal from '@/hooks/useInfoModal';

type InfoModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const { movieId } = useInfoModal();
  const { movie } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isVisible || !movie) return null;

  return (
    <div className='z-[100] duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 px-2 md:px-0'>
      <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
        <div
          className={`${
            isVisible ? 'scale-100' : 'scale-0'
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className='relative h-96'>
            <video
              src={movie?.videoUrl}
              poster={movie?.thumbnailUrl}
              className='w-full brightness-[60&] h-full object-cover'
            ></video>
            <div className='absolute top-3 right-3 w-10 h-10 rounded-full bg-opacity-70 bg-black flex items-center justify-center'>
              <button onClick={handleClose}>
                <IoMdClose className='text-slate-50 text-2xl' />
              </button>
            </div>

            <div className='absolute bottom-[10%] left-10'>
              <h2 className='text-slate-50 text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                {movie?.title}
              </h2>

              <div className='flex flex-row items-center gap-4'>
                <PlayButton movieId={movie.id} />
                <FavoriteButton movieId={movie.id} />
              </div>
            </div>
          </div>

          <div className='px-12 py-8'>
            <h3 className='text-green-400 font-semibold text-lg'>New</h3>
            <p className='text-slate-50 text-lg'>{movie?.duration}</p>
            <p className='text-slate-50 text-lg'>{movie?.genre}</p>
            <p className='text-slate-50 text-lg max-h-[100px] overflow-y-auto'>
              {movie?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
