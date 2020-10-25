import {dialogModelFactory} from '../../../../commonModel/dialog'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
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
    align-items: center;
    > aside {
      flex-basis: 30px;
      flex-shrink: 0;
      > img {
        width: 24px;
        height: 24px;
      }
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
          <aside>
            <img
                alt={''}
                src={'/img/address/address.png'}
            />
          </aside>
          <main>
            <section>
              {dialogData?.apartment} {dialogData?.streetAddress}
            </section>
            <section>
              {dialogData?.city} {dialogData?.province} {dialogData?.zip}
            </section>
          </main>
        </section>
        <Space h={8}/>
        <section>
          <aside>
            <img
                alt={''}
                src={'/img/address/phone.png'}
            />
          </aside>
          {dialogData?.openTime}
        </section>
        <Space h={8}/>
        <section>
          <aside>
            <img
                alt={''}
                src={'/img/address/clock.png'}
            />
          </aside>
          {dialogData?.phone}
        </section>
        <Space h={16}/>
      </ContentBox>
    </DialogContent>
  </Dialog>
}
