import styled from 'styled-components'
import React, {useEffect} from 'react'
import {mpStyle} from '../../../../style/common'
import {ls} from '../../../../tools/dealKey'
import {Space} from '../../../../components/Box/Box'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {SalesRankModel} from '../../../m/home/components/SalesRank/SalesRank'
import {ProductItemInput} from '../../../../graphqlTypes/types'
import {useRouter} from 'next/router'
import {SaleRankTypeEnum} from '../../../../ss_common/enum'
import {ProductItemBox} from '../../pcComponents/productItemBox/productItemBox'

const Box = styled.div`
`
const Title = styled.div`
  ${mpStyle.fontType.xxl};
`
const Content = styled.div`
  display: grid;
  grid-gap: 24px;
`

export const SalesRank = () => {
  const router = useRouter()
  const {actions: actionsSalesRankModel, state: stateSalesRankModel} = useStoreModel(SalesRankModel)
  useEffect(() => {
    if (1 || router.query.salesRankType) {
      actionsSalesRankModel.getList({
        productInput: {
          isGroup: 0,
        } as ProductItemInput,
        orderByType: router.query.salesRankType ?? SaleRankTypeEnum.OneMonth,
      })
    }
  }, [router.query.salesRankType])

  return <Box>
    <Title>
      {ls('热门排行')}
    </Title>
    <Space h={24}/>
    <Content>
      {stateSalesRankModel.listData.map(product => <ProductItemBox
          product={product}
          key={`ProductItem_${product.id}`}
      />)}
    </Content>
  </Box>
}
