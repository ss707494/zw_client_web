import React, {useEffect} from 'react'
import {modelFactory} from '../../../../../ModelAction/modelUtil'
import {doc} from '../../../../../graphqlTypes/doc'
import {fpMergePre} from '../../../../../tools/utils'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {Product} from '../../../../../graphqlTypes/types'
import styled from 'styled-components'
import {ls} from '../../../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {ProductItemOneRow} from '../../../../../components/ProductItem/ProductItem'
import {differenceInHours, differenceInMinutes} from 'date-fns'

const getNowSale = (list: any[]) => {
  const now = new Date().getTime()
  const saleOne = list?.find((v: any) => {
    return now > new Date(v.startTime).getTime() &&
        now < new Date(v.endTime).getTime()
  }) ?? {}
  if (saleOne?.id) {
    return {
      data: saleOne,
      isNext: false,
    }
  } else {
    return {
      data: list?.filter(v => new Date(v.startTime).getTime() > now)?.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())?.[0] ?? {},
      isNext: true,
    }
  }
}

export const promotionFlashSaleModel = modelFactory('promotionFlashSaleModel', {
  limitTimeData: [] as any[],
  nowLimitData: {} as any,
  productList: [] as Product[],
  isNext: false,
}, {
  calcDifferenceHours: (value, option) => differenceInHours(new Date(option.data?.nowLimitData?.endTime ?? ''), new Date()),
  calcDifferenceMinutes: (value, option) => differenceInMinutes(new Date(option.data.nowLimitData?.endTime ?? ''), new Date()) % 60,
  getData: async (value, option) => {
    const res = await option.query(doc.limitTimeData)
    const nowSaleData = getNowSale(res?.limitTimeData?.value?.list)
    const productRes = await option.query(doc.productListByIds, {
      ids: nowSaleData?.data?.selectProductList ?? [],
    })
    option.setData(fpMergePre({
      nowLimitData: nowSaleData.data,
      isNext: nowSaleData.isNext,
      limitTimeData: res?.limitTimeData?.value?.list || [],
      productList: [
        // ...productRes?.productListByIds?.list,
        // ...productRes?.productListByIds?.list,
        ...productRes?.productListByIds?.list || [],
      ] ?? [],
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
    {statePromotionFlashSale.nowLimitData?.id &&
    <>
      <Tip>
        <main>{statePromotionFlashSale.isNext && ls('距离下次抢购') || ls('限时选购')}</main>
        <section>{ls('剩余')}</section>
        <span>{`${actionsPromotionFlashSale.calcDifferenceHours()}`}</span>
        <section>{ls('小时')}</section>
        <span>{`${actionsPromotionFlashSale.calcDifferenceMinutes()}`}</span>
        <section>{ls('分钟')}</section>
        {/*<span>0</span>*/}
        {/*:*/}
        {/*<span>0</span>*/}
        {/*<span>0</span>*/}
      </Tip>
      {statePromotionFlashSale.productList.map(product => <ProductItemOneRow
          key={`ProductItemOneRow_${product.id}`}
          product={product}
          hideAction={statePromotionFlashSale.isNext}
      />)}
    </>
    || <div>暂无限时抢购，敬请期待</div>
    }

  </div>
}
