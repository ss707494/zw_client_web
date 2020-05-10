import React, {useEffect} from "react"
import {useRouter} from "next/router"

const HomeIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/home/[appModule]', '/home/categorySelection', {})
  })
  return <div/>
}

export default HomeIndex
