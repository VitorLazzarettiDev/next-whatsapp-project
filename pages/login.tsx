import { Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth, provider } from '../firebase';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError('');
    setLoading(false);
  }, [email, password]);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(() => router.replace('/'))
      .catch((error) => { setError(error.message); setLoading(false); });
  };

  const loginWithEmail = () => {
    if (error) return;
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.replace('/'))
      .catch((error) => { setError(error.message); setLoading(false); });
  };


  return (
    <div className='flex items-center justify-center w-full h-screen bg-neutral-900 relative'>
      <Head>
        <title> Login </title>
      </Head>

      <div className='h-24 w-24 absolute top-2 right-2 bg-connectme-logo z-30 bg-cover rounded-full'></div>

      <div className='flex-1 bg-leaves-background bg-cover bg-no-repeat h-full bg-right-top'></div>

      <div className='h-full flex-[2] flex items-center justify-center bg-gradient-to-tr from-zinc-800 to-black'>
        <div className='flex h-full flex-col max-w-xl justify-around w-full min-w-96 py-16 px-8'>
          <div className='flex flex-col relative justify-end'>
            <h1 className='text-5xl font-bold'> ConnectMe </h1>
            <p className='ml-1'> The best chatting app that you ever seen </p>
            {error && <div className='text-red-400 absolute bottom-[-50px]'>{error}</div>}
          </div>

          <div id='general-form' className='flex flex-col justify-center'>
            <div id='login' className=' flex flex-col justify-center space-y-4'>
              <h3 className='text-gray-300 py-2'>Login into an account</h3>
              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                size='medium'
                value={email}
                error={error.length > 0}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label='Password'
                variant='outlined'
                fullWidth
                size='medium'
                type='password'
                value={password}
                error={error.length > 0}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='flex flex-col w-full'>
                <LoadingButton
                  loading={loading}
                  disabled={error.length > 0}
                  variant='contained'
                  size='large'
                  onClick={loginWithEmail}
                >
                  <span>Login</span>
                </LoadingButton>
                <Link href={'/signUp'} className='m-[2px] font-light text-yellow-500 text-sm'> Don't have an account? Sign Up </Link>
              </div>

            </div>
          </div>
          <div className='flex flex-col justify-start items-center space-x-3'>
            <h3 className='text-yellow-500 p-2 ml-3 my-4 text-xl'> Social Login </h3>
            <div className='flex space-x-4'>
              <Button
                onClick={signIn}
                startIcon={<GoogleIcon />}
                variant='outlined'
                size='large'
              >
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;