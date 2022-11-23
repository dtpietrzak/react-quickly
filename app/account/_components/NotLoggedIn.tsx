'use client'

import { FC, useState } from 'react'
import { useFirebase } from '_global/hooks'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input, Button } from '@chakra-ui/react'
import { ref, set } from 'firebase/database'

const schema = z
  .object({
    userName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })

export const NotLoggedIn: FC = ({ }) => {
  const { auth, rtdb } = useFirebase()

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)


  return (
    <form className='flex flex-col'>
      <Input
        {...register('userName')}
        mb='2'
        placeholder='username'
      />
      <Input
        {...register('email')}
        mb='2'
        placeholder='email'
      />
      <Input
        {...register('password')}
        mb='2'
        placeholder='password'
        type='password'
      />
      <Input
        {...register('passwordConfirm')}
        mb='2'
        placeholder='confirm password'
        type='password'
      />
      <Button
        isLoading={isLoading}
        mb='2'
        value='create-account'
        onClick={handleSubmit(async (data) => {
          setIsLoading(true)
          try {
            await auth.createUserWithEmailAndPassword(
              data.email, data.password, { 
                noReload: true,
                displayName: data.userName,
              }
            )
            location.reload()
          } catch { } finally {
            setIsLoading(false)
          }
        })}
      >
        Create Account
      </Button>
      <Button
        isLoading={isLoading}
        mb='2'
        value='sign-in'
        onClick={handleSubmit(async (data) => {
          setIsLoading(true)
          try {
            await auth.signInWithEmailAndPassword(
              data.email, data.password,
            )
          } catch { } finally {
            setIsLoading(false)
          }
        })}
      >
        Or Sign In
      </Button>
    </form>
  )
}

export default NotLoggedIn