import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import {Button} from '@material-ui/core'
import {meModel} from './model'
import {red} from '@material-ui/core/colors'
import {useStoreModel} from '../../ModelAction/useStore'
import {ls} from '../../tools/dealKey'
import {FootBar} from '../../components/common/FootBar/FootBar'

const Header = styled.div`
  display: grid;
  grid-template-rows: 20vh 30px 30px;
  grid-template-columns: 1fr 100px;
  padding-left: 20px;
  background: ${red[400]};
  color: #fff;
  > header {
    font-size: 28px;
    grid-area: 1/1/2/3;
    align-self: end;
    margin-bottom: 20px;
  }
  > aside {
    grid-area: 2/2/4/3;
    margin-right: 20px;
  }

`

export default function Me() {
  const router = useRouter()
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    actionsMe.getLoginUser()
    // router.replace('/login')
  }, [])
  return <div>
    <Header>
      <header>{ls('您好,')}{stateMe.user.userInfo?.name}</header>
      <section>{stateMe.user.userInfo?.phone}</section>
      <section>{stateMe.user.userInfo?.email}</section>
      <aside>
        <Button
            color={'inherit'}
            variant={'outlined'}
            onClick={() => actionsMe.logout()}
        >{ls('登出')}</Button>
      </aside>
    </Header>
    <Button
    >退出</Button>
    <FootBar/>
  </div>
}
