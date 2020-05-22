import React, {useEffect} from 'react'
import PaymentIcon from '@material-ui/icons/Payment'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {doc} from '../../../graphqlTypes/doc'
import {fpMergePre} from '../../../tools/utils'
import {useStoreModel} from '../../../ModelAction/useStore'
import styled from 'styled-components'
import {UserPayCard} from '../../../graphqlTypes/types'
import {Button} from '@material-ui/core'
import {ls} from '../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'
import {showMessage} from '../../../components/Message/Message'

const myCreditCardListModel = modelFactory('myCreditCardListModel', {
  list: [] as UserPayCard[],
}, {
  getList: async (value, option) => {
    const res = await option.query(doc.payCardListOneUser)
    option.setData(fpMergePre({
      list: res?.payCardListOneUser,
    }))
  },
  setDefault: async (value, option) => {
    const res = await option.mutate(doc.setUserPayCardDefault, {
      data: {
        id: value.id,
      },
    })
    if (res?.setUserPayCardDefault?.id) {
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

export const MyCreditCardList = () => {
  const router = useRouter()
  const {state: stateMCC, actions: actionsMCC} = useStoreModel(myCreditCardListModel)
  useEffect(() => {
    actionsMCC.getList()
  }, [])

  return <div>
    <HeaderTitle
        title={'我的信用卡'}
    />
    <ListBox>
      {stateMCC.list.map(value => <ListItem key={`MyCreditCardList_${value.id}`}>
        <PaymentIcon fontSize={'large'}/>
        <main>
          <header>{value.name}</header>
          <footer>{value.number}</footer>
        </main>
        <aside>
          {(value.isDefault && <span style={{fontSize: '14px'}}>{ls('默认')}</span>) ||
          <Button
              size={'small'}
              variant={'outlined'}
              onClick={async () => {
                if ((await actionsMCC.setDefault(value))?.setUserPayCardDefault?.id) {
                  actionsMCC.getList()
                }
              }}
          >{ls('设为默认')}</Button>
          }
          <Button
              size={'small'}
              variant={'text'}
              color={'secondary'}
              onClick={() => router.push('/me/myCreditCard/edit/[id]', `/me/myCreditCard/edit/${value.id}`)}
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
          onClick={() => router.push('/me/myCreditCard/edit/[id]', `/me/myCreditCard/edit/0`)}
      >{ls('新增')}</Button>
    </div>
  </div>
}
