import config from '../config/config'

import './globals.css'
import Link from 'next/link'
import UserNav from './UserNav'
import { Providers } from './providers'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>
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
