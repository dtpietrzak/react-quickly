'use client'

import { useContext } from 'react'
import { firebaseFront } from '_global/utils/firebaseFront'
import { AuthContext } from '_global/contexts/authContext'
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore"

export const useFirebase = () => {
  const app = firebaseFront()

  const auth = useContext(AuthContext)
  const rtdb = getDatabase(app)
  const fsdb = getFirestore(app)

  return {
    app,
    auth,
    rtdb,
    fsdb,
  }
}

export default useFirebase