import React, {useEffect} from "react"
import { useRouter } from "next/router"

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/home/categorySelection')
  })
  return <div/>
}

export default Home
