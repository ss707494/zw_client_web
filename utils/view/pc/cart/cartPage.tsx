import React, {useEffect} from 'react'
import {PcHeader} from '../pcComponents/header/header'
import {PcContentBox} from '../home/pcHome'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from '../home/components/headerTab'
import {Space} from '../../../components/Box/Box'
import styled from 'styled-components'
import {mpStyle} from '../../../style/common'
import {ls} from '../../../tools/dealKey'
import {Button} from '@material-ui/core'
import {shopCartModel} from '../../m/cart'
import {useStoreModel} from '../../../ModelAction/useStore'
import {getPickUpTypeName, PickUpTypeEnum} from '../../../ss_common/enum'
import {dealMaybeNumber, dealMoney, fpMerge} from '../../../tools/utils'
import {InputPromoCodeDialog, inputPromoCodeModel} from '../../m/cart/components/InputPromoCode'
import {CartProduct} from '../../m/cart/CartProduct'

const Title = styled.div`
  ${mpStyle.fontType.l};
  color: ${mpStyle.red};
`
const PickUpType = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  > section {
    ${mpStyle.fontType.n}
  }
`
const PromoCode = styled.div`
  > main {
    display: flex;
    > aside {
      display: flex;
      align-items: center;
      background: ${mpStyle.greyLite};
      border-radius: ${mpStyle.spacePx.xxs};
      padding-left: ${mpStyle.spacePx.xxs};
      width: 200px;
    }
  }
`
const ProductBox = styled.div`
  border: 1px solid ${mpStyle.greyLite};
  border-radius: 4px;
`
const ProductHeader = styled.div`
  ${mpStyle.fontType.n};
  padding: ${mpStyle.spacePx.xs};
  background: ${mpStyle.greyLite};
`
const ProductFooter = styled.div`
  background: ${mpStyle.greyLite};
  display: flex;
  > section {
    flex-grow: 1;
  }
`

const PickUpButton = ({pickUpType}: { pickUpType: string }) => {
  const {actions: actionsShopCartModel, state: stateShopCartModel} = useStoreModel(shopCartModel)
  const isActPickUpType = (type: string) => pickUpType === stateShopCartModel.form.pickUpType

  return <Button
      variant={isActPickUpType(pickUpType) ? 'contained' : 'outlined'}
      color={isActPickUpType(pickUpType) ? 'secondary' : 'default'}
      onClick={() => {
        actionsShopCartModel.setForm(['pickUpType', pickUpType])
        actionsShopCartModel.setForm(['addressId', stateShopCartModel.initAddressId(fpMerge(stateShopCartModel, {
          form: {
            pickUpType: pickUpType,
          },
        }))])
      }}
  >{ls(getPickUpTypeName(pickUpType))}</Button>
}

export const CartPage = () => {
  const {actions: actionsShopCartModel, state: stateShopCartModel} = useStoreModel(shopCartModel)
  const {actions: actionsInputPromoCodeModel} = useStoreModel(inputPromoCodeModel)
  useEffect(() => {
    if (stateShopCartModel.shopCartList.length === 0) {
      actionsShopCartModel.getList()
    }
  }, [])
  useEffect(() => {
    if (stateShopCartModel.user.id && localStorage.getItem(`promoCode_${stateShopCartModel.user.id}`)) {
      actionsShopCartModel.dealPromoCode(`${localStorage.getItem(`promoCode_${stateShopCartModel.user.id}`)}`)
    }
  }, [stateShopCartModel.user.id])

  const productNumber = stateShopCartModel.dealProductNumber(stateShopCartModel)
  const allTotal = stateShopCartModel.dealProductTotal(stateShopCartModel) - dealMaybeNumber(stateShopCartModel.form.couponDiscount)

  return <div>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Space h={mpStyle.space.s}/>
      <Title>{ls('我的购物车')}</Title>
      <Space h={mpStyle.space.xs}/>
      <PickUpType>
        <section>{ls('送货方式')}</section>
        <Space w={mpStyle.space.s}/>
        <PickUpButton pickUpType={PickUpTypeEnum.Self}/>
        <Space w={mpStyle.space.xs}/>
        <PickUpButton pickUpType={PickUpTypeEnum.Delivery}/>
      </PickUpType>
      <Space h={mpStyle.space.xs}/>
      <PromoCode>
        <header>{ls('达人卡和优惠券')}</header>
        <Space h={mpStyle.space.xxs}/>
        <main>
          <aside>{stateShopCartModel.promoCode.code}</aside>
          <Space w={mpStyle.space.xxs}/>
          <Button
              variant={'outlined'}
              onClick={async () => {
                await actionsInputPromoCodeModel.openClick((promoCode: string) => {
                  return actionsShopCartModel.dealPromoCode(promoCode)
                })
              }}
          >{ls(stateShopCartModel.promoCode.code ? '重新输入' : '输入验证码')}</Button>
        </main>
        <InputPromoCodeDialog/>
      </PromoCode>
      <Space h={mpStyle.space.s}/>
      <ProductBox>
        <ProductHeader>
          {productNumber}{ls('件商品')}
        </ProductHeader>
        {stateShopCartModel.shopCartList.map(value => <CartProduct
            key={`CartProduct_${value.id}`}
            shopCart={value}/>)
        }
        <ProductFooter>
          <section>
            {ls('总计')}
            {dealMoney(allTotal)}
          </section>
          <Button
              variant={'contained'}
              color={'secondary'}
          >{ls('去结算')}</Button>
        </ProductFooter>
      </ProductBox>
    </PcContentBox>
  </div>
}
