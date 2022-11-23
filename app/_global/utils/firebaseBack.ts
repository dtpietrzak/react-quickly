import {
  initializeApp as InitBackApp,
  App as FirebaseBackApp,
} from 'firebase-admin/app';

import admin from 'firebase-admin'

import { cookies } from 'next/headers'

import serviceAccount from '../../../serviceAccountKey.json';


// BACK END
let cachedBack: FirebaseBackApp

export const adminSDK = (): admin.app.App => {
  return admin.app(firebaseBack().name)
}

export const auth = () => {
  firebaseBack()

  return admin.auth()
}

export const rtdb = () => {
  return admin.database(firebaseBack())
}

export const firestore = () => {
  return admin.firestore(firebaseBack())
}

export const firebaseBack = (): FirebaseBackApp => {
  if (cachedBack) return cachedBack
  return initializeBack()
}

const initializeBack = (): FirebaseBackApp => {
  cachedBack = InitBackApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  })
  return cachedBack
}



export const getUser = async () => {
  const idToken: string = cookies().get('uidt')?.value || ''
  let sessionToken: string = cookies().get('session')?.value || ''

  try {
    // if there's a session token cookie
    // decode the session token
    // return the session token
    if (sessionToken) {
      const decodedSessionToken = await auth().verifySessionCookie(sessionToken)

      if (decodedSessionToken) return ({
        session: sessionToken,
        user_auth: decodedSessionToken,
      })
    }
  } catch { }

  try {
    // if there's no session token cookie
    // but there IS an idToken cookie
    // decode the idToken
    // return a new session cookie and the decoded user auth data to the client
    if (idToken) {

      const decodedIdToken = await auth().verifyIdToken(idToken)

      if (Date.now() / 1000 - decodedIdToken.exp < 5 * 60) {
        sessionToken = await auth().createSessionCookie(idToken, { 
          expiresIn: (60 * 60 * 24 * 7 * 1000)
        })
      }

      return ({
        session: sessionToken,
        user_auth: decodedIdToken,
      })
    }
  } catch { }

  // if we have this, then the user is NOT logged in
  return {
    session: undefined,
    user_auth: undefined,
  }
}