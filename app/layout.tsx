import config from '../config/config'

import './globals.css'
import Link from 'next/link'
import UserNav from './UserNav'
import { Providers } from './providers'

import { cookies } from 'next/headers'
import { auth } from '../utils/firebaseBack'

const startSession = async () => {

  let sessionToken: string = ''
  let expiresIn: number = 0
  const idToken: string = cookies().get('uidt') as string

  try {
    if (idToken) {

      const decodedIdToken = await auth().verifyIdToken(idToken)

      if (Date.now() / 1000 - decodedIdToken.auth_time < 60 * 60) {
        expiresIn = (60 * 60 * 24 * 7 * 1000)
        sessionToken = await auth().createSessionCookie(idToken, { expiresIn })
      }
    }
  } catch { }

  return ({
    session: sessionToken,
    expires: expiresIn,
  })
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers
          authProps={await startSession()}
        >
          <div className='h-screen w-screen flex flex-col justify-start items-start'>

            {/* Navbar */}
            <div className='h-[64px] w-full flex justify-between items-center px-8'>
              <div className=''>
                <Link href={config.HOMEPAGE}>
                  react-quickly
                </Link>
              </div>
              <div className=''>
                <UserNav />
              </div>
            </div>

            {/* content */}
            <div className='grow w-full'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html >
  )
}
