import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import CardWrapper from '@/components/auth/card-wrapper'

const AuthErrorPage = () => {
  return (
    <CardWrapper
      headerLabel='Oops! Something went wrong.'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='w-full items-center justify-center flex'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  )
}

export default AuthErrorPage
