import { FC } from 'react'

import config from '_global/config/config'

import Link from 'next/link'
import UserTag from './UserTag'

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
        <UserTag userEmail={user_email} />
      </div>
    </div>
  )
}

export default NavBar