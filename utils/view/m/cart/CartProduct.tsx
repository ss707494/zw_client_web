import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import {ShopCart} from '../../../graphqlTypes/types'
import styled from 'styled-components'
import {dealImgUrl} from '../../../tools/img'
import {grey} from '@material-ui/core/colors'
import {productModel, ProductPrice} from '../../../components/ProductItem/ProductItem'
import {Button, IconButton} from '@material-ui/core'
import {useStoreModel} from '../../../ModelAction/useStore'
import {ll} from '../../../tools/dealKey'
import {shopCartModel} from './index'
import {showMessage} from '../../../components/Message/Message'
import {updateShopCartModel} from '../../../components/ProductItem/UpdateShopCart'

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
  const {actions: actionsShopCartModel, state: stateSCM} = useStoreModel(shopCartModel)
  const {actions: actionsProductModel} = useStoreModel(productModel)
  const {actions: actionsUpdateShopCartModel} = useStoreModel(updateShopCartModel)
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
              await actionsShopCartModel.moveToNext({shopCart})
              actionsShopCartModel.getList()
            }}
        >{ll('下次购买')}</Button>
        {<IconButton
            disabled={(shopCart?.number ?? 0) <= 1}
            size={'small'}
            onClick={async () => {
              await actionsProductModel.updateNumShopCart({
                product,
                number: -1,
              })
              actionsShopCartModel.getList()
            }}
        ><RemoveIcon/></IconButton>}
        {shopCart.number}
        <IconButton
            size={'small'}
            onClick={async () => {
              await actionsProductModel.updateNumShopCart({
                product,
              })
              actionsShopCartModel.getList()
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
              await actionsProductModel.updateShopCart({
                isDelete: 1,
                id: shopCart.id,
              })
              actionsShopCartModel.getList()
            }}
        >{ll('删除')}</Button>
        <Button
            size={'small'}
            variant={'outlined'}
            // onClick={async () => {
            //   if (stateSCM.shopCartList.findIndex(v => v.product?.id === shopCart.product?.id) > -1) {
            //     return showMessage('该商品已在购物车中')
            //   }
            //   await actionsProductModel.updateShopCart({
            //     isNext: 0,
            //     id: shopCart.id,
            //   })
            //   actionsShopCartModel.getList()
            // }}
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
        >{ll('加入购物车')}</Button>
      </>}
    </footer>
  </ShopCartProductBox>
}
