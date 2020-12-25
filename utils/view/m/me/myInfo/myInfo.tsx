import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {Button, Card} from '@material-ui/core'
import styled from 'styled-components'
import {ll} from '../../../../tools/dealKey'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {meModel} from '../model'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'

const MyCard = styled(Card)`
  margin: 40px 20px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  > section {
    display: flex;
    height: 40px;
    align-items: center;
    > aside {
      margin-right: 10px;
    }
    > main {
      flex-grow: 1;
    }
    > footer {
      > button {
        padding: 2px 8px;
      }
    }
  }
`
const Part = styled.div`
  width: 100%;
  height: 18px;
  background: ${grey[100]};
`
const Account = styled.div`
  padding: 20px;
  > header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  > section {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

`

export const MyInfo = () => {
  const router = useRouter()
  const {state: stateMeModel, actions: actionsMeModel} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMeModel.user.id) {
      actionsMeModel.getLoginUser()
    }
  }, [])

  return <div>
    <HeaderTitle
        title={'我的达人证'}
    />
    <MyCard>
      <section>
        <aside>
          {ll('姓名')}
        </aside>
        <main>{stateMeModel.user.userInfo?.name}</main>
        <footer>
          <Button
              variant={'outlined'}
              onClick={() => router.push('/m/me/myInfo/updateMyInfo')}
          >{ll('编辑')}</Button>
        </footer>
      </section>
      <section>
        <aside>
          {ll('电话')}
        </aside>
        <main>{stateMeModel.user.userInfo?.phone}</main>
      </section>
      <section>
        <aside>
          {ll('邮箱')}
        </aside>
        <main>{stateMeModel.user.userInfo?.email}</main>
      </section>
    </MyCard>
    <Part/>
    <Account>
      <header>{ll('账号设置')}</header>
      <section>{ll('账号')}</section>
      <section>{stateMeModel.user.name}</section>
      <section>{ll('密码')}</section>
      <section>
        <span>********</span>
        <Button
            color={'secondary'}
            variant={'text'}
            size={'small'}
            onClick={() => router.push('/m/me/myInfo/updatePassword')}
        >修改</Button>
      </section>

    </Account>

  </div>
}
