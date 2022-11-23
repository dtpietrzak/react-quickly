'use client'

import { FC, useState } from 'react'
import { useFirebase } from '_global/contexts/authContext'

import { useForm } from 'react-hook-form'


const formDefaults = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

export const NotLoggedIn: FC = ({ }) => {
  const { auth } = useFirebase()

  const { control } = useForm<typeof formDefaults>({
    defaultValues: formDefaults
  })

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div
      className='flex flex-col'
    >
      <input
        className='mb-2'
        placeholder='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='mb-2'
        placeholder='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='mb-2'
        placeholder='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className='mb-2'
        onClick={() => {
          auth.createUserWithEmailAndPassword(
            email, password,
          )
        }}
      >
        Create Account
      </button>
      <button
        className='mb-2'
        onClick={() => {
          auth.signInWithEmailAndPassword(
            email, password,
          )
        }}
      >
        Or Sign In
      </button>
    </div>
  )
}

export default NotLoggedIn