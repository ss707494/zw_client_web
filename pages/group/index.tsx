import React, {useEffect} from "react"
import {useRouter} from "next/router"

const HomeIndex = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/group/[appModule]', '/group/categorySelection', {})
  })
  return <div/>
}

export default HomeIndex
