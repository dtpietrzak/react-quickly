import { FC } from 'react'

import config from '_global/config/config'

import Link from 'next/link'
import UserTag from './UserTag'

export interface NavBarProps {
  email?: string
  display_name?: string
}

export const NavBar: FC<NavBarProps> = ({ email, display_name }) => {

  return (
    <div className='h-[64px] w-full flex justify-between items-center px-8'>
      <div className=''>
        <Link href={config.HOMEPAGE}>
          react-quickly {display_name}
        </Link>
      </div>
      <div className=''>
        <UserTag userEmail={email} />
      </div>
    </div>
  )
}

export default NavBar