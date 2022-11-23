import './globals.css'
import { Providers } from './providers'

import NavBar from './_components/NavBar'

import { getUser } from '_global/utils/firebaseBack'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, user_auth } = await getUser()

  return (
    <html>
      <body>
        <Providers session={session}>
          <div className='h-screen w-screen flex flex-col justify-start items-start'>
            <NavBar
               email={user_auth?.email}        
               display_name={user_auth?.displayName}  
            />

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
