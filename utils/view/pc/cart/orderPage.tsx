import React from 'react'
import {MainBox} from '../pcComponents/mainBox/mainBox'
import {PcHeader} from '../pcComponents/header/header'
import {PcContentBox} from '../home/pcHome'
import styled from 'styled-components'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from '../home/components/headerTab'
import {Space} from '../../../components/Box/Box'
import {mpStyle} from '../../../style/common'
import {ls} from '../../../tools/dealKey'
import {dealMoney} from '../../../tools/utils'
import {useOrderPageHooks} from '../../m/cart/orderPage'
import {
  Divider,
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'

const OrderContentBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: ${mpStyle.spacePx.n};
`
const ModifyBox = styled.div`
`
const OrderDetailBox = styled.div`
  padding: ${mpStyle.spacePx.xs};
  border: 1px solid ${mpStyle.greyLite};
  > header {
    ${mpStyle.fontType.n};
  }
`
const ShopTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${mpStyle.spacePx.xs};
`
const RedSpan = styled.span`
  color: ${mpStyle.red};
`
const FillInputBox = styled.div`
  &&& {
    .MuiFilledInput-input {
      padding-top: 10px;
    }
  }
`
const ProductBox = styled.div`
`

export const OrderPage = () => {
  const {
    stateShopCartModel,
    actionsShopCartModel,
    getLoad,
    addressData,
    cardData,
    productTotal,
    transportationCosts,
    actuallyPaid,
    generateCoin,
  } = useOrderPageHooks()

  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Space h={mpStyle.space.s}/>
      <OrderContentBox>
        <ModifyBox>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              1 我的购物车
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ProductBox>

              </ProductBox>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ModifyBox>
        <OrderDetailBox>
          <header>{ls('订单详情')}</header>
          <ShopTotal>
            <header>{ls('购物车总计')}</header>
            <footer>{dealMoney(productTotal - (stateShopCartModel.form?.couponDiscount ?? 0))}</footer>
          </ShopTotal>
          {/*{dealMaybeNumber(stateShopCartModel.form?.couponDiscount) > 0 && <ShopTotal>*/}
          {/*  <header>{ls('优惠折扣')}</header>*/}
          {/*  <footer>{dealMoney(stateShopCartModel.form?.couponDiscount)}</footer>*/}
          {/*</ShopTotal>}*/}
          {transportationCosts > 0 && <ShopTotal>
            <header>{ls('运费')}</header>
            <footer>{dealMoney(transportationCosts)}</footer>
          </ShopTotal>}
          <ShopTotal>
            <header>{ls('达人币抵扣')}</header>
            <footer>{dealMoney(stateShopCartModel.form.deductCoin, '-')}</footer>
          </ShopTotal>
          {/*<ShopTotal>*/}
          {/*  <header>{ls('消费税')}</header>*/}
          {/*  <footer>{dealMoney(stateShopCartModel.form.saleTax)}</footer>*/}
          {/*</ShopTotal>*/}
          <Space h={mpStyle.space.xs}/>
          <Divider
              light={true}
          />
          <ShopTotal
              style={{fontSize: '18px'}}
          >
            <header>{ls('订单总额')}</header>
            <footer>{dealMoney(actuallyPaid)}</footer>
          </ShopTotal>
          <Space h={mpStyle.space.s}/>
          <div>
            {ls('使用达人币')}
            <RedSpan>
              {ls('当月可用余额')} {dealMoney(stateShopCartModel.user?.orderCoinCurrentMonth)}
            </RedSpan>
          </div>
          <Space h={mpStyle.space.xxs}/>
          <FillInputBox>
            <TextField
                variant={'filled'}
                label={ls('')}
                value={stateShopCartModel.form.deductCoin}
                onChange={e => {
                  actionsShopCartModel.setForm(['deductCoin', e.target.value])
                }}
            />
          </FillInputBox>
          <Space h={mpStyle.space.s}/>
          <ShopTotal>
            <header>{ls('购物车总计')}</header>
            <footer>{dealMoney(productTotal - (stateShopCartModel.form?.couponDiscount ?? 0))}</footer>
          </ShopTotal>
          <Space h={mpStyle.space.s}/>
          <Button
              fullWidth={true}
              variant={'contained'}
              color={'secondary'}
          >
            {ls('提交订单')}
          </Button>
        </OrderDetailBox>
      </OrderContentBox>
    </PcContentBox>
  </MainBox>
}
