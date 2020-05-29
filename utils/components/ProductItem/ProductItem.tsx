import styled from 'styled-components'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, {useEffect} from 'react'
import {Maybe, Product, ShopCartItemInput} from '../../graphqlTypes/types'
import {dealImgUrl} from '../../tools/img'
import {Card, IconButton} from '@material-ui/core'
import {dealMoney} from '../../tools/utils'
import {mpStyle} from '../../style/common'
import {modelFactory} from '../../ModelAction/modelUtil'
import {useStoreModel} from '../../ModelAction/useStore'
import {meModel} from '../../view/me/model'
import {doc} from '../../graphqlTypes/doc'
import {showMessage} from '../Message/Message'

export const productModel = modelFactory('productModel', {}, {
  updateNumShopCart: async (value: ShopCartItemInput, option) => {
    return await option.mutate(doc.updateNumShopCart, {
      shopCart: value,
      ...(value.number ? {
        updateNum: value.number,
      } : {}),
    })
  },
  updateShopCart: async (value: ShopCartItemInput, option) => {
    return await option.mutate(doc.updateShopCart, {
      shopCart: value,
    })
  },
})

const Box = styled(Card)`
  padding: 10px 10px 0;
  > header {
    width: 100%;
    height: 40vw;
    > img {
      border-radius: 8px;
      width: 100%;
      height: 40vw;
    }
  }
  > main {
    margin-top: 10px;
  }
  > footer {
    margin-top: 4px;
    display: flex;
    align-items: center;
    > main {
      flex-grow: 1;
    }
    > .MuiButtonBase-root {
      padding: 5px;
    }
  }
`

export const ProductPrice = ({product}: { product?: Maybe<Product> }) => {
  return <>
    <aside
        style={{display: 'inline-block', fontSize: '12px', textDecoration: 'line-through', flexShrink: 0}}
    >{dealMoney(product?.priceMarket)}</aside>
    <main
        style={{display: 'inline-block', fontSize: '14px', marginLeft: '6px', color: mpStyle.red, flexShrink: 0}}
    >{dealMoney(product?.priceOut)}</main>
  </>
}

export const ProductItem = ({product}: { product: Product }) => {
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])
  const {actions: actionsPM} = useStoreModel(productModel)
  return <Box>
    <header>
      <img src={dealImgUrl(product?.img?.[0]?.url)}
           alt=""/>
    </header>
    <main>{product.name}{product.weight}{product.unit}</main>
    <footer>
      <ProductPrice product={product}/>
      {stateMe.user?.id && <IconButton
          onClick={async () => {
            if ((await actionsPM.updateNumShopCart({
              product,
            }))?.updateNumShopCart?.id) {
              showMessage('操作成功')
            }
          }}
      >
        <ShoppingCartIcon color={'secondary'}/>
      </IconButton>}
    </footer>
  </Box>
}
