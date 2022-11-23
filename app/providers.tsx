'use client'

import { AuthProvider } from '_global/contexts/authContext'

interface ProvidersProps {
  children: React.ReactNode
  session?: string
}

export const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <AuthProvider
      session={session}
    >
      {children}
    </AuthProvider>
  )
}