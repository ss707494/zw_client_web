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
import {shopCartModel} from './index'
import { ls } from '../../tools/dealKey'

const Box = styled.div`
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 66px 1fr;
  grid-template-rows: repeat(2, 22px) 26px;
  grid-column-gap: 10px;
  > img {
    grid-area: 1/1/4/2;
    width: 100%;
    height: 100%;
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
  }
`


export const CartProduct = ({shopCart}: { shopCart: ShopCart }) => {
  const {actions: actionsSCM} = useStoreModel(shopCartModel)
  const {actions: actionsPM} = useStoreModel(productModel)
  const product = shopCart.product

  return <Box>
    <img src={dealImgUrl(shopCart.product?.img?.[0]?.url)}
         alt=""/>
    <main>{product?.name}{product?.weight}{product?.unit}</main>
    <section>{product?.remark}</section>
    <footer>
      <ProductPrice product={product}/>
      <Button
          size={'small'}
          variant={'outlined'}
      >{ls('下次购买')}</Button>
      {(shopCart?.number ?? 0) > 1 && <IconButton
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
    </footer>
  </Box>
}
