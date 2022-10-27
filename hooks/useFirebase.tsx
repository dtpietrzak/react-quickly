import { firebaseFront } from '../utils/firebaseFront'
import * as auth from 'firebase/auth'

let cachedUser: auth.User

export const useFirebase = () => {
  const app = firebaseFront()

  const createUserWithEmailAndPassword = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password)
      .then(async (res) => {
        refreshToken(res.user)
        return res
      })
      .catch((err) => err)
  }

  const refreshToken = async (_user?: auth.User) => {
    console.log(_user, cachedUser)

    console.log(auth.getAuth().currentUser)

    // if you pass a user to this function, we'll set our cached user
    if (_user) cachedUser = _user

    if (cachedUser) {
      const token = await auth.getIdToken(cachedUser)
      console.log('new token', token)
      document.cookie = `uidt=${token}; expires=Thu, 27 2022 00:00:00 UTC; path=/;`
    }
  }

  return {
    firebaseApp: app,
    auth: {
      createUserWithEmailAndPassword,
      refreshToken,
    }
  }
}