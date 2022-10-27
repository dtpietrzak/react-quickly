'use client'

import { useFirebase } from "../hooks/useFirebase"

export const Button = () => {
  const auth = useFirebase().auth

  return (
    <button
      onClick={async () => {
        await auth.createUserWithEmailAndPassword('test3@test.com', 'password')
      }}
    >
      test create account
    </button>
  )
}

export default Button