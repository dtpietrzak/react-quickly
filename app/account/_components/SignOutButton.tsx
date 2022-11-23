'use client'

import { FC } from 'react'
import { useFirebase } from '../../../contexts/authContext'

export const SignOutButton: FC = () => {
  const { auth } = useFirebase()

  return (
    <>
      <button
        onClick={() => {
          auth.signOut()
        }}
      >
        Sign Out
      </button>
    </>
  )
}

export default SignOutButton