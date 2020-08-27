import dynamic from 'next/dynamic'
import React from 'react'
import {useRouter} from 'next/router'

const MyInfo = dynamic(() => import('../../utils/view/m/me/myInfo/myInfo').then(res => res.MyInfo) as any)
const Me = dynamic(() => import('../../utils/view/m/me/index').then(res => res.default) as any)

const routerObj: {
  [key in any]: any
} = {
  myInfo: dynamic(() => import('../../utils/view/m/me/myInfo/myInfo').then(res => res.MyInfo) as any),
  me: dynamic(() => import('../../utils/view/m/me/index').then(res => res.default) as any),
}

export default function () {
  const router = useRouter()
  console.log(router.query?.name)
  let C
  if (router.query?.name && routerObj[router.query?.name as string]) {
    C = routerObj[router.query?.name as string]
  }

  return <div>
    {C && <C/>}
  </div>
}
