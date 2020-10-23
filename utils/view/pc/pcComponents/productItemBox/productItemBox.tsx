import styled from 'styled-components'
import React from 'react'
import {Product} from '../../../../graphqlTypes/types'
import {dealImgUrl} from '../../../../tools/img'
import {dealMoney} from '../../../../tools/utils'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'
import {Button, Card} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {updateShopCartModel} from '../../../../components/ProductItem/UpdateShopCart'
import {showMessage} from '../../../../components/Message/Message'
import {productModel} from '../../../../components/ProductItem/ProductItem'
import {shopCartModel} from '../../../m/cart'

const Box = styled(Card)<{width?: number}>`
  display: flex;
  flex-direction: column;
  width: ${props => `${props.width ?? 322}px`};
  padding: ${mpStyle.spacePx.xs};
`
const ImgBox = styled.div<{width?: number}>`
  align-self: center;
  > img {
    width: ${props => `${(props.width ?? 322) - 82}px`};
    height: ${props => `${((props.width ?? 322) - 82) * 4/3}px`};
  }
`
const Price = styled.div`
  display: flex;
  align-items: center;
  > aside {
    ${mpStyle.fontType.n};
    color: ${mpStyle.red};
  }
  > main {
    ${mpStyle.fontType.s};
    text-decoration: line-through;
    color: ${mpStyle.grey};
  }
`
const Footer = styled.div`
  display: flex;
`
const Name = styled.div`
  flex-grow: 1;
`

export const ProductItemBox = ({product, width = 322}: {
  product: Product,
  width?: number
}) => {
  const {actions: actionsUpdateShopCartModel} = useStoreModel(updateShopCartModel)
  const {actions: actionsProductModel} = useStoreModel(productModel)
  const {actions: actionsShopCartModel, state: stateSCM} = useStoreModel(shopCartModel)

  return <Box
      width={width}
  >
    <ImgBox
        width={width}
    >
      <img
          src={dealImgUrl(product?.img?.[0]?.url)}
          alt={''}
      />
    </ImgBox>
    <Space h={8}/>
    <Price>
      <aside>{dealMoney(product?.priceOut)}</aside>
      <Space w={16}/>
      <main>{dealMoney(product?.priceMarket)}</main>
    </Price>
    <Space h={8}/>
    <Footer>
      <Name>
        {product.name}
      </Name>
      <Button
          variant={'contained'}
          color={'secondary'}
          onClick={async () => {
            const res = await actionsUpdateShopCartModel.openClick()
            if (res?.num > 0) {
              if ((await actionsProductModel.updateNumShopCart({
                product,
                number: ~~res?.num,
              }))?.updateNumShopCart?.id) {
                showMessage('操作成功')
                actionsShopCartModel.getList()
              }
            }
          }}
      >
        <ShoppingCart />
      </Button>
    </Footer>

  </Box>
}
