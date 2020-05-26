import styled from 'styled-components'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React from 'react'
import {Product} from '../../graphqlTypes/types'
import {dealImgUrl} from '../../tools/img'
import {Card, IconButton} from '@material-ui/core'
import {dealMoney} from '../../tools/utils'
import {mpStyle} from '../../style/common'

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
    font-size: 12px;
    > span {
      flex-grow: 1;
      font-size: 14px;
      color: ${mpStyle.red};
      margin-left: 10px;
    }
    > .MuiButtonBase-root {
      padding: 5px;
    }
  }
`

export const ProductItem = ({product}: { product: Product }) => {
  return <Box>
    <header>
      <img src={dealImgUrl(product?.img?.[0]?.url)}
           alt=""/>
    </header>
    <main>{product.name}{product.weight}{product.unit}</main>
    <footer>
      {dealMoney(product.priceMarket)}
      <span>{dealMoney(product.priceOut)}</span>
      <IconButton
          style={{}}
      >
        <ShoppingCartIcon color={'secondary'}/>
      </IconButton>
    </footer>
  </Box>
}
