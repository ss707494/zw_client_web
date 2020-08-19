import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import {ShopCart} from '../../graphqlTypes/types'
import styled from 'styled-components'
import {dealImgUrl} from '../../tools/img'
import {grey} from '@material-ui/core/colors'
import {productModel, ProductPrice} from '../../components/ProductItem/ProductItem'
import {Button, IconButton} from '@material-ui/core'
import {useStoreModel} from '../../ModelAction/useStore'
import {ls} from '../../tools/dealKey'
import {shopCartModel} from './index'
import {showMessage} from '../../components/Message/Message'

export const ShopCartProductBox = styled.div`
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: minmax(20px, 72px) 1fr;
  grid-template-rows: repeat(2, 22px) 30px;
  grid-column-gap: 10px;
  > img {
    grid-area: 1/1/4/2;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  > section {
    color: ${grey[600]}
  }
  > footer {
    display: flex;
    align-items: center;
    > main {
      flex-grow: 1;
    }
    > button {
      flex-shrink: 0;
      font-size: 12px;
    }
  }
`

export const CartProduct = ({shopCart}: { shopCart: ShopCart }) => {
  const {actions: actionsSCM, state: stateSCM} = useStoreModel(shopCartModel)
  const {actions: actionsPM} = useStoreModel(productModel)
  const product = shopCart.product

  return <ShopCartProductBox>
    <img src={dealImgUrl(shopCart.product?.img?.[0]?.url)}
         alt=""/>
    <main>{product?.name}{product?.weight}{product?.unit}</main>
    <section>{product?.remark}</section>
    <footer>
      <ProductPrice product={product}/>
      {(shopCart.isNext === 0 && <>
        <Button
            size={'small'}
            variant={'outlined'}
            onClick={async () => {
              await actionsPM.updateShopCart({
                isNext: 1,
                id: shopCart.id,
              })
              actionsSCM.getList()
            }}
        >{ls('下次购买')}</Button>
        {<IconButton
            disabled={(shopCart?.number ?? 0) <= 1}
            size={'small'}
            onClick={async () => {
              await actionsPM.updateNumShopCart({
                product,
                number: -1,
              })
              actionsSCM.getList()
            }}
        ><RemoveIcon/></IconButton>}
        {shopCart.number}
        <IconButton
            size={'small'}
            onClick={async () => {
              await actionsPM.updateNumShopCart({
                product,
              })
              actionsSCM.getList()
            }}
        >
          <AddIcon/>
        </IconButton>
      </>) || <>
        <Button
            style={{marginRight: '8px'}}
            size={'small'}
            variant={'outlined'}
            color={'secondary'}
            onClick={async () => {
              await actionsPM.updateShopCart({
                isDelete: 1,
                id: shopCart.id,
              })
              actionsSCM.getList()
            }}
        >{ls('删除')}</Button>
        <Button
            size={'small'}
            variant={'outlined'}
            onClick={async () => {
              if (stateSCM.shopCartList.findIndex(v => v.product?.id === shopCart.product?.id) > -1) {
                return showMessage('该商品已在购物车中')
              }
              await actionsPM.updateShopCart({
                isNext: 0,
                id: shopCart.id,
              })
              actionsSCM.getList()
            }}
        >{ls('加入购物车')}</Button>
      </>}
    </footer>
  </ShopCartProductBox>
}
