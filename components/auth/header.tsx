import { Poppins } from 'next/font/google'
import React, { FC } from 'react'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

type Props = {
  label: string
}

export const Header: FC<Props> = ({ label }) => {
  return (
    <div className='w-full flex flex-col gap-y-4 justify-center items-center'>
      <h1 className={cn('text-3xl font-semibold', font.className)}>Auth</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}
