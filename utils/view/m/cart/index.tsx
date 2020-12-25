import {modelFactory} from '../../../ModelAction/modelUtil'
import {
  Dict,
  OrderInfoItemInput,
  PromoCode,
  PromoCodeItemInput,
  ShopCart,
  User,
  UserAddress,
  UserPayCard,
} from '../../../graphqlTypes/types'
import {PickUpTypeEnum} from '../../../ss_common/enum'
import {dealMaybeNumber, fpMergePre, fpSetPre} from '../../../tools/utils'
import {setForm} from '../../../tools/commonAction'
import {doc} from '../../../graphqlTypes/doc'
import {ShopCartPage} from './shopCart'
import React from 'react'
import {useStoreModel} from '../../../ModelAction/useStore'
import {OrderPage} from './orderPage'
import {ll} from '../../../tools/dealKey'

export const pageTypeEnum = {
  shopCart: 'shopCart',
  order: 'order',
}

const initForm: OrderInfoItemInput = {
  pickUpType: PickUpTypeEnum.Self,
  addressId: '',
  paymentMethodCardId: '',
  deductCoin: 0,
  saleTax: 0,
  transportationCosts: 0,
  couponDiscount: 0,
}
export const shopCartModel = modelFactory('shopCartModel', {
  user: {} as User,
  promoCode: {} as PromoCode,
  promoCodeError: '',
  payCardList: [] as UserPayCard[],
  userAddressList: [] as UserAddress[],
  selfAddress: [] as any[],
  freightConfig: [] as any[],
  userLevelList: [] as Dict[],
  pageType: pageTypeEnum.shopCart,
  shopCartList: [] as ShopCart[],
  shopCartListNext: [] as ShopCart[],
  form: {
    ...initForm,
  } as OrderInfoItemInput,
  dealProductNumber: (state: any) => (state.shopCartList as any[]).reduce((pre, cur) => pre + (cur?.number ?? 0), 0),
  dealAddressList: ((state: any) => (state.form.pickUpType === PickUpTypeEnum.Delivery && state.userAddressList) || state.selfAddress.map((v: any) => ({
    ...v,
    combineAddress: `${v.province} ${v.city} ${v.streetAddress}`,
    name: v.fullName,
    address: v.streetAddress,
    contactInformation: v.phone,
  }))) as (state: any) => UserAddress[],
  dealAddressData: (state: any) => state.dealAddressList(state).find((v: UserAddress) => v.id === state.form.addressId) || {},
  initAddressId: (state: any) => (state.form.pickUpType === PickUpTypeEnum.Delivery && state.userAddressList?.find((v: UserAddress) => v.isDefault)?.id) || state.selfAddress?.[0]?.id,
  dealProductTotal: (state: any) => state.shopCartList.reduce((pre: any, cur: any) => pre + (dealMaybeNumber(cur?.number) * dealMaybeNumber(cur?.product?.priceOut)), 0),
  dealTransportationCosts: (state: any, productTotal: any) => {
    return (state.form.pickUpType === PickUpTypeEnum.Delivery && (state.freightConfig.reduce((pre: any, cur: any) => {
      if (pre > parseFloat(cur?.freightPay) && productTotal < parseFloat(cur?.orderMax)) {
        return parseFloat(cur?.freightPay)
      } else {
        return pre
      }
    }, parseFloat(state.freightConfig[state.freightConfig.length - 1]?.freightPay)))) || 0
  },
}, {
  clearData: (value, option) => {
    option.setData(fpMergePre({
      form: initForm,
      pageType: pageTypeEnum.shopCart,
    }))
  },
  clearForm: (value, option) => option.setData(fpMergePre({
    form: {
      ...initForm,
    },
  })),
  setForm: setForm,
  getList: async (value, option) => {
    const userRes = await option.query(doc.oneUser)
    const res = await option.query(doc.userShopCartList)
    option.setData(fpMergePre({
      user: userRes?.oneUser ?? {},
      shopCartList: res?.shopCartList.filter((v: ShopCart) => !v.isNext) ?? [],
      shopCartListNext: res?.shopCartList.filter((v: ShopCart) => !!v.isNext) ?? [],
    }))
  },
  dealPromoCode: async (value: string, option) => {
    const res = await option.query(doc.promoCodeList, {
      promoCodeItemInput: {
        code: value,
      } as PromoCodeItemInput,
    })
    if (res?.promoCodeList?.length === 1) {
      const promoCode: PromoCode = res.promoCodeList[0]
      option.setData(fpMergePre({
        promoCode,
      }))
      return ''
    } else {
      return ll('未匹配到优惠码')
    }
  },
  updatePageType: (value: string, option) => option.setData(fpMergePre({
    pageType: value,
  })),
  updatePayCardList: async (value, option) => {
    const res = await option.query(doc.orderConfirmInfo)
    option.setData(fpMergePre({
      payCardList: res?.payCardListOneUser,
    }))
  },
  getOrderInfo: async (value, option) => {
    const res = await option.query(doc.orderConfirmInfo)
    option.setData(fpSetPre('user', res?.oneUser))
    option.setData(fpMergePre({
      payCardList: res?.payCardListOneUser,
      userAddressList: res?.userAddressListOneUser,
      selfAddress: res?.getDataConfig?.value?.list ?? [],
      freightConfig: res?.freightConfig?.value?.freightList ?? [],
      userLevelList: res?.userLevelList ?? [],
    }))
    option.setData(fpMergePre({
      form: {
        addressId: (option.data.form.pickUpType === PickUpTypeEnum.Delivery && res?.userAddressListOneUser?.find((v: UserAddress) => v.isDefault)?.id) || res?.getDataConfig?.value?.list?.[0]?.id,
        paymentMethodCardId: (res?.payCardListOneUser as UserPayCard[])?.find(v => v.isDefault)?.id || '',
      },
    }))
  },
  submit: async (value: OrderInfoItemInput, option) => {
    return await option.mutate(doc.saveOrder, {
      orderInfoItemInput: {
        ...value,
      } as OrderInfoItemInput,
    })
  },
  moveToNext: async ({shopCart}: { shopCart: ShopCart }, option) => {
    const oldNext = option.data.shopCartListNext.find(value => value.product?.id === shopCart.product?.id)
    if (oldNext?.id) {
      await option.mutate(doc.updateShopCart, {
        shopCart: {
          isDelete: 1,
          id: oldNext.id,
        },
      })
      await option.mutate(doc.updateShopCart, {
        shopCart: {
          isNext: 1,
          id: shopCart.id,
        },
      })
    } else {
      await option.mutate(doc.updateShopCart, {
        shopCart: {
          isNext: 1,
          id: shopCart.id,
        },
      })
    }
  },
  testPromoCode: async (value: string, option) => {
    return '123'
  },
})

export const CartPage = () => {
  const {state: stateSCM} = useStoreModel(shopCartModel)
  return (stateSCM.pageType === pageTypeEnum.order && <OrderPage/>) || <ShopCartPage/>
}
