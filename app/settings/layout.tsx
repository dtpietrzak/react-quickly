import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className='w-full h-full flex justify-start items-start'>
      <div className='w-64 p-4 ml-2 bg-blue-500 rounded-lg h-full flex flex-col'>
        <Link href={'/settings/account'}>
          Account Settings
        </Link>
        <Link href={'/settings/other'}>
          Other Settings
        </Link>
      </div>
      <div className='py-4'>
        {children}
      </div>
    </div>
  )
}
