import React, {useEffect} from 'react'
import StreetviewIcon from '@material-ui/icons/Streetview'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {doc} from '../../../graphqlTypes/doc'
import {fpMergePre} from '../../../tools/utils'
import {useStoreModel} from '../../../ModelAction/useStore'
import styled from 'styled-components'
import {UserAddress} from '../../../graphqlTypes/types'
import {Button} from '@material-ui/core'
import {ls} from '../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'
import {showMessage} from '../../../components/Message/Message'

const myAddressModel = modelFactory('myAddressModel', {
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
        <main>
          <header>{value.name}</header>
          <footer>{value.combineAddress}</footer>
        </main>
        <aside>
          {(value.isDefault && <span style={{fontSize: '14px'}}>{ls('默认')}</span>) ||
          <Button
              size={'small'}
              variant={'outlined'}
              onClick={async () => {
                if ((await actionsMAM.setDefault(value))?.setUserAddressDefault?.id) {
                  actionsMAM.getList()
                }
              }}
          >{ls('设为默认')}</Button>
          }
          <Button
              size={'small'}
              variant={'text'}
              color={'secondary'}
              onClick={() => router.push('/me/myAddress/edit/[id]', `/me/myAddress/edit/${value.id}`)}
          >{ls('编辑')}</Button>
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
          onClick={() => router.push('/me/myAddress/edit/[id]', `/me/myAddress/edit/0`)}
      >{ls('新增')}</Button>
    </div>
  </div>
}
