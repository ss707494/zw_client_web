import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../tools/utils'
import styled from 'styled-components'
import {Button, ButtonBase, IconButton} from '@material-ui/core'
import {dealImgUrl} from '../../../../tools/img'
import {grey} from '@material-ui/core/colors'
import {User, UserInfoItemInput} from '../../../../graphqlTypes/types'
import {ll} from '../../../../tools/dealKey'
import {showMessage} from '../../../../components/Message/Message'
import {DefaultBox} from '../myAddress/list'
import {PickupAddressDetail, PickupAddressDetailModel} from './pickupAddressDetail'
import InfoIcon from '@material-ui/icons/Info'

export const PickupAddressModel = modelFactory('pickupAddressModel', {
  list: [],
  user: {} as User,
}, {
  getList: async (value, option) => {
    const res = await option.query(doc.pickupAddress, {})
    option.setData(fpMergePre({
      list: res?.getDataConfig?.value?.list ?? [],
      user: res?.oneUser,
    }))
  },
  setDefault: async (value, option) => {
    const res = option.mutate(doc.updateUserInfo, {
      userInfo: {
        id: option.data.user.userInfo?.id,
        pickupAddressId: value.id,
      } as UserInfoItemInput,
    })
    if (res?.updateUserInfo?.id) {
      showMessage('操作成功')
    }
    return res
  },

})

const ItemBox = styled(ButtonBase)`
  &&& {
    display: flex;
    padding: 10px 20px;
    > img {
      width: 18vw;
      height: 18vw;
    }
    > section {
      margin-left: 9px;
      text-align: left;
      > main, footer {
        font-size: 12px;
        color: ${grey[600]};
      }
    }
  }
`
const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 108px;
  align-items: center;
  justify-items: start;
`
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const PickupAddress = () => {
  const {actions: actionsPickupAddressModel, state: statePickupAddressModel} = useStoreModel(PickupAddressModel)
  const {actions: actionsPickupAddressDetailModel} = useStoreModel(PickupAddressDetailModel)
  useEffect(() => {
    if (!statePickupAddressModel.list.length) {
      actionsPickupAddressModel.getList()
    }
  }, [actionsPickupAddressModel, statePickupAddressModel.list])

  return <div>
    <HeaderTitle
        title={'我的取货点'}
    />
    <Box>
      {statePickupAddressModel.list.sort((a: any, b: any) => statePickupAddressModel.user.userInfo?.pickupAddressId === b?.id ? 1 : (b?.updateTime - a?.updateTime)).map((value: any) => <React.Fragment key={`PickupAddress_${value.id}`}>
        <ItemBox>
          <img src={dealImgUrl(value.imgUrl)}
               alt=""/>
          <section>
            <header>{value.fullName}</header>
            <footer>
              {`${value.streetAddress}`}
            </footer>
            <main>{`${value.city} ${value.province} ${value.zip}`}</main>
          </section>
        </ItemBox>
        <RightBox>
          <IconButton
              onClick={async () => {
                const res = await actionsPickupAddressDetailModel.openClick(value)
                console.log(res)
              }}
          >
            <InfoIcon/>
          </IconButton>
          {(statePickupAddressModel.user.userInfo?.pickupAddressId === value.id && <DefaultBox>{ll('默认地址')}</DefaultBox>) ||
          <Button
              color={'secondary'}
              variant={'outlined'}
              onClick={async () => {
                if ((await actionsPickupAddressModel.setDefault(value))?.updateUserInfo?.id) {
                  actionsPickupAddressModel.getList()
                }
              }}
          >{ll('设为默认')}</Button>
          }
        </RightBox>
      </React.Fragment>)}
    </Box>
    <PickupAddressDetail/>
  </div>
}
