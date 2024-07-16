import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type Props = {
  size: number;
};
export default function BigLoader({ size }: Props) {
  return (
    <div className='z-50 fixed inset-0 backdrop-blur-md flex items-center justify-center'>
      <AiOutlineLoading3Quarters
        size={size}
        className='animate-spin text-red-600'
      />
    </div>
  );
}
