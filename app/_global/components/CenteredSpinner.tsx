'use client'

import { FC } from 'react'
import { Spinner } from '@chakra-ui/react'

export const CenteredSpinner: FC = () => {

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  )
}

export default CenteredSpinner