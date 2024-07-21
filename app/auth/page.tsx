'use client';
import BigLoader from '@/components/BigLoader';
import Input from '@/components/Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

enum Variant {
  login, // 0
  register, // 1
}

type Res = {
  error: string | null;
  status: number;
  ok: boolean;
  url: string | null;
};

export default function AuthPage() {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const [variant, setVariant] = React.useState<Variant>(Variant.login);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant(variant === Variant.login ? Variant.register : Variant.login);
  }, [variant]);

  const register = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) return;
    try {
      setLoading(true);
      if (
        !emailRef.current.value ||
        !passwordRef.current.value ||
        !nameRef.current.value
      ) {
        throw new Error('Missing fields');
      }

      await axios.post(
        '/api/auth/register',
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          name: nameRef.current.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Account created successfully');
      emailRef.current.value = '';
      passwordRef.current.value = '';
      nameRef.current.value = '';
      setVariant(Variant.login);
    } catch (err) {
      if (
        err instanceof Error &&
        err.message === 'Request failed with status code 400'
      ) {
        toast.error('Email already exists. Try logging in instead');
      } else {
        toast.error('Please fill in all fields and try again');
      }
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      if (!emailRef.current || !passwordRef.current) {
        throw new Error('Missing fields');
      }
      const req = await signIn('credentials', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        redirect: false,
      });
      if (req?.error) {
        throw new Error(req.error);
      }
      setLoading(false);
      return router.push('/profiles');
    } catch (error) {
      const { message } = error as Error;
      setLoading(false);
      toast.error(message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      const req = await signIn('github', {
        callbackUrl: '/profiles',
      });
      if (req?.error) {
        throw new Error(req.error);
      }
      setLoading(false);
    } catch (error) {
      const { message } = error as Error;
      setLoading(false);
      toast.error(message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const req = await signIn('google', {
        callbackUrl: '/profiles',
      });
      if (req?.error) {
        throw new Error(req.error);
      }
      setLoading(false);
    } catch (error) {
      const { message } = error as Error;
      setLoading(false);
      toast.error(message);
    }
  };

  return (
    <>
      <section className='relative min-h-screen w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
        <div className='bg-black w-full min-h-screen bg-opacity-50 '>
          <nav className='px-8 md:py-2 opacity-100 k'>
            <Image
              src='/images/logo.png'
              alt='Nextflix logo'
              width='100'
              height='0'
              priority
              className='max-w-[150px] max-h-[60px] md:max-w-[200px] md:max-h-[80px] h-auto w-auto'
            />
          </nav>
          <div className={`flex justify-center px-1 sm:px-6`}>
            <div className='bg-black bg-opacity-75 px-16 py-8  self-center mt-4 rounded-lg max-w-[550px] w-full'>
              <h1 className='text-slate-50 text-4xl mb-8 font-semibold'>
                {variant === 0 ? 'Sign in' : 'Register'}
              </h1>
              <div className='flex flex-col gap-8'>
                {variant === 1 && (
                  <Input
                    ref={nameRef}
                    type='text'
                    id='name'
                    label='Name'
                    automaticComplete='name'
                  />
                )}

                <Input
                  ref={emailRef}
                  type='email'
                  id='email'
                  label='Email'
                  automaticComplete='email'
                />
                <Input
                  ref={passwordRef}
                  type='password'
                  id='password'
                  label='Password'
                  automaticComplete='password'
                />
                {variant === 0 && (
                  <>
                    <button
                      onClick={login}
                      className='bg-red-600 text-slate-50 text-lg font-semibold rounded-md py-2 mt-6 hover:bg-red-500 transition-colors duration-150'
                    >
                      Login
                    </button>

                    <button
                      onClick={async () => {
                        emailRef.current!.value = process.env.DEMO_USER_EMAIL!;
                        passwordRef.current!.value =
                          process.env.DEMO_USER_PASSWORD!;
                        await login();
                      }}
                      className='bg-slate-50 text-black text-lg font-semibold rounded-md py-2 mt-6 hover:bg-slate-50/70 transition-colors duration-150'
                    >
                      Demo User
                    </button>
                  </>
                )}
                {variant === 1 && (
                  <button
                    onClick={register}
                    className='bg-red-600 text-slate-50 text-lg font-semibold rounded-md py-2 mt-6 hover:bg-red-500 transition-colors duration-150'
                  >
                    Sign up
                  </button>
                )}
              </div>
              <div className='w-full flex items-center justify-center pt-8 gap-6'>
                <div
                  onClick={handleGoogleSignIn}
                  className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity duration-150'
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={handleGithubSignIn}
                  className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity duration-150'
                >
                  <BsGithub size={30} />
                </div>
              </div>
              <p className='text-slate-50 mt-4 '>
                {variant === 0
                  ? 'First time using NextFlix?'
                  : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className='ml-1 text-red-500 cursor-pointer hover:underline transition-all duration-150 font-bold'
                >
                  {variant === 0 ? 'Create account' : 'Sign in'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading && <BigLoader size={70} />}
    </>
  );
}
