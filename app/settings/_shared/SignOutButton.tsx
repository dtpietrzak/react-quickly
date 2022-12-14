'use client'

import { FC } from 'react'
import { useFirebase } from '_global/hooks'

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