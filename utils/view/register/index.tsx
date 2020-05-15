import React from 'react'
import styled from 'styled-components'
import {registerModel} from './model'
import {Button, ButtonProps, TextField} from '@material-ui/core'
import {TextFieldProps} from '@material-ui/core/TextField/TextField'
import {mpStyle} from '../../style/common'
import {useStoreModel} from '../../ModelAction/useStore'
import {RegisterHeader} from '../../components/common/RegisterHeader/RegisterHeader'
import { ls } from '../../tools/dealKey'
import {Box} from '../../components/common/Box/Box'

const Tab = styled.div`
  font-size: 22px;
`
const Nav = styled.div`
  margin: 8px 0;
  display: flex;
  font-size: 12px;
`
const NavSection = styled('section')<{ isAct?: boolean }>`
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  height: 26px;
  color: ${({isAct}) => isAct ? '#fff' : mpStyle.red};
  background: ${({isAct}) => isAct ? 'url("/img/home/back_red.png")' : 'url("/img/home/back_grey.png")'} no-repeat;
  background-size: 99% 26px;
`

export const SigninLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
`
export const SigninInput = styled(TextField).attrs(props => ({
  fullWidth: true,
}))<TextFieldProps>`
`
export const SigninSubButton = styled(Button)<ButtonProps>`
  &&& {
    margin-top: 20px;
  }
`

export default function Register() {
  const {state: rState, actions: rActions} = useStoreModel(registerModel)

  return (
      <Box>
        <RegisterHeader/>
        <Tab>{ls('注册')}</Tab>
        <Nav>
          <NavSection
              isAct={rState.step >= 0}
          >{ls('填写登录信息')}</NavSection>
          <NavSection
              isAct={rState.step >= 1}
          >{ls('填写联系信息,完成注册')}</NavSection>
        </Nav>
        <section style={{height: '10px'}}/>
        {rState.step === 0 && <>
          <SigninLabel>{ls('新建账号')}</SigninLabel>
          <SigninInput
              value={rState.userForm.name}
              onChange={event => rActions.setUserForm(['name', event.target.value])}
          />
          <SigninLabel>{ls('设置密码')}</SigninLabel>
          <SigninInput
              type="password"
              value={rState.userForm.password}
              onChange={event => rActions.setUserForm(['password', event.target.value])}
          />
          <SigninLabel>{ls('确认密码')}</SigninLabel>
          <SigninInput
              type="password"
              value={rState.userForm.confirmPassword}
              onChange={event => rActions.setUserForm(['confirmPassword', event.target.value])}
          />
          <SigninSubButton
              size={'large'}
              color={'secondary'}
              variant={'contained'}
              fullWidth
              onClick={() => {
                rActions.goNext()
              }}
          >下一步</SigninSubButton>
          <Button
              style={{marginTop: '10px'}}
              size={'small'}
              color={'secondary'}
              variant={'text'}
              onClick={() => {
                rActions.goToSignup()
              }}
          >账号密码登录</Button>
        </>}
        {rState.step === 1 && <>
          <SigninLabel>{ls('用户名昵称')}</SigninLabel>
          <SigninInput
              value={rState.userForm.userInfo?.name}
              onChange={event => rActions.setUserForm(['userInfo.name', event.target.value])}
          />
          <SigninLabel>{ls('手机号码')}</SigninLabel>
          <SigninInput
              value={rState.userForm.userInfo?.phone}
              onChange={event => rActions.setUserForm(['userInfo.phone', event.target.value])}
          />
          <SigninLabel>{ls('邮箱地址')}</SigninLabel>
          <SigninInput
              value={rState.userForm.userInfo?.email}
              onChange={event => rActions.setUserForm(['userInfo.email', event.target.value])}
          />
          <SigninSubButton
              size={'large'}
              color={'secondary'}
              variant={'contained'}
              fullWidth
              onClick={() => {
                rActions.submit()
              }}
          >{ls('确认并登陆')}</SigninSubButton>
          <Button
              style={{marginTop: '10px'}}
              size={'small'}
              color={'secondary'}
              variant={'text'}
              onClick={() => {
                rActions.goToSignup()
              }}
          >账号密码登录</Button>
        </>}
      </Box>
  )
}
