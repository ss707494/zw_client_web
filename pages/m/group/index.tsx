import React, {useEffect} from "react"
import {useRouter} from "next/router"

const HomeIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/m/group/[appModule]', '/m/group/categorySelection', {})
  })
  return <div/>
}

export default HomeIndex
