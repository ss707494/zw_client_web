import React from 'react'
import {MainBox} from '../pcComponents/mainBox/mainBox'
import {PcHeader} from '../pcComponents/header/header'
import {PcContentBox} from '../home/pcHome'
import styled from 'styled-components'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from '../home/components/headerTab'
import {Space} from '../../../components/Box/Box'
import {mpStyle} from '../../../style/common'
import {ll} from '../../../tools/dealKey'
import {dealMaybeNumber, dealMoney, dealUrlQuery, fpMergePre} from '../../../tools/utils'
import {useOrderPageHooks} from '../../m/cart/orderPage'
import {
  Button,
  ButtonBase,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
} from '@material-ui/core'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../ModelAction/useStore'
import {useRouter} from 'next/router'
import {grey} from '@material-ui/core/colors'
import {showMessage} from '../../../components/Message/Message'
import {jssStyled} from '../../../tools/jssStyled'

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
const TabHeader = styled.div<{ isAct?: boolean }>`
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
    margin-right: ${mpStyle.spacePx.xxs};
    ${props => props.isAct && `
      background: ${mpStyle.red};
      border-color: ${mpStyle.red};
      color: #fff;
    `};
  }
`
const AddressBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${mpStyle.spacePx.xs};
`
const AddressBoxItem = jssStyled(ButtonBase, ['isAct'])<{
  isAct?: boolean,
}>(props => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: `1px solid ${grey[800]}`,
  borderRadius: 4,
  padding: mpStyle.spacePx.xxs,
  cursor: 'pointer',
  ...(props.isAct ? {
    background: mpStyle.red,
    color: '#fff',
    border: 'none',
  } : {}),
}))

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
    productTotal,
    transportationCosts,
    actuallyPaid,
    generateCoin,
  } = useOrderPageHooks()
  const {state: statePcOrderPageModel} = useStoreModel(PcOrderPageModel)
  const addressList = stateShopCartModel.dealAddressList(stateShopCartModel)

  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Space h={mpStyle.space.s}/>
      <OrderContentBox>
        <ModifyBox>
          {/*<ExpansionPanel*/}
          {/*    elevation={0}*/}
          {/*    expanded={statePcOrderPageModel.actStep === ActStepEnum.product}*/}
          {/*>*/}
          {/*  <ExpansionPanelSummary*/}
          {/*  >*/}
          {/*    <TabHeader*/}
          {/*        isAct={statePcOrderPageModel.actStep === ActStepEnum.product}*/}
          {/*    >*/}
          {/*      <aside>1</aside>*/}
          {/*      我的购物车*/}
          {/*    </TabHeader>*/}
          {/*  </ExpansionPanelSummary>*/}
          {/*  <ExpansionPanelDetails>*/}
          {/*    <ProductBox>*/}
          {/*      <ProductBoxHeader>*/}
          {/*        <Space w={mpStyle.space.xs}/>*/}
          {/*        {ls('已选购的商品')}*/}
          {/*      </ProductBoxHeader>*/}
          {/*      {stateShopCartModel.shopCartList.map(shopCart => {*/}
          {/*        const product = shopCart.product*/}
          {/*        return <ProductRow*/}
          {/*            key={`stateShopCartModel.shopCartList${shopCart.id}`}*/}
          {/*        >*/}
          {/*          <img*/}
          {/*              alt={''}*/}
          {/*              src={dealImgUrl(shopCart.product?.img?.[0]?.url)}*/}
          {/*          />*/}
          {/*          <section>{product?.name}</section>*/}
          {/*          <div>*/}
          {/*            <aside>{ls('数量')}</aside>*/}
          {/*            <section>{shopCart.number}</section>*/}
          {/*          </div>*/}
          {/*          <div>*/}
          {/*            <aside>{ls('重量')}</aside>*/}
          {/*            <RedBox>{product?.weight}{product?.unit}</RedBox>*/}
          {/*          </div>*/}
          {/*          <aside>*/}
          {/*            <header>{ls('小计')}</header>*/}
          {/*            <RedBox>{dealMoney(dealMaybeNumber(product?.priceOut) * dealMaybeNumber(shopCart?.number))}</RedBox>*/}
          {/*          </aside>*/}
          {/*        </ProductRow>*/}
          {/*      })}*/}
          {/*    </ProductBox>*/}
          {/*    <Space h={mpStyle.space.xs}/>*/}
          {/*    <ProductFooter>*/}
          {/*      <Button*/}
          {/*          color={'secondary'}*/}
          {/*          variant={'outlined'}*/}
          {/*          onClick={() => {*/}
          {/*            router.back()*/}
          {/*          }}*/}
          {/*      >{ls('返回')}</Button>*/}
          {/*      <Button*/}
          {/*          color={'secondary'}*/}
          {/*          variant={'contained'}*/}
          {/*          onClick={() => {*/}
          {/*            actionsPcOrderPageModel.updateActStep(ActStepEnum.address)*/}
          {/*          }}*/}
          {/*      >{ls('下一步')}</Button>*/}
          {/*    </ProductFooter>*/}
          {/*    <Space h={mpStyle.space.xs}/>*/}
          {/*  </ExpansionPanelDetails>*/}
          {/*</ExpansionPanel>*/}
          <ExpansionPanel
              elevation={0}
              expanded={true}
          >
            <ExpansionPanelSummary
            >
              <TabHeader
                  isAct={statePcOrderPageModel.actStep === ActStepEnum.address}
              >
                <aside>1</aside>
                {ll('选择地址')}
              </TabHeader>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AddressBox>
                {addressList.map(v => <AddressBoxItem
                    key={`addressList.map${v.id}`}
                    isAct={stateShopCartModel.form.addressId === v.id}
                    onClick={() => {
                      actionsShopCartModel.setForm(['addressId', v.id])
                    }}
                >
                  <header>{v.name}</header>
                  <main>{v.address}</main>
                  <footer>{`${v.city} ${v.province} ${v.zip}`}</footer>
                </AddressBoxItem>)}
              </AddressBox>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
              elevation={0}
              expanded={true}
          >
            <ExpansionPanelSummary>
              <TabHeader>
                <aside>2</aside>
                {ll('选择付款方式')}
              </TabHeader>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AddressBox>
                {stateShopCartModel.payCardList.map(v => <AddressBoxItem
                    key={`addressList.map${v.id}`}
                    isAct={stateShopCartModel.form.paymentMethodCardId === v.id}
                    onClick={() => {
                      actionsShopCartModel.setForm(['paymentMethodCardId', v.id])
                    }}
                >
                  <header>{v.name}</header>
                  <footer>{`${v.number}`}</footer>
                </AddressBoxItem>)}
              </AddressBox>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ModifyBox>
        <OrderDetailBox>
          <header>{ll('订单详情')}</header>
          <ShopTotal>
            <header>{ll('购物车总计')}</header>
            <footer>{dealMoney(productTotal - (stateShopCartModel.form?.couponDiscount ?? 0))}</footer>
          </ShopTotal>
          {/*{dealMaybeNumber(stateShopCartModel.form?.couponDiscount) > 0 && <ShopTotal>*/}
          {/*  <header>{ls('优惠折扣')}</header>*/}
          {/*  <footer>{dealMoney(stateShopCartModel.form?.couponDiscount)}</footer>*/}
          {/*</ShopTotal>}*/}
          {transportationCosts > 0 && <ShopTotal>
            <header>{ll('运费')}</header>
            <footer>{dealMoney(transportationCosts)}</footer>
          </ShopTotal>}
          <ShopTotal>
            <header>{ll('达人币抵扣')}</header>
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
            <header>{ll('订单总额')}</header>
            <footer>{dealMoney(actuallyPaid)}</footer>
          </ShopTotal>
          <Space h={mpStyle.space.s}/>
          <div>
            {ll('使用达人币')}
            <RedSpan>
              {ll('当月可用余额')} {dealMoney(stateShopCartModel.user?.orderCoinCurrentMonth)}
            </RedSpan>
          </div>
          <Space h={mpStyle.space.xxs}/>
          <FillInputBox>
            <TextField
                type={'number'}
                variant={'filled'}
                label={ll('')}
                value={stateShopCartModel.form.deductCoin}
                onChange={e => {
                  actionsShopCartModel.setForm(['deductCoin', e.target.value])
                }}
            />
          </FillInputBox>
          <Space h={mpStyle.space.s}/>
          <ShopTotal>
            <header>{ll('购物车总计')}</header>
            <footer>{dealMoney(productTotal - (stateShopCartModel.form?.couponDiscount ?? 0))}</footer>
          </ShopTotal>
          <Space h={mpStyle.space.s}/>
          <Button
              fullWidth={true}
              variant={'contained'}
              color={'secondary'}
              onClick={async () => {
                if (dealMaybeNumber(stateShopCartModel.user?.orderCoinCurrentMonth) < dealMaybeNumber(stateShopCartModel.form.deductCoin)) {
                  showMessage(ll('达人币余额不足'))
                  return
                }
                const submitData = {
                  ...stateShopCartModel.form,
                  generateCoin,
                  actuallyPaid,
                  transportationCosts,
                  subtotal: productTotal,
                  currentUserLevel: stateShopCartModel.user.userInfo?.userLevel,
                  rOrderProduct: stateShopCartModel.shopCartList.map(v => ({
                    count: v.number,
                    productId: v.product?.id,
                    product: v.product,
                  })),
                }

                const res = await actionsShopCartModel.submit({
                  ...submitData,
                })
                if (res?.saveOrder?.id) {
                  showMessage('操作成功 将前往付款')
                  const _query = dealUrlQuery({orderId: res?.saveOrder?.id})
                  await router.replace(`/pc/pay${_query}`, `/pc/pay${_query}`)
                  actionsShopCartModel.clearData()
                  actionsShopCartModel.getList()
                }
              }}
          >
            {ll('提交订单')}
          </Button>
        </OrderDetailBox>
      </OrderContentBox>
    </PcContentBox>
  </MainBox>
}
