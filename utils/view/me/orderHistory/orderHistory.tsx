import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {Tab, Tabs} from '@material-ui/core'
import {ls} from '../../../tools/dealKey'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../ModelAction/useStore'
import {fpMergePre} from '../../../tools/utils'
import {doc} from '../../../graphqlTypes/doc'
import {OrderInput} from '../../../graphqlTypes/types'

enum OrderState {
  all = 'all',
  await = 'await',
  prePay = 'prePay',
}

const orderHistoryModel = modelFactory('orderHistoryModel', {
  state: OrderState.all,
}, {
  changeState: (value, option) => {
    option.setData(fpMergePre({state: value}))
  },
  getList: async (value, option) => {
    const res = await option.query(doc.orderList, {
      data: {
        state: 0,
      } as OrderInput,
    })
    console.log(res)
  },

})

export const OrderHistory = () => {
  const {state: ohState, actions: ohActions} = useStoreModel(orderHistoryModel)
  useEffect(() => {
    ohActions.getList()
  }, [])

  return <div>
    <HeaderTitle
        title={'订单历史'}
    />
    <Tabs
        variant={'fullWidth'}
        value={ohState.state}
        onChange={(e, value) => ohActions.changeState(value)}
    >
      <Tab
          value={OrderState.all}
          label={ls('全部')}
      />
      <Tab
          value={OrderState.await}
          label={ls('待收货/取货')}
      />
      <Tab
          value={OrderState.prePay}
          label={ls('代付款')}
      />
    </Tabs>
    {ohState.state}
    orderHistory.tsx
  </div>
}
