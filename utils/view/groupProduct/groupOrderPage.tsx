import React from 'react'
import {modelFactory} from '../../ModelAction/modelUtil'
import styled from 'styled-components'
import {useStoreModel} from '../../ModelAction/useStore'
import {fpMergePre} from '../../tools/utils'
import {groupProductModel} from './[id]'

export const groupOrderPageModel = modelFactory('orderPageModel', {
  show: false,
}, {
  open: (value, option) => {
    option.setData(fpMergePre({
      show: true,
    }))
  },
})

const OrderPageBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  
`

export const GroupOrderPage = () => {
  const {state: stateOrderPageModel} = useStoreModel(groupOrderPageModel)
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)

  return stateOrderPageModel.show && <OrderPageBox
  >
    page
  </OrderPageBox> || null
}
