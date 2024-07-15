import React, { forwardRef } from 'react';

type InputProps = {
  id: string;
  type: string;
  label: string;
  automaticComplete?: string;
};

const Input = forwardRef(function Input(
  { id, label, type, automaticComplete }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className='relative'>
      <input
        ref={ref}
        id={id}
        type={type}
        autoComplete={automaticComplete ? automaticComplete : 'off'}
        className='block rounded-md px-6 pt-6 pb-1 w-full text-md text-slate-50 bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
        placeholder=' '
      />
      <label
        htmlFor={id}
        className='absolute text-md duration-150 text-slate-50 transform -translate-y-3 scale-75 top-4 z-10 
        origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-slate-50/70'
      >
        {label}
      </label>
    </div>
  );
});

export default Input;
