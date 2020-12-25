import styled from 'styled-components'
import React, {useEffect} from 'react'
import {mpStyle} from '../../../../style/common'
import {ll} from '../../../../tools/dealKey'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {SalesRankModel} from '../../../m/home/components/SalesRank/SalesRank'
import {ProductItemInput} from '../../../../graphqlTypes/types'
import {useRouter} from 'next/router'
import {SaleRankTypeEnum} from '../../../../ss_common/enum'
import {ProductItemBox} from '../../pcComponents/productItemBox/productItemBox'

const Box = styled.div`
`
const Title = styled.div`
  ${mpStyle.fontType.xl};
`
const Content = styled.div`
  display: grid;
  grid-gap: 24px;
  padding-top: 24px;
  margin-top: 20px;
  box-shadow: 0 4px 8px 0 #F5F5F5;

  > section {
    background: #4A90E2;
  }
`
const Rank = styled.div`
  position: relative;
  > aside {
    position: absolute;
    top: -10px;
    left: 15px;
    > main {
      width: 40px;
      height: 40px;
      display: grid;
      align-items: center;
      justify-items: center;
      color: #fff;
      background: ${mpStyle.red};
      border-radius: 50%;
      ${mpStyle.fontType.xl};
    }
    > img {
      width: 40px;
      height: 40px;
    }
  }
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
  }, [actionsSalesRankModel, router.query.salesRankType])

  return <Box
      id={'SalesRank'}
  >
    <Title>
      {ll('热门排行')}
    </Title>
    <Content>
      {stateSalesRankModel.listData.map((product, index) => <Rank
          key={`ProductItem_${product.id}`}
      >
        <ProductItemBox
            width={209}
            hidePrice={true}
            hideShopCartButton={true}
            product={product}
        />
        <aside>
          <main
              style={(index === 0 && {
                background: 'linear-gradient(144deg, #FFF0B1 0%, #B6883B 100%)',
              }) || (index === 1 && {
                background: 'linear-gradient(144deg, #E8E5E5 0%, #A5A3A3 100%)',
              }) || (index === 2 && {
                background: 'linear-gradient(144deg, #F8C8A9 0%, #C28753 100%)',
              }) || {}}
          >{index + 1}</main>
        </aside>
      </Rank>)}
    </Content>
  </Box>
}
