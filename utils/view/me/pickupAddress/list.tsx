import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {doc} from '../../../graphqlTypes/doc'
import {useStoreModel} from '../../../ModelAction/useStore'
import {fpMergePre} from '../../../tools/utils'
import styled from 'styled-components'
import {Button, ButtonBase} from '@material-ui/core'
import {dealImgUrl} from '../../../tools/img'
import {grey} from '@material-ui/core/colors'
import {User, UserInfoItemInput} from '../../../graphqlTypes/types'
import {ls} from '../../../tools/dealKey'
import {showMessage} from '../../../components/Message/Message'

const pickupAddressModel = modelFactory('pickupAddressModel', {
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
      } as UserInfoItemInput
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
  grid-template-columns: 1fr 20vw;
  align-items: center;
  justify-items: start;
`

export const PickupAddress = () => {
  const {actions: actionsPAM, state: statePAM} = useStoreModel(pickupAddressModel)
  useEffect(() => {
    if (!statePAM.list.length) {
      actionsPAM.getList()
    }
  }, [])

  console.log(statePAM.user.userInfo)

  return <div>
    <HeaderTitle
        title={'我的取货点'}
    />
    <Box>
      {statePAM.list.map((value: any) => <React.Fragment key={`PickupAddress_${value.id}`}>
        <ItemBox>
          <img src={dealImgUrl(value.imgUrl)}
               alt=""/>
          <section>
            <header>{value.fullName}</header>
            <main>{`${value.province} ${value.city}`}</main>
            <footer>
              {`${value.streetAddress}`}
            </footer>
          </section>
        </ItemBox>
        {(statePAM.user.userInfo?.pickupAddressId === value.id && <section>{ls('默认地址')}</section>) ||
        <Button
            color={'secondary'}
            onClick={async () => {
              if ((await actionsPAM.setDefault(value))?.updateUserInfo?.id) {
                actionsPAM.getList()
              }
            }}
        >{ls('设为默认')}</Button>
        }
      </React.Fragment>)}
    </Box>
  </div>
}
