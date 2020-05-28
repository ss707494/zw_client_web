import React, {useEffect} from 'react'
import {modelFactory} from '../../ModelAction/modelUtil'
import {ShopCart} from '../../graphqlTypes/types'
import {doc} from '../../graphqlTypes/doc'
import {dealMaybeNumber, dealMoney, fpMergePre} from '../../tools/utils'
import {useStoreModel} from '../../ModelAction/useStore'
import {ls} from '../../tools/dealKey'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import {LinearProgress, MenuItem, TextField} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import styled from 'styled-components'
import {getPickUpTypeName, PickUpTypeEnum} from '../../ss_common/enum'
import {CartProduct} from './CartProduct'
import {setForm} from '../../tools/commonAction'

export const shopCartModel = modelFactory('shopCartModel', {
  shopCartList: [] as ShopCart[],
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
      shopCartList: res?.shopCartList ?? [],
    }))
  },
})

const Box = styled.section`
  padding: 0 20px;
`

export const ShopCartPage = () => {
  const {state: stateSCM, actions: actionsSCM, getLoad} = useStoreModel(shopCartModel)
  useEffect(() => {
    actionsSCM.getList()
  }, [])
  console.log(stateSCM.shopCartList)
  const productNumber = stateSCM.shopCartList.reduce((pre, cur) => pre + (cur?.number ?? 0), 0)
  const productSubtotal = dealMoney(stateSCM.shopCartList.reduce((pre, cur) => pre + (dealMaybeNumber(cur?.number) * dealMaybeNumber(cur?.product?.priceOut)), 0))

  return <div>
    <HeaderTitle
        title={'购物车'}
    />
    {(!!getLoad(doc.userShopCartList) && <LinearProgress/>) || <div style={{height: '4px'}}/>}
    <Box>
      <div
          style={{fontSize: '18px', textAlign: 'center'}}
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
          shopCart={value}/>)}
      <TextField
          style={{marginTop: '10px'}}
          fullWidth={true}
          label={ls('运送方式')}
          select={true}
          value={stateSCM.form.pickUpType}
          onChange={event => actionsSCM.setForm(['pickUpType', event.target.value])}
      >
        <MenuItem
            value={PickUpTypeEnum.Self}
        >{ls(getPickUpTypeName(PickUpTypeEnum.Self))}</MenuItem>
        <MenuItem
            value={PickUpTypeEnum.Delivery}
        >{ls(getPickUpTypeName(PickUpTypeEnum.Delivery))}</MenuItem>
      </TextField>
    </Box>
  </div>
}
