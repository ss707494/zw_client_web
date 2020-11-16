import React, {useEffect} from 'react'
import {MeLayoutBox} from '../components/meLayoutBox'
import {MyInfo} from '../components/myInfo'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'
import styled from 'styled-components'
import { ls } from '../../../../tools/dealKey'
import {useRouter} from 'next/router'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {orderDetailModel} from '../../../m/me/orderDetail/orderDetail'
import {PickUpTypeEnum} from '../../../../ss_common/enum'
import {dealLastNumber, dealMoney, formatDate} from '../../../../tools/utils'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {calcAddress, OrderAddressBox, SelfAddressModel} from '../orderHistory/orderHistory'
import {Divider} from '@material-ui/core'
import {OrderProductBox} from '../components/orderProductBox'

const Title = styled.div`
  ${mpStyle.fontType.l};
`
const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content min-content;
  grid-auto-flow: column;
  grid-gap: ${mpStyle.spacePx.xs};
  padding: ${mpStyle.spacePx.xs};
  border: 1px solid ${mpStyle.grey};
  > section {
    > header {
      font-weight: bold;
      margin-bottom: ${mpStyle.spacePx.xxs};
    }
  }
`
const ProductBox = styled.div`
  display: flex;
  > section {
    flex-grow: 1;
  }
  > aside {
    flex-basis: 320px;
    > header {
      ${mpStyle.fontType.n};
    }
  }
`
const TotalBox = styled.div`
  padding: ${mpStyle.spacePx.xs};
  border: 1px solid ${mpStyle.grey};
  border-radius: 4px;
  > section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const BoldBox = styled.section`
  font-weight: bold;
`

export const OrderDetail = () => {
  const router = useRouter()
  const {state: stateOrderDetailModel, actions: actionsOrderDetailModel} = useStoreModel(orderDetailModel)
  const orderInfo = stateOrderDetailModel.orderInfo

  useEffect(() => {
    if (router.query.id && !stateOrderDetailModel.orderInfo?.id) {
      actionsOrderDetailModel.getDetail(`${router.query?.id}`)
    }
  }, [router.query.id, stateOrderDetailModel.orderInfo])

  const {actions: actionsSelfAddressModel, state: stateSelfAddressModel} = useStoreModel(SelfAddressModel)
  useEffect(() => {
    actionsSelfAddressModel.getList()
  }, [])

  return <MeLayoutBox>
    <MyInfo/>
    <Space h={mpStyle.space.n}/>
    <Title>{ls('订单历史')} > {ls('订单详情')}</Title>
    <Space h={mpStyle.space.n}/>
    <InfoBox>
      <section>
        <header>{ls('订单编号')}</header>
        <main>{orderInfo.number}</main>
      </section>
      <section>
        <header>{ls('取货地址')}</header>
        <main>
          {(orderInfo.pickUpType === PickUpTypeEnum.Self &&
              (v => <>
                <main>{v.fullName}</main>
                <Space h={mpStyle.space.xxs / 2}/>
                <header>{v.streetAddress}</header>
                <Space h={mpStyle.space.xxs / 2}/>
                <footer>{v.city} {v.province} {v.zip}</footer>
              </>)(stateOrderDetailModel.selfAddress.find(v => v.id === orderInfo.selfAddressId))
          ) || <>
            <main>{orderInfo.userAddress?.name}</main>
            <Space h={mpStyle.space.xxs / 2}/>
            <header>{orderInfo.userAddress?.address}</header>
            <Space h={mpStyle.space.xxs / 2}/>
            <footer>{orderInfo.userAddress?.city} {orderInfo.userAddress?.province} {orderInfo.userAddress?.zip}</footer>
          </>}
        </main>
      </section>
      <section>
        <header>{ls('交易时间')}</header>
        <main>{formatDate(orderInfo.createTime, 'YYYY/MM/dd')}</main>
      </section>
      <section>
        <header>{ls('支付方式')}</header>
        <main>
          <header>{orderInfo?.userPayCard?.code}</header>
          <Space h={mpStyle.space.xxs / 2}/>
          <main>{ls('过期日')} {formatDate(orderInfo?.userPayCard?.expirationTime, 'MM/yy')}</main>
          <Space h={mpStyle.space.xxs / 2}/>
          <footer>{ls('卡号')} {dealLastNumber(orderInfo.userPayCard?.number)}</footer>
          <Space h={mpStyle.space.xxs / 2}/>
          <footer>{ls('持卡人')} {orderInfo?.userPayCard?.userName}</footer>
        </main>
      </section>
    </InfoBox>
    <Space h={mpStyle.space.n}/>
    <ProductBox>
      <section>
        <OrderAddressBox>
          <CheckCircleIcon/>
          <section>{ls('已自取')}</section>
          <footer>{ls('于')}{calcAddress(orderInfo, stateSelfAddressModel.list)?.name ?? ''}</footer>
        </OrderAddressBox>
        <Space h={mpStyle.space.xs}/>
        <Divider />
        <Space h={mpStyle.space.xs}/>
        {orderInfo.rOrderProduct?.map(rOrderProduct => <OrderProductBox
            key={`orderInfo.rOrderProduct${rOrderProduct.id}`}
            rOrderProduct={rOrderProduct}
        />)}
      </section>
      <Space w={mpStyle.space.xs}/>
      <aside>
        <header>{ls('订单结算')}</header>
        <Space h={mpStyle.space.xs}/>
        <TotalBox>
          <section>
            <aside>{ls('小计')}</aside>
            <main>{dealMoney(orderInfo.subtotal)}</main>
          </section>
          <Space h={mpStyle.space.xs}/>
          <section>
            <aside>{ls('优惠券折扣')}</aside>
            <main>{dealMoney(0, '-')}</main>
          </section>
          <Space h={mpStyle.space.xs}/>
          <section>
            <aside>{ls('运费')}</aside>
            <main>{dealMoney(orderInfo.transportationCosts)}</main>
          </section>
          <Space h={mpStyle.space.xs}/>
          <section>
            <aside>{ls('达人币抵扣')}</aside>
            <main>{dealMoney(orderInfo.deductCoin, '-')}</main>
          </section>
          <Space h={mpStyle.space.xs}/>
          <Divider />
          <Space h={mpStyle.space.xs}/>
          <BoldBox>
            <aside>{ls('实际支付')}</aside>
            <main>{dealMoney(orderInfo.actuallyPaid)}</main>
          </BoldBox>
        </TotalBox>
      </aside>
    </ProductBox>
  </MeLayoutBox>
}
