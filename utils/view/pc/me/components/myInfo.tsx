import React, {useEffect} from 'react'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {meModel} from '../../../m/me/model'
import {Avatar, AvatarProps} from '@material-ui/core'
import styled from 'styled-components'
import {dealMaybeNumber} from '../../../../tools/utils'
import {ll} from '../../../../tools/dealKey'
import {yellow} from '@material-ui/core/colors'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'

const Box = styled.div`
  display: grid;
  grid-template-columns: 100px 120px 120px;
  grid-template-rows: 50px 50px;
`
const AvatarBox = styled(Avatar)<AvatarProps>`
  &&& {
    grid-area: 1/1/3/2;
    align-self: center;
    justify-self: center;
    width: 66px;
    height: 66px;
  }
`
const Name = styled.div`
  grid-area: 1/2/2/4;
  align-self: center;
`
const Coin = styled.div`
  display: flex;
  align-items: center;
`

export const MyInfo = () => {
  const {state: stateMeModel, actions: actionsMeModel} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMeModel.user.id) {
      actionsMeModel.getLoginUser()
    }
  }, [])

  return <Box>
    <AvatarBox/>
    <Name>{stateMeModel.user.userInfo?.name}</Name>
    <Coin>
      <MonetizationOnIcon style={{color: yellow[700]}}/>
      <Space w={mpStyle.space.xxs}/>
      <section>
        <main>{dealMaybeNumber(stateMeModel.user.orderCoinCurrentMonth)}</main>
        <footer>{ll('当月达人币')}</footer>
      </section>
    </Coin>
    <Coin>
      <MonetizationOnIcon style={{color: yellow[700]}}/>
      <Space w={mpStyle.space.xxs}/>
      <section>
        <main>{dealMaybeNumber(stateMeModel.user.orderCoinNextMonth)}</main>
        <footer>{ll('下月达人币')}</footer>
      </section>
    </Coin>
  </Box>
}
