import {AppFootBar} from '../../ss_common/enum'
import {Badge, IconButton} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useStoreModel} from '../../ModelAction/useStore'
import {ShopCartModel} from '../../view/m/cart'
import {usePcOrMobile} from '../../hooks/usePcOrMobile'

type Color = 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error'

export const ShoppingCartIconButton = ({color, htmlColor}: { color?: Color, htmlColor?: string }) => {
  const {isPc} = usePcOrMobile()
  const router = useRouter()
  const {state: stateShopCart, actions: actionsShopCart} = useStoreModel(ShopCartModel)
  useEffect(() => {
    if (!stateShopCart.user.id) {
      actionsShopCart.getList()
    }
  }, [])

  return <IconButton
      onClick={() => {
        router.push(`/${isPc ? 'pc' : 'm'}/${AppFootBar.cart}`)
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
