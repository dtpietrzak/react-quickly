
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full flex justify-start items-start'>
      <div className='w-64 p-4 ml-2 bg-blue-500 rounded-lg h-[calc(100vh-32px-64px)]'>
        side box
      </div>
      <div className='py-4'>
        {children}
      </div>
    </div>
  )
}
