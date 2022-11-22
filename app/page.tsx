import { cookies } from 'next/headers'
import { auth } from '../utils/firebaseBack'


const test = async () => {

  // const idToken: string = cookies().get('uidt') as string

  // if (idToken) {
  //   auth().verifyIdToken(idToken)
  //     .then((decodedIdToken) => {
  //       // Only process if the user just signed in in the last 5 minutes.
  //       if (Date.now() / 1000 - decodedIdToken.auth_time < 5 * 60) {
  //         const expiresIn = (60 * 60 * 24 * 7 * 1000)

  //         // Create session cookie and set it.
  //         auth()
  //           .createSessionCookie(idToken, { expiresIn })
  //           .then((sessionCookie) => {
  //             // Set cookie policy for session cookie.
  //             const options = {
  //               maxAge: expiresIn,
  //               httpOnly: true,
  //               secure: true,
  //             }
              
  //           })
  //           .catch((err) => console.log(err))
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }



  return ({})
}

export default async function Page() {
  const _test = test()

  return (
    <>
      <div className='h-full w-full bg-red-500'>
        some page content
      </div>
    </>
  )
}