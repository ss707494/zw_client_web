import React, {useEffect} from 'react'
import {doc} from '../../graphqlTypes/doc'
import {dealMoney, fpMerge} from '../../tools/utils'
import {useStoreModel} from '../../ModelAction/useStore'
import {ls} from '../../tools/dealKey'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import {Box, Button, LinearProgress, MenuItem, TextField} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import styled from 'styled-components'
import {getPickUpTypeName, PickUpTypeEnum} from '../../ss_common/enum'
import {CartProduct} from './CartProduct'
import {BScroller} from '../../components/BScroll/BScroller'
import {pageTypeEnum, shopCartModel} from './index'
import {dealNoAuth} from '../../components/NoAuth/NoAuth'

const BoxContain = styled.section`
  padding: 0 20px;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 16px 0 12px;
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
  const {state: stateSCM, actions: actionsSCM, getLoad} = useStoreModel(shopCartModel)
  useEffect(() => {
    if (stateSCM.shopCartList.length === 0) {
      actionsSCM.getList()
    }
  }, [])
  useEffect(() => {
    if (stateSCM.user.id && localStorage.getItem(`promoCode_${stateSCM.user.id}`)) {
      actionsSCM.dealPromoCode(`${localStorage.getItem(`promoCode_${stateSCM.user.id}`)}`)
    }
  }, [stateSCM.user.id])
  const productNumber = stateSCM.dealProductNumber(stateSCM)
  const productSubtotal = dealMoney(stateSCM.dealProductTotal(stateSCM))
  const allTotal = productSubtotal + 0

  return <div>
    <HeaderTitle
        title={'购物车'}
    />
    {dealNoAuth(<>
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
          {stateSCM.shopCartList.map(value => <CartProduct
              key={`CartProduct_${value.id}`}
              shopCart={value}/>)
          }
          <TextField
              style={{marginTop: '10px'}}
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
          <Title>{ls('达人卡和优惠券')}</Title>
          <Button
              variant={'outlined'}
          >{ls('输入验证码')}</Button>
          <Title>{ls('预估价格')}</Title>
          <Money>
            <aside>{ls('小计')}</aside>
            <main>{productSubtotal}</main>
          </Money>
          <div style={{width: '100%', height: '10px'}}/>
          <Money>
            <aside>{ls('总计')}</aside>
            <main>{allTotal}</main>
          </Money>
          <Title>{ls('下次购买的商品')}</Title>
          {stateSCM.shopCartListNext.map(value => <CartProduct
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
            onClick={() => actionsSCM.updatePageType(pageTypeEnum.order)}
        >去结算</Button>
      </FixFooter>
    </>)}
  </div>
}
