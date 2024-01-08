'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

import { Button } from '../ui/button'

const Social = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        variant='outline'
        className='w-full'
        onClick={() => {
          onClick('google')
        }}
      >
        <FcGoogle />
      </Button>
      <Button
        size='lg'
        variant='outline'
        className='w-full'
        onClick={() => {
          onClick('github')
        }}
      >
        <FaGithub />
      </Button>
    </div>
  )
}

export default Social
