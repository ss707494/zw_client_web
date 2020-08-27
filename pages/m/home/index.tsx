import React, {useEffect} from "react"
import {useRouter} from "next/router"

const HomeIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/m/home/[appModule]', '/m/home/categorySelection', {})
  })
  return <div/>
}

export default HomeIndex
