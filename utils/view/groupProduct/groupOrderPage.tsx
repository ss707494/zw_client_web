import React, {useEffect} from 'react'
import {modelFactory} from '../../ModelAction/modelUtil'
import styled from 'styled-components'
import {useStoreModel} from '../../ModelAction/useStore'
import {dealMaybeNumber, dealMoney, dealUrlQuery, fpMerge, fpMergePre} from '../../tools/utils'
import {groupProductModel} from './[id]'
import {ShopCartProductBox} from "../cart/CartProduct"
import {dealImgUrl} from "../../tools/img"
import {ProductPrice} from "../../components/ProductItem/ProductItem"
import {Button, IconButton, MenuItem, TextField} from "@material-ui/core"
import {ls} from "../../tools/dealKey"
import {Space} from "../../components/Box/Box"
import {getPickUpTypeName, PickUpTypeEnum} from "../../ss_common/enum"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import {AddressBox, CardBox, ShopTitle, ShopTotal} from "../cart/orderPage"
import {shopCartModel} from "../cart"
import {SelectAddress, selectAddressModel} from "../cart/components/SelectAddress"
import {SelectCard, selectCardModel} from "../cart/components/SelectCard"
import {ButtonLoad} from "../../components/ButtonLoad/ButtonLoad"
import {mpStyle} from "../../style/common"
import {showMessage} from '../../components/Message/Message'
import {useRouter} from 'next/router'

export const groupOrderPageModel = modelFactory('orderPageModel', {
  show: false,
}, {
  open: (value, option) => {
    option.setData(fpMergePre({
      show: true,
    }))
  },
  close: (value, option) => {
    option.setData(fpMergePre({
      show: false,
    }))
  },
})

const OrderPageBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  > footer {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    box-shadow: ${mpStyle.shadow["1"]};
    width: 100vw;
    text-align: right;
  }
`

export const GroupOrderPage = () => {
  const router = useRouter()
  const {state: stateOrderPageModel, actions: actionsOrderPageModel} = useStoreModel(groupOrderPageModel)
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  const product = stateGroupProduct.product
  const {state: stateSCM, actions: actionsSCM} = useStoreModel(shopCartModel)
  useEffect(() => {
    if (!stateSCM.user.id) {
      actionsSCM.getOrderInfo()
    }
  }, [])
  const {actions: actionsSAM} = useStoreModel(selectAddressModel)
  const {actions: actionsSelectCard} = useStoreModel(selectCardModel)

  const addressData = stateSCM.dealAddressData(stateSCM)
  const cardData = stateSCM.payCardList?.find(v => v.id === stateSCM.form.paymentMethodCardId) || {}
  const productTotal = (product.priceOut ?? 0) * stateGroupProduct.selectNum
  const transportationCosts = (stateSCM.form.pickUpType === PickUpTypeEnum.Delivery && (stateSCM.freightConfig.reduce((pre, cur) => {
    if (pre > parseFloat(cur?.freightPay) && productTotal < parseFloat(cur?.orderMax)) {
      return parseFloat(cur?.freightPay)
    } else {
      return pre
    }
  }, parseFloat(stateSCM.freightConfig[stateSCM.freightConfig.length - 1]?.freightPay)))) || 0
  const actuallyPaid = productTotal + transportationCosts + dealMaybeNumber(stateSCM.form.saleTax)
  const generateCoin = actuallyPaid * 0.01

  return stateOrderPageModel.show && <OrderPageBox
  >
    <ShopCartProductBox style={{padding: '20px'}}>
      <img src={dealImgUrl(product?.img?.[0]?.url)}
           alt=""/>
      <main>{product?.name}{product?.weight}{product?.unit}</main>
      <section>{product?.remark}</section>
      <footer>
        <ProductPrice product={product}/>
        <span>{stateGroupProduct.selectNum}{ls('份')}</span>
      </footer>
    </ShopCartProductBox>
    <TextField
        style={{margin: '16px', width: 'calc(100vw - 32px)'}}
        fullWidth={true}
        label={ls('运送方式')}
        select={true}
        value={stateSCM.form.pickUpType}
        onChange={event => {
          actionsSCM.setForm(['pickUpType', event.target.value])
          actionsSCM.setForm(['addressId', stateSCM.initAddressId(fpMerge(stateSCM, {
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
    <AddressBox>
      <main>
        <header>
          {`${addressData.combineAddress}`}
        </header>
        <footer>
          {`${addressData.name} ${addressData.contactInformation}`}
        </footer>
      </main>
      <aside>
        <IconButton
            onClick={async () => {
              const res = await actionsSAM.openClick()
              if (res) {
                actionsSCM.setForm(['addressId', res])
              }
            }}
        >
          <ChevronRightIcon/>
        </IconButton>
      </aside>
    </AddressBox>
    <ShopTitle>
      <Space w={20}/>
      {ls('付款方式')}
    </ShopTitle>
    <CardBox>
      <header>{cardData.name}</header>
      <footer>{cardData.number}</footer>
      <aside>
        <IconButton
            onClick={async () => {
              const res = await actionsSelectCard.openClick()
              if (res) {
                actionsSCM.setForm(['paymentMethodCardId', res])
              }
            }}
        >
          <ChevronRightIcon/>
        </IconButton>
      </aside>
    </CardBox>
    <SelectAddress/>
    <SelectCard/>
    <ShopTotal>
      <header>{ls('购物车总计')}</header>
      <footer>{dealMoney(productTotal)}</footer>
    </ShopTotal>
    {transportationCosts > 0 && <ShopTotal>
      <header>{ls('运费')}</header>
      <footer>{dealMoney(transportationCosts)}</footer>
    </ShopTotal>}
    <ShopTotal>
      <header>{ls('份数折扣')}</header>
      <footer>{stateGroupProduct.numDiscount}</footer>
    </ShopTotal>
    <ShopTotal>
      <header>{ls('成团折上折')}</header>
      <footer>{stateGroupProduct.groupDiscount}</footer>
    </ShopTotal>
    <ShopTotal
        style={{fontSize: '18px'}}
    >
      <header>{ls('订单总额')}</header>
      <footer>{dealMoney(actuallyPaid)}</footer>
    </ShopTotal>
    <Space h={60}/>
    <footer>
      <Button
          style={{marginRight: '8px'}}
          variant={'contained'}
          onClick={() => {
            actionsOrderPageModel.close()
          }}
      >{ls('取消')}</Button>
      <ButtonLoad
          variant={'contained'}
          color={'secondary'}
          onClick={async () => {
            const res = await actionsGroupProduct.submit({
              orderInfoItemInput: {
                ...stateSCM.form,
                generateCoin,
                actuallyPaid,
                transportationCosts,
                subtotal: productTotal,
                currentUserLevel: stateSCM.user.userInfo?.userLevel,
                rOrderProduct: [{
                  count: stateGroupProduct.selectNum,
                  productId: product?.id,
                  product,
                }],
              }
            })
            if (res?.saveGroupOrder?.id) {
              showMessage('操作成功 将前往付款')
              // await router.replace('/cart/result')
              const _query = dealUrlQuery({orderId: res?.saveGroupOrder?.id})
              await router.replace(`/pay${_query}`, `/pay${_query}`)
              actionsSCM.clearData()
              actionsSCM.getList()
              actionsOrderPageModel.close()
            }
          }}
      >{ls('提交订单')}</ButtonLoad>
    </footer>
  </OrderPageBox> || null
}
