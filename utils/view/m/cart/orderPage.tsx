import React, {useEffect} from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {useStoreModel} from '../../../ModelAction/useStore'
import {pageTypeEnum, shopCartModel} from './index'
import styled from 'styled-components'
import {ls} from '../../../tools/dealKey'
import {PickUpTypeEnum} from '../../../ss_common/enum'
import {doc} from '../../../graphqlTypes/doc'
import {IconButton, LinearProgress, TextField} from '@material-ui/core'
import {BScroller} from '../../../components/BScroll/BScroller'
import {Space} from '../../../components/Box/Box'
import {SelectAddress, selectAddressModel} from './components/SelectAddress'
import {grey} from '@material-ui/core/colors'
import {SelectCard, selectCardModel} from './components/SelectCard'
import {dealLastNumber, dealMaybeNumber, dealMoney, dealUrlQuery} from '../../../tools/utils'
import {mpStyle} from '../../../style/common'
import {ButtonLoad} from '../../../components/ButtonLoad/ButtonLoad'
import {showMessage} from '../../../components/Message/Message'
import {useRouter} from 'next/router'

export const ShopTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  > footer {
    font-size: 14px;
    color: ${mpStyle.red};
  }
`
export const AddressBox = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  > main {
    flex-grow: 1;
    > header {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
    }
  }
`
export const CardBox = styled.div`
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: repeat(2, 1fr);
  > header {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  > aside {
    grid-area: 1/2/3/3;
  }
`
export const ShopTotal = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`
export const FooterFit = styled.div`
  position: fixed;
  box-sizing: border-box;
  background: white;
  bottom: 0;
  width: 100vw;
  padding: 16px 24px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr max-content;
  grid-row-gap: 8px;
  box-shadow: ${mpStyle.shadow['1']};
  > header {
    > span {
      font-size: 12px;
      margin-left: 8px;
    }
  }
  > aside {
    grid-area: 1/2/3/3;
  }
`

export const useOrderPageHooks = () => {
  const {state: stateShopCartModel, actions: actionsShopCartModel, getLoad} = useStoreModel(shopCartModel)

  useEffect(() => {
    actionsShopCartModel.getOrderInfo()
  }, [])

  const addressData = stateShopCartModel.dealAddressData(stateShopCartModel)
  const cardData = stateShopCartModel.payCardList?.find(v => v.id === stateShopCartModel.form.paymentMethodCardId) || {}
  const productTotal = stateShopCartModel.dealProductTotal(stateShopCartModel)
  const transportationCosts = stateShopCartModel.dealTransportationCosts(stateShopCartModel, productTotal)
  const actuallyPaid = productTotal + transportationCosts - dealMaybeNumber(stateShopCartModel.form.deductCoin) + dealMaybeNumber(stateShopCartModel.form.saleTax) - dealMaybeNumber(stateShopCartModel.form?.couponDiscount)
  const generateCoin = actuallyPaid * 0.01

  return {
    stateShopCartModel,
    actionsShopCartModel,
    getLoad,
    addressData,
    cardData,
    productTotal,
    transportationCosts,
    actuallyPaid,
    generateCoin,
  }
}

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
  const {actions: actionsSelectAddressModel} = useStoreModel(selectAddressModel)
  const {actions: actionsSelectCardModel} = useStoreModel(selectCardModel)

  useEffect(() => {
    if (stateShopCartModel.pageType === pageTypeEnum.order) {
      window.history.pushState(null, '', document.URL)
      window.addEventListener('popstate', (state) => {
        // 监听到返回事件，注意，只有触发了返回才会执行这个方法
        actionsShopCartModel.updatePageType(pageTypeEnum.shopCart)
      }, false)
    }
    return () => {
      window.removeEventListener('popstate', (state) => {
        actionsShopCartModel.updatePageType(pageTypeEnum.shopCart)
      })
    }
  }, [stateShopCartModel.pageType])

  return <div>
    <HeaderTitle
        title={'订单支付'}
        backCall={() => {
          actionsShopCartModel.updatePageType(pageTypeEnum.shopCart)
          return true
        }}
    />
    {(!!getLoad(doc.orderConfirmInfo) && <LinearProgress/>) || <div style={{height: '4px'}}/>}
    <BScroller
        boxHeight={'calc(100vh - 135px)'}
    >
      <Space h={10}/>
      <ShopTitle>
        <Space w={20}/>
        {ls((stateShopCartModel.form.pickUpType === PickUpTypeEnum.Self && '自取地址') || '送货地址')}
      </ShopTitle>
      <AddressBox>
        {stateShopCartModel.form.pickUpType === PickUpTypeEnum.Self && <main>
          <header>
            {`${addressData.fullName}`}
          </header>
          <section>{addressData.streetAddress}</section>
          <footer>
            {`${addressData.city} ${addressData.province} ${addressData.zip}`}
          </footer>
        </main> || <main>
          <header>
            {`${addressData.name}`}
          </header>
          <section>{addressData.address}</section>
          <footer>
            {`${addressData.city} ${addressData.province} ${addressData.zip}`}
          </footer>
        </main>}
        <aside>
          <IconButton
              onClick={async () => {
                const res = await actionsSelectAddressModel.openClick()
                if (res) {
                  actionsShopCartModel.setForm(['addressId', res])
                }
              }}
          >
            <ChevronRightIcon/>
          </IconButton>
        </aside>
      </AddressBox>
      <Space c={grey[200]}
             h={16}/>
      <Space h={16}/>
      <ShopTitle>
        <Space w={20}/>
        {ls('付款方式')}
      </ShopTitle>
      <CardBox>
        <header>{cardData.name}</header>
        <footer>{dealLastNumber(cardData.number)}</footer>
        <aside>
          <IconButton
              onClick={async () => {
                const res = await actionsSelectCardModel.openClick()
                if (res) {
                  actionsShopCartModel.setForm(['paymentMethodCardId', res])
                }
              }}
          >
            <ChevronRightIcon/>
          </IconButton>
        </aside>
      </CardBox>
      <Space c={grey[200]}
             h={16}/>
      <Space h={16}/>
      <ShopTitle>
        <Space w={20}/>
        {ls('使用达人币')}
        <Space w={16}/>
        <footer>{ls('当月可用余额')}{dealMoney(stateShopCartModel.user.orderCoinCurrentMonth)}</footer>
      </ShopTitle>
      <div>
        <Space w={20}/>
        <TextField
            style={{marginTop: '8px', marginBottom: '24px'}}
            label={ls('')}
            value={stateShopCartModel.form.deductCoin}
            onChange={e => {
              actionsShopCartModel.setForm(['deductCoin', e.target.value])
            }}
        />
      </div>
      <Space
          c={grey[200]}
          h={16}/>
      <Space h={16}/>
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
      <ShopTotal
          style={{fontSize: '18px'}}
      >
        <header>{ls('订单总额')}</header>
        <footer>{dealMoney(actuallyPaid)}</footer>
      </ShopTotal>
      <Space h={30}/>
    </BScroller>
    <FooterFit>
      <header>{ls('本次订单')}
        <span>{ls(stateShopCartModel.userLevelList.find(v => v.code === stateShopCartModel.user.userInfo?.userLevel)?.name)}</span>
      </header>
      <footer>{ls('将获得下月使用达人币 ')}
        <span>{dealMoney(generateCoin)}</span>
      </footer>
      <aside>
        <ButtonLoad
            loading={getLoad(doc.saveOrder)}
            onClick={async () => {
              if (dealMaybeNumber(stateShopCartModel.user?.orderCoinCurrentMonth) < dealMaybeNumber(stateShopCartModel.form.deductCoin)) {
                showMessage(ls('达人币余额不足'))
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
                await router.replace(`/m/pay${_query}`, `/m/pay${_query}`)
                actionsShopCartModel.clearData()
                actionsShopCartModel.getList()
              }
            }}
            variant={'contained'}
            color={'secondary'}
        >{ls('提交订单')}</ButtonLoad>
      </aside>
    </FooterFit>
    <SelectAddress/>
    <SelectCard/>
  </div>
}
