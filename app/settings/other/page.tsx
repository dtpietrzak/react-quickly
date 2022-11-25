import { serveUser } from '_global/utils/firebaseBack'

export default async function Page() {
  const { user_auth } = await serveUser()

  return (
    <>
      <h1>Other Settings</h1>
    </>
  )
}