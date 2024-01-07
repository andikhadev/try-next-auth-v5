import React, { FC } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {
  href: string
  label: string
}

const BackButton: FC<Props> = ({ label, href }) => {
  return (
    <Button variant='link' size='sm' className='font-normal w-full' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default BackButton
