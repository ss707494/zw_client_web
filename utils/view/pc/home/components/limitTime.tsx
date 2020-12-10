import styled from 'styled-components'
import React, {useEffect} from 'react'
import {ls} from '../../../../tools/dealKey'
import {mpStyle} from '../../../../style/common'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {promotionFlashSaleModel} from '../../../m/home/components/PromotionFlashSale/PromotionFlashSale'
import {Space} from '../../../../components/Box/Box'
import {ProductItemBox} from '../../pcComponents/productItemBox/productItemBox'
import {padStart} from '../../../../tools/utils'

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
  width: 28px;
  height: 34px;
  border-radius: 2px;
  background: #0D0D21;
  color: white;
  ${mpStyle.fontType.xl};
  display: grid;
  align-items: center;
  justify-items: center;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  justify-items: center;
`
export const LimitTime = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(promotionFlashSaleModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [actionsPromotionFlashSale])
  const calcDifferenceHours = actionsPromotionFlashSale.calcDifferenceHours()
  const calcDifferenceMinutes = actionsPromotionFlashSale.calcDifferenceMinutes()

  return <Box
      id={'LimitTime'}
  >
    {statePromotionFlashSale.nowLimitData?.id &&
    <>
      <Header>
        <Title>{(statePromotionFlashSale.isNext && ls('距离下次抢购')) || ls('限时选购')}</Title>
        <Space w={18}/>
        <Tip>{padStart(calcDifferenceHours)[0]}</Tip>
        <Space w={6}/>
        <Tip>{padStart(calcDifferenceHours)[1]}</Tip>
        <Space w={6}/>
        :
        <Space w={6}/>
        <Tip>{padStart(calcDifferenceMinutes)[0]}</Tip>
        <Space w={6}/>
        <Tip>{padStart(calcDifferenceMinutes)[1]}</Tip>
      </Header>
      <Space h={24}/>
      <Content>
        {statePromotionFlashSale.productList.slice(0, 9).map(product => <ProductItemBox
            key={`ProductItemOneRow_${product.id}`}
            product={product}
        />)}
      </Content>
      <Space h={46}/>
    </>
    }
  </Box>
}
