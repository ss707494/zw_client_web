import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Product} from '../../../../graphqlTypes/types'
import styled from 'styled-components'
import { ls } from '../../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {ProductItemOneRow} from '../../../../components/ProductItem/ProductItem'

const promotionFlashSaleModel = modelFactory('promotionFlashSaleModel', {
  limitTimeData: [] as any[],
  productList: [] as Product[],
}, {
  getData: async (value, option) => {
    const res = await option.query(doc.limitTimeData)
    const productRes = await option.query(doc.productListByIds, {
      ids: res?.limitTimeData?.value?.list?.[0]?.selectProductList ?? [],
    })
    option.setData(fpMergePre({
      limitTimeData: res?.limitTimeData?.value?.list || [],
      productList: productRes?.productListByIds?.list ?? [],
    }))
  },

})

const Tip = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  > main {
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
  }
  > span {
    padding: 4px 2px;
    margin: 0 2px;
    background: ${grey[800]};
    color: white;
    border-radius: 6px;
  }
`

export const PromotionFlashSale = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(promotionFlashSaleModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [])

  return <div>
    <Tip>
      <main>{ls('限时选购')}</main>
      <span>0</span>
      <span>0</span>
      :
      <span>0</span>
      <span>0</span>
      :
      <span>0</span>
      <span>0</span>
    </Tip>
    {statePromotionFlashSale.productList.map(product => <ProductItemOneRow
        key={`ProductItemOneRow_${product.id}`}
        product={product}
    />)}
  </div>
}
