import React, {ReactNode} from 'react'
import {UpdateShopCart} from '../../../../components/ProductItem/UpdateShopCart'

export const MainBox = ({children}: {children: ReactNode[]}) => {

  return <div>
    {children}
    <UpdateShopCart/>
  </div>
}
