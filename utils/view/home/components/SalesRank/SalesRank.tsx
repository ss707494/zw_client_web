import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Product} from '../../../../graphqlTypes/types'
import {ProductItemOneRow} from '../../../../components/ProductItem/ProductItem'
import styled from 'styled-components'
import {ls} from '../../../../tools/dealKey'
import {dealUrlQuery, fpMergePre} from '../../../../tools/utils'
import Router, {useRouter} from 'next/router'
import {SaleRankTypeEnum} from '../../../../ss_common/enum'
import {Tab, Tabs} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'

const SalesRankModel = modelFactory('SalesRank', {
  listData: [] as Product[],
}, {
  getList: async (value, option) => {
    const res = await option.query(doc.productListOrderByOrder, {
      orderByType: '',
      ...value ?? {},
    })
    option.setData(fpMergePre({
      listData: res?.productListOrderByOrder?.list ?? [],
    }))
  },
  tabChange: (value, option) => {
    const query = dealUrlQuery({
      salesRankType: value,
    })
    Router.push(`/home/[appModule]${query}`, `/home/salesRank${query}`)
  },
})

const Box = styled.div`
`
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const SalesRank = () => {
  const router = useRouter()
  useEffect(() => {
    if (!router.query.salesRankType || ![SaleRankTypeEnum.OneMonth, SaleRankTypeEnum.OneWeek, SaleRankTypeEnum.OneDay].includes(`${router?.query?.salesRankType}`)) {
      const query = dealUrlQuery({
        salesRankType: SaleRankTypeEnum.OneDay,
      })
      router.push(`/home/[appModule]${query}`, `/home/salesRank${query}`)
    }
  }, [router.query.salesRankType])
  const {actions: actionsSalesRankModel, state: stateSalesRankModel} = useStoreModel(SalesRankModel)
  useEffect(() => {
    if (router.query.salesRankType) {
      actionsSalesRankModel.getList({
        orderByType: router.query.salesRankType,
      })
    }
  }, [router.query.salesRankType])

  return <Box>
    <Title>{ls('排行榜')}</Title>
    <Tabs
        variant={'fullWidth'}
        value={router.query.salesRankType ?? SaleRankTypeEnum.OneDay}
        onChange={(event, value) => actionsSalesRankModel.tabChange(value)}
    >
      {[
        [SaleRankTypeEnum.OneDay, '24小时排行'],
        [SaleRankTypeEnum.OneWeek, '本周排行'],
        [SaleRankTypeEnum.OneMonth, '本月排行'],
      ].map(v =>
          <Tab
              key={`SaleRankTab${v[0]}`}
              value={v[0]}
              label={ls(v[1])}
          />,
      )}
    </Tabs>
    <Space h={16}/>
    {stateSalesRankModel.listData.map(product => <ProductItemOneRow
        key={`ProductItemOneRow_${product.id}`}
        product={product}
    />)}
  </Box>
}
