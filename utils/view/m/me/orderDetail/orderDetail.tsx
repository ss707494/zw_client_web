import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {BScroller} from '../../../../components/BScroll/BScroller'
import styled from 'styled-components'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {OrderInfo, OrderInfoItemInput} from '../../../../graphqlTypes/types'
import {doc} from '../../../../graphqlTypes/doc'
import {dealMoney, formatDate, fpMergePre, getLastNumber} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {useRouter} from 'next/router'
import {ls} from '../../../../tools/dealKey'
import {orderStateToString, PickUpTypeEnum} from '../../../../ss_common/enum'
import {mpStyle} from '../../../../style/common'
import {grey} from '@material-ui/core/colors'
import {dealImgUrl} from '../../../../tools/img'
import {Space} from '../../../../components/Box/Box'

export const orderDetailModel = modelFactory('orderDetail', {
  orderInfo: {} as OrderInfo,
  selfAddress: [] as any[],
}, {
  getDetail: async (value: string, option) => {
    const res = await option.query(doc.orderDetail, {id: value})
    option.setData(fpMergePre({
      orderInfo: res?.orderDetail || {},
      selfAddress: res?.selfAddress?.value?.list || [],
    }))
  },
  updateOrder: async (value: OrderInfoItemInput, option) => {
    return await option.mutate(doc.updateOrder, {
      orderInfoItemInput: value,
    })
  },
})

const Box = styled.div`
  padding: 0 20px;
`
const Top = styled.div`
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  > aside {
    margin-left: 20px;
    color: ${mpStyle.red};
  }
`
const InfoLabel = styled.div`
  display: flex;
  margin-top: 16px;
  > section {
    > * {
      margin-bottom: 4px;
    }
  }
  > aside {
    color: ${grey[600]};
    width: 80px;
  }
  
`

const GreyPart = styled.div`
  margin-top: 12px;
  position: relative;
  left: -20px;
  width: 100vw;
  height: 12px;
  background: ${grey[200]};
`
export const ProductBox = styled.div`
  display: grid;
  padding-top: 4vw;
  margin-bottom: 10px;
  grid-template-columns: min-content 1fr 30vw;
  > img {
    grid-area: 1/1/4/2;
    width: 20vw;
    height: 20vw;
    margin-right: 14px;
  }
  > section {
    grid-area: 1/2/2/4;
    font-size: 20px;
    > span {
      font-size: 16px;
      color: ${mpStyle.grey};
    }
  }
  > main {
    padding: 10px 0;
    grid-area: 2/2/3/4;
    font-size: 14px;
    color: ${grey[500]};
  }
  > footer {
    display: flex;
    > aside {
      text-decoration: line-through;
    }
    > span {
      margin-left: 5px;
      color: ${mpStyle.red};
      font-size: 17px;
    }
  }
  > aside {
    justify-self: end;
    > button {
      border-radius: 10px;
      padding: 2px 14px;
    }
  }
`
const Sum = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
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

  return <div>
    <HeaderTitle
        title={'订单详情'}
    />
    {!orderInfo?.id ? <div/> : <BScroller boxHeight={'calc(100vh - 60px)'}>
      <Box>
        <Space h={16}/>
        <Top>
          <section>{formatDate(orderInfo.createTime, 'YYYY/MM/dd')}</section>
          <aside>{orderStateToString(orderInfo?.state)}</aside>
        </Top>
        <InfoLabel>
          <aside>{ls('订单编号')} :</aside>
          <section>{orderInfo.number}</section>
        </InfoLabel>
        <InfoLabel>
          <aside>{ls('送货地址')} :</aside>
          <section>
            {(orderInfo.pickUpType === PickUpTypeEnum.Self &&
                (v => <>
                  <main>{v.fullName}</main>
                  <header>{v.streetAddress}</header>
                  <footer>{v.city} {v.province} {v.zip}</footer>
                </>)(stateOrderDetailModel.selfAddress.find(v => v.id === orderInfo.selfAddressId))
            ) || <>
              <main>{orderInfo.userAddress?.name}</main>
              <header>{orderInfo.userAddress?.address}</header>
              <footer>{orderInfo.userAddress?.city} {orderInfo.userAddress?.province} {orderInfo.userAddress?.zip}</footer>
            </>}
          </section>
        </InfoLabel>
        <InfoLabel>
          <aside>{ls('支付方式')} :</aside>
          <section>
            <header>{orderInfo?.userPayCard?.code}</header>
            <main>{ls('过期日')} {formatDate(orderInfo?.userPayCard?.expirationTime, 'MM/yy')}</main>
            <footer>{ls('卡号后四位')} {getLastNumber(`${orderInfo.userPayCard?.number}`)}</footer>
            <footer>{ls('持卡人')} {orderInfo?.userPayCard?.userName}</footer>
          </section>
        </InfoLabel>
        <GreyPart/>
        {orderInfo.rOrderProduct?.map(rOrderProduct => (
            <ProductBox
                key={`ProductBox_${rOrderProduct.id}`}
            >
              <img src={dealImgUrl(rOrderProduct.product?.img?.[0]?.url)}
                   alt=""/>
              <section>
                {rOrderProduct.product?.name}
                <Space w={mpStyle.space.xxs}/>
              </section>
              <main>{rOrderProduct.product?.remark}</main>
              <footer>
                <aside>{dealMoney(rOrderProduct.product?.priceMarket)}</aside>
                <span>{dealMoney(rOrderProduct.product?.priceOut)}</span>
              </footer>
              <aside>
                <span>
                  {rOrderProduct.product?.number}{rOrderProduct.product?.unit ?? ls('件')}
                </span>
                {/*<Button*/}
                {/*    variant={'contained'}*/}
                {/*>{ls('加入购物车')}</Button>*/}
              </aside>
            </ProductBox>
        ))}
        <div style={{height: '26px', width: '100%'}}/>
        <Sum>
          <aside>{ls('小计')}</aside>
          <main>{dealMoney(orderInfo.subtotal)}</main>
        </Sum>
        <Sum>
          <aside>{ls('优惠券折扣')}</aside>
          <main>{dealMoney(0, '-')}</main>
        </Sum>
        <Sum>
          <aside>{ls('运费')}</aside>
          <main>{dealMoney(orderInfo.transportationCosts)}</main>
        </Sum>
        <Sum>
          <aside>{ls('达人币抵扣')}</aside>
          <main>{dealMoney(orderInfo.deductCoin, '-')}</main>
        </Sum>
        {/*<Sum>*/}
        {/*  <aside>{ls('消费税')}</aside>*/}
        {/*  <main>{dealMoney(orderInfo.saleTax)}</main>*/}
        {/*</Sum>*/}
        <Sum>
          <aside>{ls('实际支付')}</aside>
          <main>{dealMoney(orderInfo.actuallyPaid)}</main>
        </Sum>
        <Sum>
          <aside>{ls('获得达人币')}</aside>
          <main>{dealMoney(orderInfo.generateCoin)}</main>
        </Sum>
        <div style={{height: '96px', width: '100%'}}/>
      </Box>
    </BScroller>}

  </div>
}
