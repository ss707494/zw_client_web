import styled from 'styled-components'
import React from 'react'
import {Product} from '../../../../graphqlTypes/types'
import {dealImgUrl} from '../../../../tools/img'
import {dealMoney} from '../../../../tools/utils'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'
import {Button, Card} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'

const Box = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 232px;
  padding: 8px;
`
const ImgBox = styled.div`
  width: 200px;
  height: 280px;
  align-self: center;
  > img {
    width: 200px;
    height: 280px;
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

export const ProductItemBox = ({product}: {
  product: Product
}) => {

  return <Box
  >
    <ImgBox>
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
      >
        <ShoppingCart />
      </Button>
    </Footer>

  </Box>
}
