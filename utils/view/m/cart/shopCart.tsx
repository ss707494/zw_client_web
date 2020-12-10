import React, {useEffect} from 'react'
import {doc} from '../../../graphqlTypes/doc'
import {dealMaybeNumber, dealMoney, fpMerge} from '../../../tools/utils'
import {useStoreModel} from '../../../ModelAction/useStore'
import {ls} from '../../../tools/dealKey'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {Box, Button, LinearProgress, MenuItem, TextField} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import styled from 'styled-components'
import {DiscountConditionEnum, DiscountTypeEnum, getPickUpTypeName, PickUpTypeEnum} from '../../../ss_common/enum'
import {CartProduct} from './CartProduct'
import {BScroller} from '../../../components/BScroll/BScroller'
import {pageTypeEnum, shopCartModel} from './index'
import {DealNoAuth} from '../../../components/NoAuth/NoAuth'
import {Space} from '../../../components/Box/Box'
import {InputPromoCodeDialog, inputPromoCodeModel} from './components/InputPromoCode'
import CloseIcon from '@material-ui/icons/Close'
import {UpdateShopCart} from '../../../components/ProductItem/UpdateShopCart'

const BoxContain = styled.section`
  padding: 0 20px;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0 12px;
`
const PromoCode = styled.div`
  display: flex;
  > aside {
    // background: ${grey[100]};
    margin-left: 8px;
  }
`
const Money = styled.div`
  display: flex;
  justify-content: space-between;
`
const FixFooter = styled(Box)`
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
`

export const ShopCartPage = () => {
  const {state: stateShopCartModel, actions: actionsShopCartModel, getLoad} = useStoreModel(shopCartModel)
  const {actions: actionsInputPromoCodeModel} = useStoreModel(inputPromoCodeModel)

  useEffect(() => {
    if (stateShopCartModel.shopCartList.length === 0) {
      actionsShopCartModel.getList()
    }
  }, [actionsShopCartModel, stateShopCartModel.shopCartList.length])
  useEffect(() => {
    if (stateShopCartModel.user.id && localStorage.getItem(`promoCode_${stateShopCartModel.user.id}`)) {
      actionsShopCartModel.dealPromoCode(`${localStorage.getItem(`promoCode_${stateShopCartModel.user.id}`)}`)
    }
  }, [actionsShopCartModel, stateShopCartModel.user.id])
  const productNumber = stateShopCartModel.dealProductNumber(stateShopCartModel)
  const productSubtotal = dealMoney(stateShopCartModel.dealProductTotal(stateShopCartModel))

  const promoCode = stateShopCartModel.promoCode
  const discountProduct = stateShopCartModel.shopCartList.filter(v => [v.product?.category?.id, v.product?.category?.parentCategory?.id, v.product?.category?.parentCategory?.parentCategory?.id].includes(promoCode.productCategory))
  const discountProductAmount = discountProduct.reduce((previousValue, currentValue) => {
    return previousValue + dealMaybeNumber(currentValue.number) * dealMaybeNumber(currentValue.product?.priceOut)
  }, 0)
  // 计算折扣
  let discountAmountForPromoCode = 0
  if (discountProduct.length) {
    // 折扣条件
    if (promoCode.discountCondition === DiscountConditionEnum.No
        || (promoCode.discountCondition === DiscountConditionEnum.Amount && discountProductAmount > dealMaybeNumber(promoCode.discountConditionAmount))) {
      discountAmountForPromoCode = promoCode.discountType === DiscountTypeEnum.Amount ? dealMaybeNumber(promoCode.discountAmount) : (dealMaybeNumber(promoCode.discountAmount) * discountProductAmount / 100)
    }
  }
  useEffect(() => {
    if (discountAmountForPromoCode) {
      actionsShopCartModel.setForm(['couponDiscount', discountAmountForPromoCode])
    }
  }, [actionsShopCartModel, discountAmountForPromoCode])
  const allTotal = stateShopCartModel.dealProductTotal(stateShopCartModel) - dealMaybeNumber(stateShopCartModel.form.couponDiscount)

  return <div>
    <HeaderTitle
        title={'购物车'}
        LeftIcon={CloseIcon}
    />
    {DealNoAuth(<>
      {(!!getLoad(doc.userShopCartList) && <LinearProgress/>) || <div style={{height: '4px'}}/>}
      <BScroller boxHeight={'calc(100vh - 65px)'}>
        <BoxContain>
          <div
              style={{paddingTop: '16px', fontSize: '18px', textAlign: 'center'}}
          >
            {productNumber}{ls('件商品')}
          </div>
          <div
              style={{
                fontSize: '14px',
                textAlign: 'center',
                color: grey[600],
                marginTop: '8px',
                marginBottom: '10px',
              }}
          >
            {ls('小计')}:{productSubtotal}
          </div>
          {stateShopCartModel.shopCartList.map(value => <CartProduct
              key={`CartProduct_${value.id}`}
              shopCart={value}/>)
          }
          <TextField
              style={{marginTop: '10px'}}
              fullWidth={true}
              label={ls('运送方式')}
              select={true}
              value={stateShopCartModel.form.pickUpType}
              onChange={event => {
                actionsShopCartModel.setForm(['pickUpType', event.target.value])
                actionsShopCartModel.setForm(['addressId', stateShopCartModel.initAddressId(fpMerge(stateShopCartModel, {
                  form: {
                    pickUpType: event.target.value,
                  },
                }))])
              }}
          >
            <MenuItem
                value={PickUpTypeEnum.Self}
            >{ls(getPickUpTypeName(PickUpTypeEnum.Self))}</MenuItem>
            <MenuItem
                value={PickUpTypeEnum.Delivery}
            >{ls(getPickUpTypeName(PickUpTypeEnum.Delivery))}</MenuItem>
          </TextField>
          <Title>{ls('达人卡和优惠券')}</Title>
          <PromoCode>
            <main>{stateShopCartModel.promoCode.title}</main>
            <aside>{ls('code')}: {stateShopCartModel.promoCode.code}</aside>
          </PromoCode>
          <Space h={8}/>
          <Button
              variant={'outlined'}
              onClick={async () => {
                await actionsInputPromoCodeModel.openClick((promoCode: string) => {
                  return actionsShopCartModel.dealPromoCode(promoCode)
                })
              }}
          >{ls(stateShopCartModel.promoCode.code ? '重新输入' : '输入验证码')}</Button>
          <InputPromoCodeDialog/>
          <Title>{ls('预估价格')}</Title>
          <Money>
            <aside>{ls('小计')}</aside>
            <main>{productSubtotal}</main>
          </Money>
          <Space h={10}/>
          <Money>
            <aside>{ls('折扣')}</aside>
            <main>{dealMoney(stateShopCartModel.form.couponDiscount)}</main>
          </Money>
          <div style={{width: '100%', height: '10px'}}/>
          <Money>
            <aside>{ls('总计')}</aside>
            <main>{dealMoney(allTotal)}</main>
          </Money>
          <Title>{ls('下次购买的商品')}</Title>
          {stateShopCartModel.shopCartListNext.map(value => <CartProduct
              key={`CartProduct_${value.id}`}
              shopCart={value}/>)}
          <div style={{width: '100%', height: '100px'}}/>
        </BoxContain>
      </BScroller>
      <FixFooter boxShadow={1}>
        <Button
            variant={'contained'}
            color={'secondary'}
            fullWidth={true}
            disabled={productNumber === 0}
            onClick={() => actionsShopCartModel.updatePageType(pageTypeEnum.order)}
        >{ls('去结算')}</Button>
      </FixFooter>
      <UpdateShopCart/>
    </>)}
  </div>
}
