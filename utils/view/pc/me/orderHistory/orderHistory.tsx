import React, {useEffect} from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {MeLayoutBox} from '../components/meLayoutBox'
import {MyInfo} from '../components/myInfo'
import styled from 'styled-components'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {orderHistoryModel} from '../../../m/me/orderHistory/orderHistory'
import {dealMaybeNumber, dealMoney, formatDate, fpMergePre} from '../../../../tools/utils'
import {Button, ButtonProps, Divider} from '@material-ui/core'
import {ll} from '../../../../tools/dealKey'
import {dealImgUrl} from '../../../../tools/img'
import {doc} from '../../../../graphqlTypes/doc'
import {DictTypeEnum, PickUpTypeEnum} from '../../../../ss_common/enum'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {Maybe, OrderInfo} from '../../../../graphqlTypes/types'
import {useRouter} from 'next/router'

export const SelfAddressModel = modelFactory('SelfAddressModel', {
  list: [],
}, {
  getList: async (value, option) => {
    const selfAddress = await option.query(doc.getDataConfig, {
      data: {
        type: DictTypeEnum.SelfAddress,
      },
    })
    option.setData(fpMergePre({
      list: selfAddress?.getDataConfig?.value?.list || [],
    }))
  },
})

const Title = styled.div`
  ${mpStyle.fontType.l};
`
const OrderBox = styled.div`
`
const OrderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const OrderTime = styled.div`
  ${mpStyle.fontType.l};
`
const DetailItem = styled(Button)<ButtonProps>`
`
const OrderPay = styled.div`
  color: ${mpStyle.grey};
`
const OrderNum = styled.div`
  color: ${mpStyle.grey};
`
export const OrderAddressBox = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-template-rows: 32px 24px;
  > svg {
    grid-area: 1/1/3/2;
    align-self: center;
    font-size: 32px;
    color: ${mpStyle.red};
  }
  > section {
    ${mpStyle.fontType.n};
    align-self: center;
  }
`
const OrderImgBox = styled.div`
  display: flex;
  > img {
    width: 88px;
    height: 140px;
    margin-right: ${mpStyle.spacePx.n};
  }
`

export const calcAddress = (order: Maybe<OrderInfo>, selfAddress: any[]) => {
  if (order?.pickUpType === PickUpTypeEnum.Delivery) {
    return order?.userAddress
  } else {
    return selfAddress.find(value => value?.id === order?.selfAddressId)
  }
}

export const OrderHistory = () => {
  const router = useRouter()
  const {state: stateOrderHistoryModel, actions: actionsOrderHistoryModel} = useStoreModel(orderHistoryModel)
  useEffect(() => {
    actionsOrderHistoryModel.getList()
  }, [])
  const {actions: actionsSelfAddressModel, state: stateSelfAddressModel} = useStoreModel(SelfAddressModel)
  useEffect(() => {
    actionsSelfAddressModel.getList()
  }, [])

  return <MeLayoutBox>
    <MyInfo/>
    <Space h={mpStyle.space.n}/>
    <Title>{ll('订单历史')}</Title>
    {stateOrderHistoryModel.orderList.list?.map(order => <OrderBox
        key={`stateOrderHistoryModel.orderList.list?${order?.id}`}
    >
      <Space h={mpStyle.space.xs}/>
      <OrderTop>
        <OrderTime>{formatDate(order?.createTime, 'YYYY-MM-dd HH:mm')}</OrderTime>
        <DetailItem
            onClick={() => {
              router.push(`/pc/me/orderDetail/${order?.id ?? ''}`)
            }}
        >{ll('详情')} ></DetailItem>
      </OrderTop>
      <Space h={mpStyle.space.xxs}/>
      <OrderPay>{dealMoney(order?.actuallyPaid)}</OrderPay>
      <Space h={mpStyle.space.xxs / 2}/>
      <OrderNum>{order?.number}</OrderNum>
      <Space h={mpStyle.space.xxs}/>
      <OrderAddressBox>
        <CheckCircleIcon/>
        <section>{ll('已自取')}</section>
        <footer>{ll('于')}{calcAddress(order, stateSelfAddressModel.list)?.name ?? ''}</footer>
      </OrderAddressBox>
      <Space h={mpStyle.space.xxs}/>
      <OrderImgBox>
        {order?.rOrderProduct?.filter(value => value?.product?.img?.[0]?.url)?.map(value1 => <img
            key={`url_${value1?.product?.img?.[0]?.url}`}
            src={dealImgUrl(value1?.product?.img?.[0]?.url)}
            alt=""/>)}
        {ll('共')} {dealMaybeNumber(order?.rOrderProduct?.length)} {ll('件商品')}
      </OrderImgBox>
      <Space h={mpStyle.space.n}/>
      <Divider/>
    </OrderBox>)}
  </MeLayoutBox>
}
