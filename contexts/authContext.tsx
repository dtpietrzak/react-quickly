import { createContext, useEffect, useState, useCallback, useContext } from "react"

import * as auth from 'firebase/auth'
import { firebaseFront } from '../utils/firebaseFront'
import { FirebaseApp } from "firebase/app"

export type AuthContextProps = {
  app: FirebaseApp

  user?: auth.User

  auth: {
    createUserWithEmailAndPassword: (email: string, password: string) => Promise<auth.UserCredential>

    signInWithEmailAndPassword: (email: string, password: string) => Promise<auth.UserCredential>

    signOut: () => Promise<void>
  }
}

export const AuthContext = createContext<AuthContextProps>(undefined!)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const app = firebaseFront()
  const [user, setUser] = useState<auth.User>()
  const [idToken, setIdToken] = useState<string>()

  const renewIdToken = useCallback((_user: auth.User) => {
    if (!idToken) {
      _user?.getIdToken()
        .then((_idToken) => {
          
        })
        .catch((err) => console.error(err))
    }
  }, [idToken])


  useEffect(() => {
    const unsubscribeAuthState = auth.onAuthStateChanged(
      auth.getAuth(),
      (user) => { if (user) setUser(user) },
    )

    return () => {
      unsubscribeAuthState()
    }
  }, [])


  const updateToken = (_idToken: string) => {
    setIdToken(_idToken)
    document.cookie = `uidt=${_idToken}; expires=${new Date(Date.now() + 60 * 60 * 1000).toUTCString()}; path=/;`
  }


  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then(async (res) => {
        setUser(res.user)
        return res
      })
      .catch((err) => err)
  }

  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    return auth.signInWithEmailAndPassword(auth.getAuth(), email, password)
      .then(async (res) => {
        setUser(res.user)
        return res
      })
      .catch((err) => err)
  }

  const signOut = async () => {
    return auth.signOut(auth.getAuth())
      .then(async (res) => {
        setUser(undefined)
        return res
      })
      .catch((err) => err)
  }


  return (
    <AuthContext.Provider
      value={{
        app,
        user,
        auth: {
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export const useFirebase = () => {
  const firebase = useContext(AuthContext)
  return firebase
}