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
  grid-area: 1/1/2/4;
  justify-self: start;
`
const Img = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-self: stretch;
  padding-right: ${mpStyle.spacePx.s};
  border-right: 1px solid ${mpStyle.grey};
  > img {
    width: 100%;
    height: 50%;
  }
  ${mpStyle.fontType.n}
  > section {
    > div {
      margin-top: ${mpStyle.spacePx.xxs};
    }
  }
`
const ThemeBox = styled.div`
  display: grid;
  grid-template-rows: max-content max-content;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-gap: ${mpStyle.spacePx.xs};
`

export const ThemeSelection = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(themeSelectionModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [])

  return <Box
      id={'ThemeSelection'}
  >
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
        <section>
          {/*<div>{themeData.title}</div>*/}
          <div>{themeData.remark}</div>
        </section>
      </Img>
      {statePromotionFlashSale.productListForTheme[themeData.id]?.slice(0, 8)?.map(v => <ProductItemBox
          key={`statePromotionFlashSaleProductItem_${v.id}`}
          product={v}/>)}
    </ThemeBox>)}
  </Box>
}
