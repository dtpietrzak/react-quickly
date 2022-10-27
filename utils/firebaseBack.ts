import {
  initializeApp as InitBackApp,
  App as FirebaseBackApp,
} from 'firebase-admin/app';

import admin from 'firebase-admin'

const serviceAccount = require('../serviceAccountKey.json')

// BACK END
let cachedBack: FirebaseBackApp

export const adminSDK = (): admin.app.App => {
  return admin.app(firebaseBack().name)
}

export const auth = () => {
  // console.log(firebaseBack().name)
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