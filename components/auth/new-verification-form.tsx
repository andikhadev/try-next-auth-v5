'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'

import { verifyToken } from '@/actions/new-verification'

import CardWrapper from './card-wrapper'
import FormSuccess from '../form-success'
import FormError from '../form-error'

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token) {
      setError('Missing token')
      return
    }

    verifyToken(token).then((data) => {
      setSuccess(data.success)
      setError(data.error)
    })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      {!success && !error && (
        <div className='flex items-center justify-center w-full'>
          <BeatLoader />
        </div>
      )}
      {!error && success && <FormSuccess message={success} />}
      {!success && error && <FormError message={error} />}
    </CardWrapper>
  )
}
