import { createContext, useEffect, useState, useCallback, useContext } from 'react'

import * as auth from 'firebase/auth'
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { firebaseFront } from '_global/utils/firebaseFront'

export type Session = {
  session?: string
  user_auth?: DecodedIdToken
}

export type AuthContextProps = {
  user?: auth.User

  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    options?: {
      noReload?: boolean,
      displayName?: string,
      photoURL?: string,
    }
  ) => Promise<auth.UserCredential>

  signInWithEmailAndPassword: (email: string, password: string) => Promise<auth.UserCredential>

  deleteUser: (user: auth.User) => Promise<void>

  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>(undefined!)

type AuthProviderProps = {
  children: React.ReactNode
  session?: string,
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  const [user, setUser] = useState<auth.User>()
  const [noReload, setNoReload] = useState<boolean>(false)


  // this ensures that the firebase app is initialized before this provider uses it, don't want a race condition of needing to use useFirebase before using this provider. The app itself is cached, so no worries about duplication.
  useEffect(() => {
    if (!firebaseInit) {
      firebaseInit = true
      firebaseFront()
    }
  }, [])


  /**
   * It takes a session token and attempts to make a session cookie with it, the function returns a string about what happened:
   * 'new session established' | 'session already established' | 'no session established'
   * @param _session - string (session token)
   * @returns A promise that resolves to a string.
   */
  const setSessionCookie = useCallback((_session?: string) => {
    // session has been passed to the client from the server
    if (Boolean(_session)) {


      if (getCookie('session')) { // session cookie is already set on the client
        return 'session already established'

      } else { // session cookie is NOT set on the client

        // we need to set the session cookie, and then reload the page so we get the server rendering as a session established user.
        document.cookie = `session=${_session}; path=/;`
        !noReload && location.reload()
        return 'new session established'

      }
    } else { // session not passed to the client from the server
      return 'no session established'
    }
  }, [noReload])



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
    setSessionCookie(session)
  }, [session, setSessionCookie])


  useEffect(() => {
    if (!authListenerInit) {
      authListenerInit = true

      const unsubscribeAuthState = auth.onAuthStateChanged(
        auth.getAuth(),
        async (_user) => {
          if (_user) setUser(_user)
          setIdTokenCookie(_user)
            .then((result) => {
              result === 'created' && !noReload && location.reload()
              return result
            })
        },
      )

      return () => {
        unsubscribeAuthState()
      }
    }
  }, [noReload])


  const createUserWithEmailAndPassword:
    AuthContextProps['createUserWithEmailAndPassword'] = async (
      email, password, options,
    ) => {
      if (options?.noReload) setNoReload(true)

      const result = await auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)

      await auth.updateProfile(result.user, {
        displayName: options?.displayName,
        photoURL: options?.photoURL,
      })

      return result
    }

  const signInWithEmailAndPassword:
    AuthContextProps['signInWithEmailAndPassword'] = async (
      email, password,
    ) => {
      return auth.signInWithEmailAndPassword(auth.getAuth(), email, password)
    }

  const deleteUser: AuthContextProps['deleteUser'] = async (
    _user,
  ) => {
    if (_user) {
      auth.deleteUser(_user)
    }
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
        user,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


let firebaseInit: boolean = false
let authListenerInit: boolean = false

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





