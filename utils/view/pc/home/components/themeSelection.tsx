import styled from 'styled-components'
import React, {useEffect} from 'react'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {themeSelectionModel} from '../../../m/home/components/ThemeSelection/ThemeSelection'
import {mpStyle} from '../../../../style/common'
import {dealImgUrl} from '../../../../tools/img'
import {Space} from '../../../../components/Box/Box'
import {ProductItemBox} from '../../pcComponents/productItemBox/productItemBox'

const Box = styled.div`
  display: grid;
  grid-gap: ${mpStyle.spacePx.n};
`
const Title = styled.div`
  ${mpStyle.fontType.xxl};
`
const Img = styled.div`
  display: grid;
  grid-auto-flow: column;
  > img {
    width: 12vw;
    height: 18vw;
  }
`
const ThemeBox = styled.div`
  display: grid;
  grid-template-rows: max-content max-content;
  grid-template-columns: max-content 1fr;
  ${Title} {
    grid-area: 1/1/2/3;
  }
`
const ProductBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: ${mpStyle.spacePx.s};
  overflow-x: auto;
  ${mpStyle.scrollbar};
`

export const ThemeSelection = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(themeSelectionModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [])

  console.log(statePromotionFlashSale)

  return <Box>
    {statePromotionFlashSale.themeSelectionData.map(themeData => <ThemeBox
        key={`themeSelectionData_${themeData.id}`}
    >
      <Title>
        {themeData.title}
        <Space h={mpStyle.space.s}/>
      </Title>
      <Img>
        <img
            src={dealImgUrl(themeData.imgUrl)}
            alt=""/>
        <Space w={mpStyle.space.xs}/>
      </Img>
      <ProductBox>
        {statePromotionFlashSale.productListForTheme[themeData.id]?.map(v => <ProductItemBox
            key={`statePromotionFlashSaleProductItem_${v.id}`}
            product={v}/>)}
        {statePromotionFlashSale.productListForTheme[themeData.id]?.map(v => <ProductItemBox
            key={`statePromotionFlashSaleProductItem_2${v.id}`}
            product={v}/>)}
      </ProductBox>
    </ThemeBox>)}
  </Box>
}
