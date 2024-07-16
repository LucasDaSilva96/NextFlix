import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import React from 'react';

type Props = {
  size: number;
};

export default function SmallLoader({ size }: Props) {
  return (
    <div className='z-50'>
      <AiOutlineLoading3Quarters
        size={size}
        className='animate-spin text-red-600'
      />
    </div>
  );
}
