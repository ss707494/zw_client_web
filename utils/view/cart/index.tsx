import {modelFactory} from '../../ModelAction/modelUtil'
import {Dict, OrderInfoItemInput, ShopCart, User, UserAddress, UserPayCard} from '../../graphqlTypes/types'
import {PickUpTypeEnum} from '../../ss_common/enum'
import {dealMaybeNumber, fpMergePre} from '../../tools/utils'
import {setForm} from '../../tools/commonAction'
import {doc} from '../../graphqlTypes/doc'
import {ShopCartPage} from './shopCart'
import React from 'react'
import {useStoreModel} from '../../ModelAction/useStore'
import {OrderPage} from './orderPage'

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
}
export const shopCartModel = modelFactory('shopCartModel', {
  user: {} as User,
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
    contactInformation: v.phone,
  }))) as (state: any) => UserAddress[],
  dealAddressData: (state: any) => state.dealAddressList(state).find((v: UserAddress) => v.id === state.form.addressId) || {},
  initAddressId: (state: any) => (state.form.pickUpType === PickUpTypeEnum.Delivery && state.userAddressList?.find((v: UserAddress) => v.isDefault)?.id) || state.selfAddress?.[0]?.id,
  dealProductTotal: (state: any) => state.shopCartList.reduce((pre: any, cur: any) => pre + (dealMaybeNumber(cur?.number) * dealMaybeNumber(cur?.product?.priceOut)), 0),
}, {
  clearForm: (value, option) => option.setData(fpMergePre({
    form: {
      ...initForm,
    },
  })),
  setForm: setForm,
  getList: async (value, option) => {
    const res = await option.query(doc.userShopCartList)
    option.setData(fpMergePre({
      shopCartList: res?.shopCartList.filter((v: ShopCart) => !v.isNext) ?? [],
      shopCartListNext: res?.shopCartList.filter((v: ShopCart) => !!v.isNext) ?? [],
    }))
  },
  updatePageType: (value: string, option) => option.setData(fpMergePre({
    pageType: value,
  })),
  getOrderInfo: async (value, option) => {
    const res = await option.query(doc.orderConfirmInfo)
    option.setData(fpMergePre({
      user: res?.oneUser,
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
})

export const CartPage = () => {
  const {state: stateSCM} = useStoreModel(shopCartModel)
  return (stateSCM.pageType === pageTypeEnum.order && <OrderPage/>) || <ShopCartPage/>
}
