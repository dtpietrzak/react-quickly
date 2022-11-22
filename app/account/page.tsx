'use client'

import { useState } from 'react'
import { useFirebase } from '../../contexts/authContext'

export default function Page() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { auth, user } = useFirebase()

  return (

    <>
      <h1>account page</h1>
      {
        !user ?
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
          :
          <>
            <p>
              {user.email}
            </p>
            <button
              onClick={() => {
                auth.signOut()
              }}
            >
              Sign Out
            </button>
          </>
      }
    </>

  )
}