'use client'

import React, { FC, PropsWithChildren } from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Header } from './header'
import Social from './social'
import BackButton from './back-button'

type Props = PropsWithChildren & {
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}
const CardWrapper: FC<Props> = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}) => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
