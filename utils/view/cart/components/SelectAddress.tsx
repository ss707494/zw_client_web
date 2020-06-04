import {Dialog, DialogTitle, DialogContent, Radio, Button} from '@material-ui/core'
import React from 'react'
import {dialogModelFactory} from '../../../commonModel/dialog'
import {useStoreModel} from '../../../ModelAction/useStore'
import {ls} from '../../../tools/dealKey'
import {shopCartModel} from '../index'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import {PickUpTypeEnum} from '../../../ss_common/enum'

export const selectAddressModel = dialogModelFactory('selectAddressModel', {})

const AddressBox = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: repeat(2, fr);
  grid-row-gap: 8px;
  margin-bottom: 16px;
  > header {
    font-size: 16px;
    font-weight: bold;
  }
  > aside {
    grid-area: 1/2/3/3;
  }
`
const Footer = styled.div`

`

export const SelectAddress = () => {
  const router = useRouter()
  const {state: stateSAM, actions: actionsSAM} = useStoreModel(selectAddressModel)
  const {state: stateShopCartModel, actions: actionsShopCartModel} = useStoreModel(shopCartModel)
  const addressList = stateShopCartModel.dealAddressList(stateShopCartModel)


  return <Dialog
      open={stateSAM.open}
      onClose={actionsSAM.onClose}
  >
    <DialogTitle>{ls('选择地址')}</DialogTitle>
    <DialogContent>
      {addressList.map(v => <AddressBox key={`DialogTitleAddressBox_${v.id}`}>
        <header>{v.combineAddress}</header>
        <footer>{`${v.name} ${v.contactInformation}`}</footer>
        <aside>
          <Radio
              onChange={() => {
                stateSAM.openResolve(v.id)
                actionsSAM.onClose()
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
              router.push('/me/myAddress/edit/[id]', '/me/myAddress/edit/0')
            }}
        >{ls('添加新地址')}</Button>
        }
      </Footer>
    </DialogContent>
  </Dialog>
}
