import { createContext, useEffect, useState, useCallback, useContext } from "react"

import * as auth from 'firebase/auth'
import { firebaseFront } from '../utils/firebaseFront'
import { FirebaseApp } from "firebase/app"
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"

export type Session = {
  session?: string
  user_auth?: DecodedIdToken
}

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
  session?: string,
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  const app = firebaseFront()
  const [user, setUser] = useState<auth.User>()

  const renewIdToken = useCallback((_user: auth.User) => {
    _user?.getIdToken()
      .then((_idToken) => {
        const cookieExpires = new Date(Date.now() + (5 * 60 * 1000))
        document.cookie =
          `uidt=${_idToken}; expires=${cookieExpires.toUTCString()}; path=/;`
      })
      .catch((err) => console.error(err))
  }, [])


  useEffect(() => {
    if (Boolean(session)) {
      document.cookie =
        `session=${session}; path=/;`
    }
  }, [session])


  useEffect(() => {
    const unsubscribeAuthState = auth.onAuthStateChanged(
      auth.getAuth(),
      (user) => {
        if (user) {
          setUser(user)
          renewIdToken(user)
        }
      },
    )
    return () => {
      unsubscribeAuthState()
    }
  }, [renewIdToken])


  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then(() => location.reload())
      .catch((err) => err)
  }

  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    return auth.signInWithEmailAndPassword(auth.getAuth(), email, password)
      .then(() => location.reload())
      .catch((err) => err)
  }

  const signOut = async () => {
    return auth.signOut(auth.getAuth())
      .then(() => {
        document.cookie =
          `uidt=''; expires=${new Date(Date.now()).toUTCString()}; path=/;`
        document.cookie =
          `session=''; expires=${new Date(Date.now()).toUTCString()}; path=/;`
        location.reload()
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


// function getCookie(cookie_name: string) {
//   let name = cookie_name + '=';
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// }





