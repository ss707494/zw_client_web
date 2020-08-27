import React, {useEffect} from 'react'
import {useRouter} from 'next/router'

export const HomeRe = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/m/login')
  })

  return <div/>
}

export default HomeRe

