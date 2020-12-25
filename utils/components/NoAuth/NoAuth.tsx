import {useStoreModel} from '../../ModelAction/useStore'
import {meModel} from '../../view/m/me/model'
import React, {useEffect} from 'react'
import {RegisterHeader} from '../RegisterHeader/RegisterHeader'
import {ll} from '../../tools/dealKey'
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

export const DealNoAuth = (others: any) => {
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [actionsMe, stateMe.user.id])
  return (!stateMe.user.id || !getToken())
      ? <Empty>
        <RegisterHeader/>
        <main>
          <span>{ll('您未登录,请先登录')}</span>
          <Button
              fullWidth
              variant={'contained'}
              color={'secondary'}
              onClick={actionsMe.toLogin}
          >{ll('登录')}</Button>
        </main>
      </Empty>
      : others
}
