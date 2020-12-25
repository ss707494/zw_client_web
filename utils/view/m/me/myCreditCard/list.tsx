import React, {useEffect} from 'react'
import PaymentIcon from '@material-ui/icons/Payment'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {doc} from '../../../../graphqlTypes/doc'
import {dealLastNumber, formatDate, fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import styled from 'styled-components'
import {UserPayCard} from '../../../../graphqlTypes/types'
import {Button, IconButton} from '@material-ui/core'
import {ll} from '../../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'
import {showMessage} from '../../../../components/Message/Message'
import EditIcon from '@material-ui/icons/Edit'
import {DefaultBox} from '../myAddress/list'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  box: {
    height: (props: {height: string}) => props.height,
  },
})

export const MyCreditCardListModel = modelFactory('myCreditCardListModel', {
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
    > footer {
      margin-top: 4px;
      font-size: small;
      color: ${grey[400]};
    }
  }
`

export const MyCreditCardList = () => {
  const router = useRouter()
  const {state: stateMyCreditCardListModel, actions: actionsMyCreditCardListModel} = useStoreModel(MyCreditCardListModel)
  useEffect(() => {
    actionsMyCreditCardListModel.getList()
  }, [actionsMyCreditCardListModel])

  return <div>
    <HeaderTitle
        title={'我的信用卡'}
    />
    <ListBox>
      {stateMyCreditCardListModel.list.map(value => <ListItem key={`MyCreditCardList_${value.id}`}>
        <PaymentIcon fontSize={'large'}/>
        <main>
          <header>{ll('卡号')}: {dealLastNumber(value.number)}</header>
          <footer>{ll('过期日')}: {formatDate(value?.expirationTime, 'MM/yy')}</footer>
          <footer>{value.name}</footer>
        </main>
        <aside>
          {(value.isDefault && <DefaultBox style={{fontSize: '14px'}}>{ll('默认')}</DefaultBox>) ||
          <Button
              size={'small'}
              color={'secondary'}
              variant={'outlined'}
              onClick={async () => {
                if ((await actionsMyCreditCardListModel.setDefault(value))?.setUserPayCardDefault?.id) {
                  actionsMyCreditCardListModel.getList()
                }
              }}
          >{ll('设为默认')}</Button>
          }
          {/*<Button*/}
          {/*    size={'small'}*/}
          {/*    variant={'text'}*/}
          {/*    color={'secondary'}*/}
          {/*    onClick={() => router.push('/m/me/myCreditCard/edit/[id]', `/m/me/myCreditCard/edit/${value.id}`)}*/}
          {/*>{ls('编辑')}</Button>*/}
          <IconButton
              onClick={() => router.push('/m/me/myCreditCard/edit/[id]', `/m/me/myCreditCard/edit/${value.id}`)}
          >
            <EditIcon/>
          </IconButton>

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
          onClick={() => router.push('/m/me/myCreditCard/edit/[id]', `/m/me/myCreditCard/edit/0`)}
      >{ll('新增')}</Button>
    </div>
  </div>
}
