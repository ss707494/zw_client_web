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
  grid-gap: 50px;
`
const Title = styled.div`
  ${mpStyle.fontType.xxl};
  color: ${mpStyle.black};
  grid-area: 1/1/2/4;
  justify-self: start;
`
const Img = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-self: stretch;
  ${mpStyle.fontType.n};
  background: rgb(200, 200, 200, .2);
  
  > img {
    width: 100%;
    height: 50%;
  }
  > section {
    > div {
      margin-top: ${mpStyle.spacePx.xxs};
    }
  }
`
const ThemeBox = styled.div`
  display: grid;
  grid-template-rows: max-content max-content;
  grid-template-columns: repeat(3, 300px);
  justify-items: center;
`

export const ThemeSelection = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(themeSelectionModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [actionsPromotionFlashSale])

  return <Box
      id={'ThemeSelection'}
  >
    {statePromotionFlashSale.themeSelectionData.map(themeData => <ThemeBox
        key={`themeSelectionData_${themeData.id}`}
    >
      <Title>
        {themeData.title}
        <Space h={19}/>
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
          width={290}
          product={v}/>)}
    </ThemeBox>)}
  </Box>
}
