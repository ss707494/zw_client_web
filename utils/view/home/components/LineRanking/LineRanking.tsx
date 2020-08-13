import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {GroupQueue} from '../../../../graphqlTypes/types'
import {doc} from '../../../../graphqlTypes/doc'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {dealMaybeNumber, fpMergePre} from '../../../../tools/utils'
import {GroupProductItem} from '../../../../components/ProductItem/ProductItem'
import {Space} from '../../../../components/Box/Box'

export const LineRankingModel = modelFactory('LineRanking', {
  list: [] as GroupQueue[],
}, {
  getList: async (value, option) => {
    const res = await option.query(doc.groupQueueList, {})
    option.setData(fpMergePre({
      list: res?.groupQueueList ?? [],
    }))
  },
})

export const LineRanking = () => {
  const {actions: actionsLineRankingModel, state: stateLineRankingModel} = useStoreModel(LineRankingModel)
  useEffect(() => {
    actionsLineRankingModel.getList()
  }, [])
  return <div>
    {stateLineRankingModel.list
        .filter(v => dealMaybeNumber(v.sumFillAmount) < dealMaybeNumber(v.product?.groupPrecision))
    .sort((a, b) => dealMaybeNumber(b.sumFillAmount) - dealMaybeNumber(a.sumFillAmount)).map(value => <React.Fragment
            key={`ProductItem_${value.id}`}
        >
          <Space h={16}/>
          <GroupProductItem
              product={value.product ?? {}}
              groupQueue={value}
          />
        </React.Fragment>,
    )}
  </div>
}
