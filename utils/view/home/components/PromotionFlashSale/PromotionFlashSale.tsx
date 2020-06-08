import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'

const promotionFlashSaleModel = modelFactory('promotionFlashSaleModel', {
  limitTimeData: [] as any[],
}, {
  getData: async (value, option) => {
    const res = await option.query(doc.limitTimeData)
    option.setData(fpMergePre({
      limitTimeData: res?.limitTimeData?.value?.list || [],
    }))
  },

})
export const PromotionFlashSale = () => {
  const {state: statePromotionFlashSale, actions: actionsPromotionFlashSale} = useStoreModel(promotionFlashSaleModel)
  useEffect(() => {
    actionsPromotionFlashSale.getData()
  }, [])

  return <div>
    限时选购
  </div>
}
