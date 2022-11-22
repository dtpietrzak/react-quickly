'use client'

import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"
import { AuthProvider } from "../contexts/authContext"

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