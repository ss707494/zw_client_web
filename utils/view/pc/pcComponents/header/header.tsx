import styled from 'styled-components'
import React from 'react'
import {ll} from '../../../../tools/dealKey'
import {Button, Divider} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'


const HeaderBox = styled.div`
  width: 100%;
  height: 60px;
  background: #0D0D21;
  display: grid;
  align-items: center;
  justify-items: center;
`
const ContentBox = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: max-content 1fr 360px;
  color: white;
  align-items: center;
`
const Welcome = styled.div`
  ${mpStyle.fontType.s};
  color: #FFFFFF;
`

const Center = styled.div`
  &&& {
    .MuiButtonBase-root {
      width: 80px;
      height: 28px;
      background: #F84033;
      border-radius: 4px;
      ${mpStyle.fontType.s};
      font-weight: 600;
      color: #FFFFFF;
      padding: 0;
    }
  }
`
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const PcHeader = () => {

  return <HeaderBox>
    <ContentBox>
      <Welcome>{ll('晚上好, 欢迎来到马佩莱超市!')}</Welcome>
      <Center>
        <Space
            w={20}
        />
        <Button
            variant={'contained'}
            color={'secondary'}
        >{ll('登录/注册')}</Button>
      </Center>
      <Right>
        <Button
            variant={'text'}
            color={'inherit'}
        >{ll('帮助中心')}</Button>
        <Space w={22}/>
        <Divider
            style={{height: '16px', alignSelf: 'center'}}
            light={true}
            flexItem={true}
            orientation={'vertical'}/>
        <Space w={22}/>
        <Button
            variant={'text'}
            color={'inherit'}
        >{ll('掌上超市')}</Button>
      </Right>
    </ContentBox>
  </HeaderBox>
}
