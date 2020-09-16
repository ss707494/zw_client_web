import styled from 'styled-components'
import React from 'react'
import { ls } from '../../../../tools/dealKey'
import {Button, Divider} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'


const HeaderBox = styled.div`
  width: 100%;
  height: 64px;
  background: #0D0D21;
  display: grid;
  grid-template-columns: 360px 1fr 480px;
  color: white;
  align-items: center;
`
const Welcome = styled.div`
  justify-self: end;
`
const Center = styled.div`
`
const Right = styled.div`
  display: flex;
`
export const PcHeader = () => {

  return <HeaderBox>
    <Welcome>{ls('晚上好, 欢迎来到马佩莱超市!')}</Welcome>
    <Center>
      <Space
          w={32}
      />
      <Button
          variant={'contained'}
          color={'secondary'}
      >{ls('登录/注册')}</Button>
    </Center>
    <Right>
      <Button
          variant={'text'}
          color={'inherit'}
      >{ls('个人中心')}</Button>
      <Space w={48} />
      <Button
          variant={'text'}
          color={'inherit'}
      >{ls('帮助中心')}</Button>
      <Space w={22} />
      <Divider
          style={{height: '16px', alignSelf: 'center'}}
          light={true}
          flexItem={true}
          orientation={'vertical'} />
      <Space w={22} />
      <Button
          variant={'text'}
          color={'inherit'}
      >{ls('掌上超市')}</Button>
    </Right>
  </HeaderBox>
}
