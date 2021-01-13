import React, {useEffect} from 'react'
import {mpStyle} from '../../../../style/common'
import {jssStyled} from '../../../../tools/jssStyled'
import {ll} from '../../../../tools/dealKey'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {LineRankingModel} from '../../../m/home/components/LineRanking/LineRanking'
import {dealMaybeNumber} from '../../../../tools/utils'
import {ProductItemBox} from '../../pcComponents/productItemBox/productItemBox'
import {HomeType} from '../../../m/home/appModule'

const Box = jssStyled('div')({})
const Title = jssStyled('div')({
  ...mpStyle.fontTypeObj.xl,
})
const Content = jssStyled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
})

export const LineRanking = () => {
  const {actions: actionsLineRankingModel, state: stateLineRankingModel} = useStoreModel(LineRankingModel)
  useEffect(() => {
    actionsLineRankingModel.getList()
  }, [actionsLineRankingModel])

  return <Box>
    <Title>{ll('冲线排行')}</Title>
    <Content>
      {stateLineRankingModel.list
          .filter(v => dealMaybeNumber(v.sumFillAmount) < dealMaybeNumber(v.product?.groupPrecision))
          .sort((a, b) => dealMaybeNumber(b.sumFillAmount) - dealMaybeNumber(a.sumFillAmount)).map(value =>
              <ProductItemBox
                  key={`stateProductListModel.productList_${value.id}`}
                  product={value.product ?? {}}
                  groupQueue={value}
                  type={HomeType.group}
              />)}
    </Content>
  </Box>
}
