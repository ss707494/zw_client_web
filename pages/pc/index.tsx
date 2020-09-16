import {useRouter} from 'next/router'
import React, {useEffect} from 'react'

const PcHomeRedirect = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/pc/home', '/pc/home')
  })
  return <div/>
}
export default PcHomeRedirect
