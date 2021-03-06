import React, {useEffect} from 'react'
import EditIcon from '@material-ui/icons/Edit'
import StreetviewIcon from '@material-ui/icons/Streetview'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import styled from 'styled-components'
import {UserAddress} from '../../../../graphqlTypes/types'
import {Button, IconButton} from '@material-ui/core'
import {ll} from '../../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'
import {showMessage} from '../../../../components/Message/Message'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'

export const myAddressModel = modelFactory('myAddressModel', {
  list: [] as UserAddress[],
}, {
  getList: async (value, option) => {
    const res = await option.query(doc.userAddressListOneUser)
    option.setData(fpMergePre({
      list: res?.userAddressListOneUser,
    }))
  },
  setDefault: async (value, option) => {
    const res = await option.mutate(doc.setUserAddressDefault, {
      data: {
        id: value.id,
      },
    })
    if (res?.setUserAddressDefault?.id) {
      showMessage('操作成功')
    }
    return res
  },
})

const ListBox = styled.div`
  
`
const ListItem = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid ${grey[200]};
  > svg {
  }
  > main {
    margin-left: 10px;
    flex-grow: 1;
  }
`
export const DefaultBox = styled.div`
  padding: 4px 16px;
  background: ${mpStyle.red};
  color: white;
  border-radius: 14px;
  display: inline-flex;
`
const AddressBox = styled.main`
  > footer {
    font-size: small;
    color: ${grey[400]};
  }
`

export const MyAddress = () => {
  const router = useRouter()
  const {state: stateMAM, actions: actionsMAM} = useStoreModel(myAddressModel)
  useEffect(() => {
    actionsMAM.getList()
  }, [])

  return <div>
    <HeaderTitle
        title={'我的地址'}
    />
    <ListBox>
      {stateMAM.list.map(value => <ListItem key={`myAddress_${value.id}`}>
        <StreetviewIcon fontSize={'large'}/>
        <AddressBox>
          <header>{value.name}</header>
          <Space h={4}/>
          <footer>{value.address}</footer>
          <Space h={4}/>
          <footer>{value.city} {value.province} {value.zip}</footer>
        </AddressBox>
        <aside>
          {(value.isDefault && <DefaultBox style={{fontSize: '14px'}}>{ll('默认')}</DefaultBox>) ||
          <Button
              size={'small'}
              color={'secondary'}
              variant={'outlined'}
              onClick={async () => {
                if ((await actionsMAM.setDefault(value))?.setUserAddressDefault?.id) {
                  actionsMAM.getList()
                }
              }}
          >{ll('设为默认')}</Button>
          }
          <IconButton
              onClick={() => router.push('/m/me/myAddress/edit/[id]', `/m/me/myAddress/edit/${value.id}`)}
          >
            <EditIcon/>
          </IconButton>
          {/*<Button*/}
          {/*    size={'small'}*/}
          {/*    variant={'text'}*/}
          {/*    color={'secondary'}*/}
          {/*>{ls('编辑')}</Button>*/}
        </aside>
      </ListItem>)}
    </ListBox>
    <div
        style={{padding: '0 20px', marginTop: '20px'}}
    >
      <Button
          fullWidth
          variant={'contained'}
          color={'secondary'}
          onClick={() => router.push('/m/me/myAddress/edit/[id]', `/m/me/myAddress/edit/0`)}
      >{ll('新增')}</Button>
    </div>
  </div>
}
