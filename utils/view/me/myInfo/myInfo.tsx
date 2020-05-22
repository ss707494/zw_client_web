import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {Button, Card} from '@material-ui/core'
import styled from 'styled-components'
import {ls} from '../../../tools/dealKey'
import {useStoreModel} from '../../../ModelAction/useStore'
import {meModel} from '../model'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'
import {showMessage} from '../../../components/Message/Message'

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
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])

  return <div>
    <HeaderTitle
        title={'我的达人证'}
    />
    <MyCard>
      <section>
        <aside>
          {ls('姓名')}
        </aside>
        <main>{stateMe.user.userInfo?.name}</main>
        <footer>
          <Button
              variant={'outlined'}
              onClick={() => showMessage(ls('功能开发中...'))}
          >{ls('编辑')}</Button>
        </footer>
      </section>
      <section>
        <aside>
          {ls('电话')}
        </aside>
        <main>{stateMe.user.userInfo?.phone}</main>
      </section>
      <section>
        <aside>
          {ls('邮箱')}
        </aside>
        <main>{stateMe.user.userInfo?.email}</main>
      </section>
    </MyCard>
    <Part/>
    <Account>
      <header>{ls('账号设置')}</header>
      <section>{ls('账号')}</section>
      <section>{stateMe.user.name}</section>
      <section>{ls('密码')}</section>
      <section>
        <span>********</span>
        <Button
            color={'secondary'}
            variant={'text'}
            size={'small'}
            onClick={() => router.push('/me/myInfo/updatePassword')}
        >修改</Button>
      </section>

    </Account>

  </div>
}
