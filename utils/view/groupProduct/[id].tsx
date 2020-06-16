import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {modelFactory} from '../../ModelAction/modelUtil'
import {Product} from '../../graphqlTypes/types'
import {doc} from '../../graphqlTypes/doc'
import {useStoreModel} from '../../ModelAction/useStore'
import {fpMergePre} from '../../tools/utils'
import CusCarousel from '../../components/Swipe/Swipe'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'

export const groupProductModel = modelFactory('groupProductModel', {
  product: {} as Product,
}, {
  getData: async (value: string, option) => {
    const res = await option.query(doc.productListByIds, {
      ids: [value],
    })
    option.setData(fpMergePre({
      product: res?.productListByIds?.list[0] ?? {},
    }))
  },

})

export const GroupProduct = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  useEffect(() => {
    actionsGroupProduct.getData(id)
  }, [id])

  return <div>
    <HeaderTitle
        title={'产品详情'}
    />
    <CusCarousel
        height={'240px'}
        dataList={stateGroupProduct.product?.img?.map(v => ({
          ...v,
          imgUrl: v?.url,
        })) as []}
    />
    {id}
    groupProduct
  </div>
}
