import { cookies } from 'next/headers'
import { auth } from '../utils/firebaseBack'


const test = async () => {
  const uidToken: string = cookies().get('uidt') as string

  console.log(uidToken)

  if (uidToken) {
    auth().verifyIdToken(uidToken)
      .then((res) => {
        console.log(res.uid)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return ({  })
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