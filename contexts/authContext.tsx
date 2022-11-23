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

  const setSessionCookie = useCallback((_session?: string) => {
    // session has been passed to the client from the server
    if (Boolean(_session)) {


      if (getCookie('session')) { // session cookie is already set on the client
        return 'session already established'

      } else { // session cookie is NOT set on the client

        // we need to set the session cookie, and then reload the page so we get the server rendering as a session established user.
        document.cookie = `session=${_session}; path=/;`
        location.reload
        return 'new session established'

      }
    } else { // session not passed to the client from the server
      return 'no session established'
    }
  }, [])



  /**
   * It gets the user's ID token from Firebase, sets a cookie with it, and returns a string indicating whether the cookie was created or renewed
   * @param _user - auth.User
   * @returns A promise that resolves to a string or false.
   */
  const setIdTokenCookie = async (
    _user: auth.User | null
  ): Promise<
    'created' |
    'renewed' |
    'not-authed' |
    'session-authed' |
    false
  > => {
    if (getCookie('session')) return 'session-authed'

    if (_user) {
      return _user.getIdToken()
        .then((idToken) => {
          const renewal = Boolean(getCookie('uidt'))
          const cookieExpires = new Date(Date.now() + (5 * 60 * 1000))
          document.cookie =
            `uidt=${idToken}; expires=${cookieExpires.toUTCString()}; path=/;`
          return renewal ? 'renewed' : 'created'
        })
        .catch((err) => {
          console.error(err)
          return false
        })
    } else return 'not-authed'
  }

  useEffect(() => {
    console.log(setSessionCookie(session))
  }, [session, setSessionCookie])


  useEffect(() => {
    const unsubscribeAuthState = auth.onAuthStateChanged(
      auth.getAuth(),
      async (user) => {
        console.log(
          await setIdTokenCookie(user)
            .then((result) => {
              if (result === 'created') location.reload()
              return result
            })
        )
      },
    )
    return () => {
      unsubscribeAuthState()
    }
  }, [])


  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then((user) => {
        location.reload()
      })
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


let initialIdTokenCookieHasSet = false


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





