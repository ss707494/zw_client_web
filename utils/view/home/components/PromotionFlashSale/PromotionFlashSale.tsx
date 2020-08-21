import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Product} from '../../../../graphqlTypes/types'
import styled from 'styled-components'
import {ls} from '../../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {ProductItemOneRow} from '../../../../components/ProductItem/ProductItem'
import {differenceInHours, differenceInMinutes} from 'date-fns'

const getNowSale = (list: any[]) => {
  const now = new Date().getTime()
  return list?.find((v: any) => {
    return now > new Date(v.startTime).getTime() &&
        now < new Date(v.endTime).getTime()
  }) ?? {}
}

const promotionFlashSaleModel = modelFactory('promotionFlashSaleModel', {
  limitTimeData: [] as any[],
  nowLimitData: {} as any,
  productList: [] as Product[],
}, {
  getData: async (value, option) => {
    const res = await option.query(doc.limitTimeData)
    const productRes = await option.query(doc.productListByIds, {
      ids: getNowSale(res?.limitTimeData?.value?.list)?.selectProductList ?? [],
    })
    option.setData(fpMergePre({
      nowLimitData: getNowSale(res?.limitTimeData?.value?.list),
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
  // console.log(statePromotionFlashSale.limitTimeData?.[0]?.endTime)
  // console.log(statePromotionFlashSale.productList)
  // console.log(differenceInMilliseconds(new Date(statePromotionFlashSale.limitTimeData?.[0]?.endTime), new Date()))
  // console.log(differenceInDays(new Date(statePromotionFlashSale.limitTimeData?.[0]?.endTime), new Date()))

  return <div>
    {statePromotionFlashSale.nowLimitData?.id &&
    <>
      <Tip>
        <main>{ls('限时选购')}</main>
        <section>{ls('剩余')}</section>
        <span>{`${differenceInHours(new Date(statePromotionFlashSale.nowLimitData?.endTime ?? ''), new Date())}`}</span>
        <section>{ls('小时')}</section>
        <span>{`${differenceInMinutes(new Date(statePromotionFlashSale.nowLimitData?.endTime ?? ''), new Date()) % 60}`}</span>
        <section>{ls('分钟')}</section>
        {/*<span>0</span>*/}
        {/*:*/}
        {/*<span>0</span>*/}
        {/*<span>0</span>*/}
      </Tip>
      {statePromotionFlashSale.productList.map(product => <ProductItemOneRow
          key={`ProductItemOneRow_${product.id}`}
          product={product}
      />)}
    </>
    || <div>暂无限时抢购商品,敬请期待</div>
    }

  </div>
}
