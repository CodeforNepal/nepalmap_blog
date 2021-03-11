import { Session } from "next-auth"
import { useSession,signIn } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect } from "react"

interface CustomSession extends Session{
  idToken?: string
}
const Index = () => {
  const [ session, loading ] = useSession()
  useEffect(()=>{
    if(!session && !loading){
      signIn('google')
    }
    console.log((session as CustomSession)?.idToken)
  },[session, loading])

  if(!session){
    return null
  }
  return (
    <>
      Admin
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  return {
    props: { },
  }
}
