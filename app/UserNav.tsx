'use client'

import Link from 'next/link'
import { FC, useContext } from 'react'
import { useFirebase } from '../contexts/authContext'

export const UserNav: FC = ({ }) => {
  const { user } = useFirebase()


  return (
    <>
      <Link href='/account'>
        {
          user ?
            user.email
            :
            <p>Account</p>
        }
      </Link>
    </>
  )
}

export default UserNav