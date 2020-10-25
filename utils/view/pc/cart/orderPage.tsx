import React from 'react'
import {MainBox} from '../pcComponents/mainBox/mainBox'
import {PcHeader} from '../pcComponents/header/header'
import {PcContentBox} from '../home/pcHome'
import styled from 'styled-components'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from '../home/components/headerTab'
import {Space} from '../../../components/Box/Box'
import {mpStyle, RedBox} from '../../../style/common'
import {ls} from '../../../tools/dealKey'
import {dealMaybeNumber, dealMoney, fpMergePre} from '../../../tools/utils'
import {useOrderPageHooks} from '../../m/cart/orderPage'
import {
  Divider,
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import {dealImgUrl} from '../../../tools/img'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../ModelAction/useStore'
import {useRouter} from 'next/router'

const OrderContentBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  grid-gap: ${mpStyle.spacePx.n};
`
const ModifyBox = styled.div`
  &&& {
    .MuiExpansionPanelDetails-root {
      flex-direction: column;
    }
  }
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
const TabHeader = styled.div<{ isAct: boolean }>`
  ${mpStyle.fontType.n};
  display: flex;
  align-items: center;
  > aside {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid ${mpStyle.grey};
    ${props => props.isAct && `
      background: ${mpStyle.red};
      border-color: ${mpStyle.red};
      color: #fff;
    `};
  }
`
const ProductBox = styled.div`
  width: 100%;
  border: 1px solid ${mpStyle.greyLite};
  border-radius: 4px;
`
const ProductBoxHeader = styled.div`
  height: 60px;
  background: ${mpStyle.greyLite};
  display: flex;
  align-items: center;
`
const ProductRow = styled.div`
  margin: ${mpStyle.spacePx.n} 0;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 1fr 32px 32px;
  grid-template-areas: 
  "img a d"
  "img b d"
  "img c d";
  > img {
    grid-area: img;
    justify-self: center;
    width: 80px;
    height: 120px;
  }
  > div {
    display: flex;
  }
  > section {
    grid-area: a;
  }
  > aside {
    grid-area: d;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    > header {
      height: 40px;
      flex-basis: 70%;
    }
    ${RedBox} {
      ${mpStyle.fontType.n};
      flex-grow: 1;
    }
  }
`
const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  .MuiButton-root {
    width: 45%;
  }
`

const ActStepEnum = {
  product: 'product',
  address: 'address',
  payType: 'payType',
}

export const PcOrderPageModel = modelFactory('PcOrderPageModel', {
  actStep: ActStepEnum.product,
}, {
  updateActStep: async (value, option) => {
    option.setData(fpMergePre({actStep: value}))
  },

})

export const OrderPage = () => {
  const router = useRouter()
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
  const {actions: actionsPcOrderPageModel, state: statePcOrderPageModel} = useStoreModel(PcOrderPageModel)

  console.log(stateShopCartModel.form)
  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Space h={mpStyle.space.s}/>
      <OrderContentBox>
        <ModifyBox>
          <ExpansionPanel
              elevation={0}
              expanded={statePcOrderPageModel.actStep === ActStepEnum.product}
          >
            <ExpansionPanelSummary
            >
              <TabHeader
                  isAct={statePcOrderPageModel.actStep === ActStepEnum.product}
              >
                <aside>1</aside>
                我的购物车
              </TabHeader>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ProductBox>
                <ProductBoxHeader>
                  <Space w={mpStyle.space.xs}/>
                  {ls('已选购的商品')}
                </ProductBoxHeader>
                {stateShopCartModel.shopCartList.map(shopCart => {
                  const product = shopCart.product
                  return <ProductRow
                      key={`stateShopCartModel.shopCartList${shopCart.id}`}
                  >
                    <img
                        alt={''}
                        src={dealImgUrl(shopCart.product?.img?.[0]?.url)}
                    />
                    <section>{product?.name}</section>
                    <div>
                      <aside>{ls('数量')}</aside>
                      <section>{shopCart.number}</section>
                    </div>
                    <div>
                      <aside>{ls('重量')}</aside>
                      <RedBox>{product?.weight}{product?.unit}</RedBox>
                    </div>
                    <aside>
                      <header>{ls('小计')}</header>
                      <RedBox>{dealMoney(dealMaybeNumber(product?.priceOut) * dealMaybeNumber(shopCart?.number))}</RedBox>
                    </aside>
                  </ProductRow>
                })}
              </ProductBox>
              <Space h={mpStyle.space.xs}/>
              <ProductFooter>
                <Button
                    color={'secondary'}
                    variant={'outlined'}
                    onClick={() => {
                      router.back()
                    }}
                >{ls('返回')}</Button>
                <Button
                    color={'secondary'}
                    variant={'contained'}
                    onClick={() => {
                      actionsPcOrderPageModel.updateActStep(ActStepEnum.address)
                    }}
                >{ls('下一步')}</Button>
              </ProductFooter>
              <Space h={mpStyle.space.xs}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
              elevation={0}
              expanded={statePcOrderPageModel.actStep === ActStepEnum.address}
          >
            <ExpansionPanelSummary
            >
              <TabHeader
                  isAct={statePcOrderPageModel.actStep === ActStepEnum.address}
              >
                <aside>2</aside>
                {ls('选择地址')}
              </TabHeader>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              123
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