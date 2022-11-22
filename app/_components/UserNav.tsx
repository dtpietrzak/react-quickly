import Link from 'next/link'
import { FC } from 'react'

interface UserNav {
  userEmail?: string
}

export const UserNav: FC<UserNav> = ({ userEmail }) => {

  return (
    <>
      <Link href='/account'>
        {
          userEmail ?
            userEmail : <p>Account</p>
        }
      </Link>
    </>
  )
}

export default UserNav