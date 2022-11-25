import { serveUser } from '_global/utils/firebaseBack'
import LoggedIn from './_components/LoggedIn'
import NotLoggedIn from './_components/NotLoggedIn'

export default async function Page() {
  const { user_auth } = await serveUser()

  return (
    <>
      <h1>Account Settings</h1>
      {
        user_auth ?
          <LoggedIn user_email={user_auth.email} />
          :
          <NotLoggedIn />
      }
    </>
  )
}