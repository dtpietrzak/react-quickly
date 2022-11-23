import { FC } from 'react'

import config from '../../config/config'

import Link from 'next/link'
import UserNav from './UserNav'

export interface NavBarProps {
  user_email?: string
}

export const NavBar: FC<NavBarProps> = ({ user_email }) => {

  return (
    <div className='h-[64px] w-full flex justify-between items-center px-8'>
      <div className=''>
        <Link href={config.HOMEPAGE}>
          react-quickly {user_email}
        </Link>
      </div>
      <div className=''>
        <UserNav userEmail={user_email} />
      </div>
    </div>
  )
}

export default NavBar