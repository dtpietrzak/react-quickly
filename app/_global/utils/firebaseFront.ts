import {
  initializeApp as initFrontApp,
  FirebaseApp as FirebaseFrontApp,
} from 'firebase/app'

// FRONT END
let cachedFront: FirebaseFrontApp

export const firebaseFront = (): FirebaseFrontApp => {
  if (cachedFront) return cachedFront
  return initializeFront()
}

const initializeFront = (): FirebaseFrontApp => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_RTDB_URL,
  }

  cachedFront = initFrontApp(firebaseConfig)
  return cachedFront
}