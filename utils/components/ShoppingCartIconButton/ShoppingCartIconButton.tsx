import {AppFootBar} from '../../ss_common/enum'
import {Badge, IconButton} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useStoreModel} from '../../ModelAction/useStore'
import {shopCartModel} from '../../view/m/cart'

type Color = 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error'

export const ShoppingCartIconButton = ({color, htmlColor}: {color?: Color, htmlColor?: string}) => {
  const router = useRouter()
  const {state: stateShopCart, actions: actionsShopCart} = useStoreModel(shopCartModel)
  useEffect(() => {
    if (!stateShopCart.user.id) {
      actionsShopCart.getList()
    }
  }, [])

  return <IconButton
      onClick={() => {
        router.push(`/m/${AppFootBar.cart}`)
      }}
  >
    <Badge
        badgeContent={stateShopCart.dealProductNumber(stateShopCart)}
        color="primary">
      <ShoppingCartIcon
          color={color}
          htmlColor={htmlColor}
      />
    </Badge>
  </IconButton>
}
