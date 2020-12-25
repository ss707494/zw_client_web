import React, {useEffect} from 'react'
import {MeLayoutBox} from '../components/meLayoutBox'
import {styled} from '@material-ui/styles'
import {ll} from '../../../../tools/dealKey'
import {Space} from '../../../../components/Box/Box'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {PickupAddressModel} from '../../../m/me/pickupAddress/list'
import {dealImgUrl} from '../../../../tools/img'
import {Button, Divider} from '@material-ui/core'

const Header = styled('div')({})
const ListBox = styled('div')({
  display: 'grid',
  gridTemplateColumns: '370px 370px',
  gridGap: 40,
})
const Box = styled('div')({
  width: '370px',
  background: '#FFFFFF',
  boxShadow: '0px 2px 8px 0px #EBEBEB',
  borderRadius: '10px',
  border: '1px solid #E1E1E1',
  padding: '22px',
  '&>img': {
    width: '325px',
    height: '130px',
  },
  '&>main': {
    display: 'grid',
    gridTemplateColumns: '36px 1fr',
    gridColumnGap: 15,
    alignItems: 'center',
    '&>img': {
      width: 36,
      height: 36,
    },
    '&>section': {
      wordBreak: 'break-word',
      display: 'grid',
      gridTemplateColumns: '1fr max-content',
      '&>aside': {
        '& .MuiButtonBase-root': {
          height: 26,
          borderRadius: 6,
        }
      }
    },
  },
})

export const PCPickupAddress = () => {
  const {actions: actionsPickupAddressModel, state: statePickupAddressModel} = useStoreModel(PickupAddressModel)
  useEffect(() => {
    if (!statePickupAddressModel.list.length) {
      actionsPickupAddressModel.getList()
    }
  }, [actionsPickupAddressModel, statePickupAddressModel.list])

  return <MeLayoutBox>
    <Header>
      {ll('我的自取点')}
    </Header>
    <Space h={39}/>
    <ListBox>
      {statePickupAddressModel.list.sort((a: any, b: any) => statePickupAddressModel.user.userInfo?.pickupAddressId === b?.id ? 1 : (b?.updateTime - a?.updateTime)).map((value: any) =>
          <Box
              key={`statePickupAddressModel${value.id}`}
          >
            <img src={dealImgUrl(value.imgUrl)}
                 alt=""/>
            <Space h={16}/>
            <header>{value.fullName}</header>
            <Space h={15}/>
            <Divider/>
            <Space h={24}/>
            <main>
              <img
                  alt={''}
                  src={'/img/address/address.png'}
              />
              <section>
                {value?.apartment} {value?.streetAddress}
                {value?.city} {value?.province} {value?.zip}
              </section>
            </main>
            <Space h={20}/>
            <main>
              <img
                  alt={''}
                  src={'/img/address/clock.png'}
              />
              <section>{value.openTime}</section>
            </main>
            <Space h={20}/>
            <main>
              <img
                  alt={''}
                  src={'/img/address/phone.png'}
              />
              <section>
                {value.phone}
                <aside>
                  {(statePickupAddressModel.user.userInfo?.pickupAddressId === value.id && <span>{ll('默认地址')}</span>)
                  || <Button
                      color={'secondary'}
                      variant={'outlined'}
                      onClick={async () => {
                        if ((await actionsPickupAddressModel.setDefault(value))?.updateUserInfo?.id) {
                          actionsPickupAddressModel.getList()
                        }
                      }}
                  >{ll('设为默认')}</Button>}
                </aside>
              </section>
            </main>
          </Box>)}
    </ListBox>
  </MeLayoutBox>
}
