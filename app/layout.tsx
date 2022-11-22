import config from '../config/config'

import './globals.css'
import Link from 'next/link'
import UserNav from './_components/UserNav'
import { Providers } from './providers'

import { getUser } from '../utils/firebaseBack'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, user_auth } = await getUser()

  return (
    <html>
      <body>
        <Providers
          session={session}
        >
          <div className='h-screen w-screen flex flex-col justify-start items-start'>

            {/* Navbar */}
            <div className='h-[64px] w-full flex justify-between items-center px-8'>
              <div className=''>
                <Link href={config.HOMEPAGE}>
                  react-quickly {user_auth?.email}
                </Link>
              </div>
              <div className=''>
                <UserNav userEmail={user_auth?.email} />
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
