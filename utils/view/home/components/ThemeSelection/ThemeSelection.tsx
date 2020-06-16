import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {DataConfigItemInput, Product} from '../../../../graphqlTypes/types'
import {ProductItem} from '../../../../components/ProductItem/ProductItem'
import {DictTypeEnum} from '../../../../ss_common/enum'
import {ls} from '../../../../tools/dealKey'
import styled from 'styled-components'
import {dealImgUrl} from '../../../../tools/img'
import {BScroller} from '../../../../components/BScroll/BScroller'

const themeSelectionModel = modelFactory('themeSelectionModel', {
  themeSelectionData: [] as any[],
  productListForTheme: {} as {
    [key in string]: Product[]
  },
}, {
  getData: async (value, option) => {
    const res = await option.query(doc.getDataConfig, {
      data: {
        type: DictTypeEnum.PromotionThemeSelect,
      } as DataConfigItemInput,
    })
    const themeList = res?.getDataConfig?.value?.list ?? []
    const productRes = await option.query(doc.productListByIds, {
      ids: themeList.reduce((pre: any, cur: any) => {
        return [
          ...pre,
          ...cur?.selectProductList ?? [],
        ]
      }, []),
    })
    option.setData(fpMergePre({
      themeSelectionData: themeList,
      productListForTheme: themeList.reduce((pre: any, cur: any) => {
        return {
          ...pre,
          [cur.id]: cur?.selectProductList?.map((id: string) => productRes?.productListByIds?.list?.find((v1: Product) => v1?.id === id) ?? null).filter((v: any) => v),
        }
      }, {}),
    }))
  },

})

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-left: 20px;
`
const Theme = styled.div`
  width: 100vw;
  position: relative;
  left: -3.125vw;
  margin-top: 16px;
  > img {
    width: 100vw;
    height: 30vw;
  }
  > main, aside {
    color: white;
    text-shadow: 0.1em 0.1em 0.2em black;
    position: absolute;
  }
  > main {
    top: 8vw;
    left: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  > aside {
    top: 16vw;
    left: 20px;
    font-size: 16px;
  }
`
const ProductList = styled.div`
  white-space: nowrap;
  display: inline-block;
  > * {
    display: inline-block;
    margin: 8px 16px 8px 0;
    width: 35vw;
  }
`

export const ThemeSelection = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(themeSelectionModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [])

  return <div>
    <Title>{ls('主题甄选')}</Title>
    {statePromotionFlashSale.themeSelectionData?.map(v => <React.Fragment
        key={`themeSelectionDataImg${v.id}`}
    >
      <Theme>
        <img
            src={dealImgUrl(v.imgUrl)}
            alt={''}
        />
        <main>{v.title}</main>
        <aside>{v.remark}</aside>
      </Theme>
      <BScroller
          isX={true}
          boxWidth={'calc(100vw - 20px)'}
          boxHeight={'auto'}
      >
        <ProductList>
          {statePromotionFlashSale.productListForTheme[v.id]?.map(v => <ProductItem
              key={`statePromotionFlashSaleProductItem_${v.id}`}
              product={v}/>)}
        </ProductList>
      </BScroller>
    </React.Fragment>)}
  </div>
}
