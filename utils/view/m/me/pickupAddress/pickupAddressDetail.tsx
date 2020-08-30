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
        <div>{dialogData?.apartment} {dialogData?.streetAddress} </div>
        <Space h={8}/>
        <div>{dialogData?.city} {dialogData?.province} {dialogData?.zip}</div>
        <Space h={8}/>
        <div>{ls('营业时间')}:{dialogData?.openTime}</div>
        <Space h={8}/>
        <div>{ls('联系电话')}:{dialogData?.phone}</div>
        <Space h={16}/>
      </ContentBox>
    </DialogContent>
  </Dialog>
}
