import Link from 'next/link'
import { FC } from 'react'

import { VscSettingsGear } from 'react-icons/vsc'

interface UserTagProps {
  userEmail?: string
}

export const UserTag: FC<UserTagProps> = ({ userEmail }) => {

  return (
    <Link href='/settings/account'>
      <VscSettingsGear />
    </Link>
  )
}

export default UserTag