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
  session: { session: string, expires: number }
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  const app = firebaseFront()
  const [user, setUser] = useState<auth.User>()
  const [idToken, setIdToken] = useState<string>()
  const [checkExpires, setCheckExpires] = useState<number>(0)

  const renewIdToken = useCallback((_user: auth.User) => {
    _user?.getIdToken()
      .then((_idToken) => {
        setIdToken(_idToken)

        const _checkExpires = new Date(Date.now() + (15 * 60 * 1000))
        setCheckExpires(_checkExpires.getTime())

        const cookieExpires = new Date(Date.now() + (60 * 60 * 1000))
        document.cookie =
          `uidt=${_idToken}; expires=${cookieExpires.toUTCString()}; path=/;`
      })
      .catch((err) => console.error(err))
  }, [])


  useEffect(() => {
    console.log(session)

    document.cookie =
      `session=${session.session}; path=/;`
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

  useEffect(() => {
    expirationTimer = setInterval(() => {
      if (
        user &&
        (
          checkExpires < Date.now() ||
          !getCookie('uidt')
        )
      ) {
        renewIdToken(user)
      }
    }, (60 * 5 * 1000))

    return () => clearInterval(expirationTimer)
  }, [renewIdToken, user, checkExpires])


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
        document.cookie =
          `uidt=''; expires=${new Date(Date.now()).toUTCString()}; path=/;`
        document.cookie =
          `session=''; expires=${new Date(Date.now()).toUTCString()}; path=/;`
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


let expirationTimer: NodeJS.Timer = null!


function getCookie(cookie_name: string) {
  let name = cookie_name + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}





