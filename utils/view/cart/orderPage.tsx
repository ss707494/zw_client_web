import React, {useEffect} from 'react'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import {useStoreModel} from '../../ModelAction/useStore'
import {pageTypeEnum, shopCartModel} from './index'
import styled from 'styled-components'
import { ls } from '../../tools/dealKey'
import {PickUpTypeEnum} from '../../ss_common/enum'
import {doc} from '../../graphqlTypes/doc'
import {LinearProgress} from '@material-ui/core'
import {BScroller} from '../../components/BScroll/BScroller'
import {Space} from '../../components/Box/Box'

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const AddressBox = styled.div`
  
`

export const OrderPage = () => {
  const {state: stateSCM, actions: actionsSCM, getLoad} = useStoreModel(shopCartModel)

  useEffect(() => {
    if (!stateSCM.user.id) {
      actionsSCM.getOrderInfo()
    }
  }, [])

  return <div>
    <HeaderTitle
        title={'确认订单'}
        backCall={() => {
          actionsSCM.updatePageType(pageTypeEnum.shopCart)
          return true
        }}
    />
    {(!!getLoad(doc.orderConfirmInfo) && <LinearProgress/>) || <div style={{height: '4px'}}/>}
    <BScroller
        boxHeight={'calc(100vh - 65px)'}
    >
      <Space h={10} />
      <Title>
        <Space w={20} />
        {ls((stateSCM.form.pickUpType === PickUpTypeEnum.Self && '自取地址') || '送货地址')}
      </Title>
      <AddressBox>
        <main>
          <header>{}</header>
        </main>
      </AddressBox>
    </BScroller>
  </div>
}
