import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {ll} from '../../../tools/dealKey'
import {FootBar} from '../../../components/FootBar/FootBar'
import {useRouter} from 'next/router'
import {PromoCodeTypeEnum} from '../../../ss_common/enum'

export const Card = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/m/card/[type]', `/m/card/${PromoCodeTypeEnum.DarenCard}`)
  })
  return <div>
    <HeaderTitle
        title={ll('达人专区')}
    />
    <FootBar/>
  </div>
}
