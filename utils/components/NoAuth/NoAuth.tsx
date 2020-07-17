import {useStoreModel} from '../../ModelAction/useStore'
import {meModel} from '../../view/me/model'
import React, {useEffect} from 'react'
import {RegisterHeader} from '../RegisterHeader/RegisterHeader'
import {ls} from '../../tools/dealKey'
import {Button} from '@material-ui/core'
import styled from 'styled-components'
import {getToken} from '../../tools/token'

const Empty = styled.div`
  padding: 20px;
  > main {
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    > span {
      margin-bottom: 30px;
    }
  }
`

export const dealNoAuth = (others: any) => {
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])
  return (!stateMe.user.id || !getToken())
      ? <Empty>
        <RegisterHeader/>
        <main>
          <span>{ls('您未登录,请先登录')}</span>
          <Button
              fullWidth
              variant={'contained'}
              color={'secondary'}
              onClick={actionsMe.toLogin}
          >{ls('登录')}</Button>
        </main>
      </Empty>
      : others
}
