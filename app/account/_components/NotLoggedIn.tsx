'use client'

import { FC, useState } from 'react'
import { useFirebase } from '../../../contexts/authContext'

export const NotLoggedIn: FC = ({ }) => {
  const { auth } = useFirebase()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          auth.createUserWithEmailAndPassword(
            email, password,
          )
        }}
      >
        Create Account
      </button>
      <button
        onClick={() => {
          auth.signInWithEmailAndPassword(
            email, password,
          )
        }}
      >
        Sign In
      </button>
    </>
  )
}

export default NotLoggedIn