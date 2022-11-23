import { getUser } from '../../utils/firebaseBack'
import LoggedIn from './_components/LoggedIn'
import NotLoggedIn from './_components/NotLoggedIn'

export default async function Page() {
  const { user_auth } = await getUser()

  return (
    <>
      <h1>account page</h1>
      {
        user_auth ?
          <LoggedIn user_email={user_auth.email} />
          :
          <NotLoggedIn />
      }
    </>
  )
}