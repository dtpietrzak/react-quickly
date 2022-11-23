'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '_global/contexts/authContext'

interface ProvidersProps {
  children: React.ReactNode
  session?: string
}

export const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <AuthProvider session={session}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </AuthProvider>
  )
}