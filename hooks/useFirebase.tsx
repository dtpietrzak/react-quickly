import { firebaseApp } from "../utils/firebase"
import * as auth from "firebase/auth";

export const useFirebase = () => {
  const app = firebaseApp()

  const createUserWithEmailAndPassword = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
  }

  return {
    firebaseApp: app,
    auth: {
      createUserWithEmailAndPassword,
    }
  }
}