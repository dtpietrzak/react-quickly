import config from '../config/config'

import '../styles/globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>
        <div className='h-screen w-screen flex flex-col justify-start items-start'>

          {/* Navbar */}
          <div className='h-[64px] w-full flex justify-between items-center px-8'>
            <div className=''>
              <Link href={config.HOMEPAGE}>
                react-quickly
              </Link>
            </div>
            <div className=''>
              <Link href='/account'>
                Account
              </Link>
            </div>
          </div>

          {/* content */}
          <div className='grow w-full'>
            {children}
          </div>

          {/* footer */}
          <div className='h-[32px] w-full'>

          </div>
        </div>
      </body>
    </html>
  )
}
