import {Dialog, DialogTitle, DialogContent, Radio, Button} from '@material-ui/core'
import React from 'react'
import {dialogModelFactory} from '../../../../commonModel/dialog'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {ll} from '../../../../tools/dealKey'
import {ShopCartModel} from '../index'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import {PickUpTypeEnum} from '../../../../ss_common/enum'

export const selectAddressModel = dialogModelFactory('selectAddressModel', {})

const AddressBox = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 8px;
  margin-bottom: 16px;
  > header {
    font-size: 16px;
    font-weight: bold;
  }
  > aside {
    grid-area: 1/2/4/3;
  }
`
const Footer = styled.div`

`

export const SelectAddress = () => {
  const router = useRouter()
  const {state: stateSelectAddressModel, actions: actionsSelectAddressModel} = useStoreModel(selectAddressModel)
  const {state: stateShopCartModel, actions: actionsShopCartModel} = useStoreModel(ShopCartModel)
  const addressList = stateShopCartModel.dealAddressList(stateShopCartModel)


  return <Dialog
      open={stateSelectAddressModel.open}
      onClose={actionsSelectAddressModel.onClose}
  >
    <DialogTitle>{ll('选择地址')}</DialogTitle>
    <DialogContent>
      {addressList.map(v => <AddressBox key={`DialogTitleAddressBox_${v.id}`}>
        <header>{v.name}</header>
        <main>{v.address}</main>
        <footer>{`${v.city} ${v.province} ${v.zip}`}</footer>
        <aside>
          <Radio
              onChange={() => {
                stateSelectAddressModel.openResolve(v.id)
                actionsSelectAddressModel.onClose()
              }}
              checked={v.id === stateShopCartModel.form.addressId}
          />
        </aside>
      </AddressBox>)}
      <Footer>
        {stateShopCartModel.form.pickUpType === PickUpTypeEnum.Delivery &&
        <Button
            fullWidth={true}
            variant={'contained'}
            color={'secondary'}
            onClick={() => {
              router.push('/m/me/myAddress/edit/[id]', '/m/me/myAddress/edit/0')
            }}
        >{ll('添加新地址')}</Button>
        }
      </Footer>
    </DialogContent>
  </Dialog>
}
