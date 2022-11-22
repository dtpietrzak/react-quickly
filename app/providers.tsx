'use client'

import { AuthProvider } from "../contexts/authContext"

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}