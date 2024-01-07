import { CheckCircledIcon } from '@radix-ui/react-icons'
import React, { FC } from 'react'

type Props = {
  message?: string
}
const FormSuccess: FC<Props> = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className='bg-emerald-500/15 p-3 rounded flex items-center gap-x-2 text-sm text-emerald-500'>
      <CheckCircledIcon className='w-4 h-4' />
      <p>{message}</p>
    </div>
  )
}

export default FormSuccess
