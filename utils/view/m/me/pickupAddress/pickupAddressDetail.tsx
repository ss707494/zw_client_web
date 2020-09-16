import {dialogModelFactory} from '../../../../commonModel/dialog'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { ls } from '../../../../tools/dealKey'
import {Space} from '../../../../components/Box/Box'
import {dealImgUrl} from '../../../../tools/img'

export const PickupAddressDetailModel = dialogModelFactory('PickupAddressDetail', {
  apartment: '',
  city: '',
  fullName: '',
  id: '',
  imgUrl: '',
  openTime: '',
  phone: '',
  province: '',
  streetAddress: '',
  zip: '',
})

const ContentBox = styled.div`
  > img {
    max-width: 70vw;
    max-height: 70vw;
    margin: 0 auto;
  }
  > section {
    display: flex;
    > aside {
      flex-basis: 80px;
      flex-shrink: 0;
    }
  }
`
export const PickupAddressDetail = () => {
  const {actions: actionsPickupAddressDetailModel, state: statePickupAddressDetailModel} = useStoreModel(PickupAddressDetailModel)

  const dialogData = statePickupAddressDetailModel.dialogData
  // id: "1585479365574", zip: "45220", city: "Cincinnati", phone: "5136381111", imgUrl: "upload_file/1585452938913-UC Pickup.png", …}
  return <Dialog
      open={statePickupAddressDetailModel.open}
      onClose={actionsPickupAddressDetailModel.onClose}
  >
    <DialogTitle>
      {dialogData?.fullName}
    </DialogTitle>
    <DialogContent>
      <ContentBox>
        <img
            src={dealImgUrl(dialogData.imgUrl)}
            alt={''}
        />
        <Space h={8}/>
        <section>
          <aside>{ls('详细地址')}:</aside>
          {dialogData?.apartment} {dialogData?.streetAddress}
        </section>
        <Space h={8}/>
        <section>
          <aside/>
          {dialogData?.city} {dialogData?.province} {dialogData?.zip}
        </section>
        <Space h={8}/>
        <section>
          <aside>{ls('营业时间')}:</aside>
          {dialogData?.openTime}
        </section>
        <Space h={8}/>
        <section>
          <aside>{ls('联系电话')}:</aside>
          {dialogData?.phone}
        </section>
        <Space h={16}/>
      </ContentBox>
    </DialogContent>
  </Dialog>
}
