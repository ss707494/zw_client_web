import styled from 'styled-components'
import React, {useEffect} from 'react'
import {ls} from '../../../../tools/dealKey'
import {mpStyle} from '../../../../style/common'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {promotionFlashSaleModel} from '../../../m/home/components/PromotionFlashSale/PromotionFlashSale'
import {Space} from '../../../../components/Box/Box'
import {ProductItemBox} from '../../pcComponents/productItemBox/productItemBox'

const Box = styled.div`
`
const Header = styled.div`
  display: flex;
  align-items: center;
  ${mpStyle.fontType.xxl};
`
const Title = styled.div`
`
const Tip = styled.div`
  padding: 0 4px;
  border-radius: 4px;
  background: #0D0D21;
  color: white;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
`
export const LimitTime = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(promotionFlashSaleModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [])

  return <Box>
    {statePromotionFlashSale.nowLimitData?.id &&
    <>
      <Header>
        <Title>{ls('限时抢购')}</Title>
        <Space w={8}/>
        <Tip>{`${actionsPromotionFlashSale.calcDifferenceHours()}`}</Tip>
        <Space w={6}/>
        :
        <Space w={6}/>
        <Tip>{`${actionsPromotionFlashSale.calcDifferenceMinutes()}`}</Tip>
      </Header>
      <Space h={24}/>
      <Content>
        {statePromotionFlashSale.productList.map(product => <ProductItemBox
            key={`ProductItemOneRow_${product.id}`}
            product={product}
        />)}
      </Content>
    </>
    }
  </Box>
}
