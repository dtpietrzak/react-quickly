import { FC } from 'react'
import SignOutButton from './SignOutButton'

export interface LoggedInProps {
  user_email?: string
}

export const LoggedIn: FC<LoggedInProps> = ({ user_email }) => {

  return (
    <>
      <p>
        {user_email}
      </p>
      <SignOutButton />
    </>
  )
}

export default LoggedIn