'use client'

import { useRouter } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export const LoginButton: FC<Props> = ({
  mode = 'redirect',
  asChild = false,
  children,
}) => {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/login')
  }

  if (mode === 'modal') {
    return <span>{/* TODO: Implement this */}</span>
  }

  return (
    <span className='cursor-pointer' onClick={onClick}>
      {children}
    </span>
  )
}
