import Router from 'next/router'
import {fpMergePre, fpSetPre} from '../../tools/utils'
import {User, UserInRegister} from '../../graphqlTypes/types'
import {setToken} from '../../tools/token'
import {showMessage} from '../../components/Message/Message'
import {doc} from '../../graphqlTypes/doc'
import {modelFactory} from '../../ModelAction/modelUtil'
import { ls } from '../../tools/dealKey'

export const registerModel = modelFactory('register', {
  step: 0,
  userForm: {
    name: '',
    password: '',
    confirmPassword: '',
    userInfo: {
      name: '',
      email: '',
      phone: '',
    },
  } as User & { confirmPassword?: string },
}, {
  setStep: (value: number, option) => option.setData(fpMergePre({step: value})),
  setUserForm: ([path, value], option) => {
    option.setData(fpSetPre(`userForm.${path}`, value))
  },
  goNext: (value, option) => {
    if (!option.data?.userForm?.name || !option.data?.userForm?.password || !option.data?.userForm?.confirmPassword) {
      showMessage(ls('请填写表单'))
      return
    }
    if (option.data?.userForm?.password !== option.data?.userForm?.confirmPassword) {
      showMessage(ls('两次密码输入不一致'))
      return
    }
    option.setData(fpMergePre({
      step: 1,
    }))
  },
  submit: async (value, option) => {
    const userInfo = option.data.userForm?.userInfo || {}
    if (!userInfo.phone || !userInfo.email) {
      showMessage(ls('请填写表单'))
      return
    }
    const {confirmPassword, ...params} = option.data.userForm
    const res = await option.mutate(doc.registerUser, {
      data: {
        ...params,
        userInfo: {
          ...params.userInfo,
          name: params.name,
        },
      },
    })
    const registerUser = res?.registerUser as UserInRegister
    if (registerUser?.user?.id) {
      showMessage(ls('注册成功,即将登录'))
      setToken(registerUser.token as string)
      setToken(registerUser.refreshtoken as string, 'refreshtoken')
      await Router.replace(`/home`, `/home`, {shallow: true})
    }
  },
  goToSignup: (value, option) => {
    Router.push('/login')
  },
})
