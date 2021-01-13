import styled from 'styled-components'
import {mpStyle, RedBox} from '../../../../style/common'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {ShopCartModel} from '../../../m/cart'
import {productModel} from '../../../../components/ProductItem/ProductItem'
import {ll} from '../../../../tools/dealKey'
import React from 'react'
import {Space} from '../../../../components/Box/Box'
import {dealImgUrl} from '../../../../tools/img'
import {dealMaybeNumber, dealMoney} from '../../../../tools/utils'
import {Button, IconButton} from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'


const CartProductTableBox = styled.div`
  display: grid;
  grid-template-columns: minmax(max-content, 3fr) repeat(5, 1fr);
  align-items: center;
  justify-items: center;
`
const TableHeader = styled.div`
  height: ${mpStyle.spacePx.l};
  display: flex;
  align-items: center;
`
const UpdateNumber = styled.div`
`
const InfoBox = styled.div`
  height: 120px;
  justify-self: start;
  display: flex;
  align-items: center;
  > img {
    width: 60px;
    height: 80px;
  }
`
export const CartProductTable = () => {
  const {actions: actionsShopCartModel, state: stateShopCartModel} = useStoreModel(ShopCartModel)
  const {actions: actionsProductModel} = useStoreModel(productModel)

  return <CartProductTableBox>
    {/*<TableHeader>{ls('选择')}</TableHeader>*/}
    {['商品信息', '单价', '数量', '重量', '小计', '操作'].map(v => <TableHeader
        key={`TableHeader${v}`}
    >{ll(v)}</TableHeader>)}
    {stateShopCartModel.shopCartList.map(shopCart => {
      const product = shopCart.product
      return <React.Fragment
          key={`stateShopCartModel${shopCart.id}`}
      >
        <InfoBox>
          <Space w={mpStyle.space.xxl}/>
          <img src={dealImgUrl(shopCart.product?.img?.[0]?.url)}
               alt=""/>
          <Space w={mpStyle.space.l}/>
          <main>{product?.name}</main>
        </InfoBox>
        <RedBox>{dealMoney(product?.priceOut)}</RedBox>
        <UpdateNumber>
          <IconButton
              disabled={(shopCart?.number ?? 0) <= 1}
              size={'small'}
              onClick={async () => {
                await actionsProductModel.updateNumShopCart({
                  product,
                  number: -1,
                })
                actionsShopCartModel.getList()
              }}
          ><RemoveIcon/></IconButton>
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
        </UpdateNumber>
        <RedBox>{product?.weight}{product?.unit}</RedBox>
        <RedBox>{dealMoney(dealMaybeNumber(product?.priceOut) * dealMaybeNumber(shopCart?.number))}</RedBox>
        <Button
            size={'small'}
            variant={'outlined'}
            onClick={async () => {
              await actionsShopCartModel.moveToNext({shopCart})
              actionsShopCartModel.getList()
            }}
        >{ll('下次购买')}</Button>
      </React.Fragment>
    })}
  </CartProductTableBox>
}
