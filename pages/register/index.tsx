import React from 'react'
import {ls} from '../../utils/tools/dealKey'
import {mpStyle} from '../../utils/style/common'
import {useStoreModel} from '../../utils/ModelAction/useStore'
import styled from 'styled-components'
import {registerModel} from './model'
import {Button, ButtonProps, TextField} from '@material-ui/core'
import {TextFieldProps} from '@material-ui/core/TextField/TextField'

const Box = styled.div`
  padding: 0 20px;
`
const Header = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 30px 30px 50px;
  margin-bottom: 40px;
  > img {
    width: 32px;
    height: 56px;
    grid-area: 1/1/3/2;
    padding-right: 10px;
  }
  > header {
    font-size: 20px;
    align-self: end;
  }
  > footer {
    font-size: 20px;
    font-weight: bold;
    color: ${mpStyle.red};
  }
  > main {
    grid-area: 3/1/4/3;
    font-size: 24px;
    font-weight: bold;
    align-self: end;
  }
`
const Tab = styled.div`
  font-size: 22px;
`
const Nav = styled.div`
  margin: 8px 0;
  display: flex;
  font-size: 12px;
`
const NavSection = styled('section')<{isAct?: boolean}>`
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

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
`
const TextInput = styled(TextField).attrs(props => ({
  fullWidth: true,
}))<TextFieldProps>`
`
const SubButton = styled(Button)<ButtonProps>`
  &&& {
    margin-top: 20px;
  }
`

export default function () {
  const {state: rState, actions: rActions} = useStoreModel(registerModel)

  return (
      <Box>
        <Header>
          <img
              src={'/img/home/logo.png'}
              alt=""/>
          <header>{ls('Market')}</header>
          <footer>{ls('Payless')}</footer>
          <main>{ls('欢迎来到马佩莱超市')}</main>
        </Header>
        <Tab>{ls('注册')}</Tab>
        <Nav>
          <NavSection
              isAct={rState.step === 0}
          >{ls('填写登录信息')}</NavSection>
          <NavSection
              isAct={rState.step === 1}
          >{ls('填写联系信息,完成注册')}</NavSection>
        </Nav>
        <section style={{height: '10px'}}/>
        <Label>{ls('新建账号')}</Label>
        <TextInput
            value={rState.userForm.name}
            onChange={event => rActions.setUserForm(['name', event.target.value])}
        />
        <Label>{ls('设置密码')}</Label>
        <TextInput
            type="password"
            value={rState.userForm.password}
            onChange={event => rActions.setUserForm(['password', event.target.value])}
        />
        <Label>{ls('确认密码')}</Label>
        <TextInput
            type="password"
            value={rState.userForm.confirmPassword}
            onChange={event => rActions.setUserForm(['confirmPassword', event.target.value])}
        />
        <SubButton
            size={'large'}
            color={'secondary'}
            variant={'contained'}
            fullWidth
            onClick={() => {rActions.goNext()}}
        >下一步</SubButton>
        <Button
            style={{marginTop: '10px'}}
            size={'small'}
            color={'secondary'}
            variant={'text'}
        >账号密码登录</Button>
      </Box>
  )
}
