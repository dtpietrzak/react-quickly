'use client'

import { useEffect } from "react"
import Button from "../../components/Button"
import { useFirebase } from "../../hooks/useFirebase"

let didInit = false

export default function Page() {
  const firebase = useFirebase()

  useEffect(() => {
    console.log('kaboom')

    if (!didInit) {
      console.log('shaboom')

      didInit = true
      firebase.auth.refreshToken()
    }
  }, [firebase.auth])

  return (

    <>
      <h1>account page</h1>
      <Button />
    </>

  )
}