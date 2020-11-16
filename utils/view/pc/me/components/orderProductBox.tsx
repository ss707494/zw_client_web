import React from 'react'
import {ROrderProduct} from '../../../../graphqlTypes/types'
import styled from 'styled-components'
import {dealImgUrl} from '../../../../tools/img'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'
import {ls} from '../../../../tools/dealKey'
import {dealMoney} from '../../../../tools/utils'
import {ProductBox} from '../../../m/me/orderDetail/orderDetail'

const Box = styled(ProductBox)`
  padding-top: 0;
  padding-bottom: ${mpStyle.spacePx.xs};
  > img {
    width: 88px;
    height: 140px;
  }
`

export const OrderProductBox = ({rOrderProduct}: { rOrderProduct: ROrderProduct }) => {

  return <Box>
    <img src={dealImgUrl(rOrderProduct.product?.img?.[0]?.url)}
         alt=""/>
    <section>
      {rOrderProduct.product?.name}
      <Space w={mpStyle.space.xxs}/>
      <span> {rOrderProduct.product?.number}{ls('份')} </span>
    </section>
    <main>{rOrderProduct.product?.remark}</main>
    <footer>
      <aside>{dealMoney(rOrderProduct.product?.priceMarket)}</aside>
      <span>{dealMoney(rOrderProduct.product?.priceOut)}</span>
    </footer>
  </Box>
}
