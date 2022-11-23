import Link from 'next/link'
import { FC } from 'react'

interface UserTagProps {
  userEmail?: string
}

export const UserTag: FC<UserTagProps> = ({ userEmail }) => {

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

export default UserTag