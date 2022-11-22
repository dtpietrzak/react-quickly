'use client'

import { AuthProvider } from "../contexts/authContext"

interface ProvidersProps {
  children: React.ReactNode
  authProps: { session: string, expires: number }
}

export const Providers = ({ children, authProps }: ProvidersProps) => {
  return (
    <AuthProvider
      session={authProps}
    >
      {children}
    </AuthProvider>
  )
}