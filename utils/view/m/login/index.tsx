import React from 'react'
import {useStoreModel} from '../../../ModelAction/useStore'
import {RegisterHeader} from '../../../components/RegisterHeader/RegisterHeader'
import {loginModel} from './model'
import {Box} from '../../../components/Box/Box'
import {ll} from '../../../tools/dealKey'
import {SigninInput, SigninLabel, SigninSubButton} from '../register'

export function Login() {
  const {state, actions} = useStoreModel(loginModel)

  return <Box>
    <RegisterHeader/>
    <section style={{height: '15vh'}}/>
    <SigninLabel>{ll('账号')}</SigninLabel>
    <SigninInput
        value={state.form.name}
        onChange={event => actions.setForm(['name', event.target.value])}
    />
    <SigninLabel>{ll('密码')}</SigninLabel>
    <SigninInput
        type={'password'}
        value={state.form.password}
        onChange={event => actions.setForm(['password', event.target.value])}
    />
    <SigninSubButton
        size={'large'}
        color={'secondary'}
        variant={'contained'}
        fullWidth
        onClick={() => {
          actions.login()
        }}
    >登录</SigninSubButton>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <SigninSubButton
          style={{marginTop: '10px'}}
          size={'small'}
          color={'secondary'}
          variant={'text'}
          onClick={() => {
            actions.goToSignin()
          }}
      >{ll('注册')}</SigninSubButton>
      {/*<SigninSubButton*/}
      {/*    style={{marginTop: '10px'}}*/}
      {/*    size={'small'}*/}
      {/*    color={'secondary'}*/}
      {/*    variant={'text'}*/}
      {/*    onClick={() => {*/}
      {/*      actions.goHome()*/}
      {/*    }}*/}
      {/*>{ls('游客访问')}</SigninSubButton>*/}
    </div>
  </Box>
}
