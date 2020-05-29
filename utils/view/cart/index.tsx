import {modelFactory} from '../../ModelAction/modelUtil'
import {ShopCart, User, UserAddress, UserPayCard} from '../../graphqlTypes/types'
import {PickUpTypeEnum} from '../../ss_common/enum'
import {fpMergePre} from '../../tools/utils'
import {setForm} from '../../tools/commonAction'
import {doc} from '../../graphqlTypes/doc'
import { ShopCartPage } from './shopCart'
import React from 'react'
import {useStoreModel} from '../../ModelAction/useStore'
import {OrderPage} from './orderPage'

export const pageTypeEnum = {
  shopCart: 'shopCart',
  order: 'order',
}

export const shopCartModel = modelFactory('shopCartModel', {
  user: {} as User,
  payCardList: [] as UserPayCard[],
  userAddressList: [] as UserAddress[],
  selfAddress: [] as [],
  pageType: pageTypeEnum.shopCart,
  shopCartList: [] as ShopCart[],
  shopCartListNext: [] as ShopCart[],
  form: {
    pickUpType: PickUpTypeEnum.Self,
  },
}, {
  clearForm: (value, option) => option.setData(fpMergePre({
    form: {
      pickUpType: PickUpTypeEnum.Self,
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
    }))
  },
})

export const CartPage = () => {
  const {state: stateSCM} = useStoreModel(shopCartModel)
  return (stateSCM.pageType === pageTypeEnum.order && <OrderPage/>) || <ShopCartPage />
}
