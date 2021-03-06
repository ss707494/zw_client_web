import Router from 'next/router'
import {fpSetPre} from '../../../tools/utils'
import {setToken} from '../../../tools/token'
import {showMessage} from '../../../components/Message/Message'
import {doc} from '../../../graphqlTypes/doc'
import {UserItemInput} from '../../../graphqlTypes/types'
import {modelFactory} from '../../../ModelAction/modelUtil'
import { ll } from '../../../tools/dealKey'

export const loginModel = modelFactory('loginModel', {
  form: {
    name: '',
    password: '',
  } as UserItemInput,
}, {
  setForm: ([path, value], option) => {
    option.setData(fpSetPre(`form.${path}`, value))
  },
  login: async (value, option) => {
    const form = option.data.form
    if (!form?.name || !form?.password) {
      return showMessage(ll('请填写表单'))
    }
    const res = await option.query(doc.login, {
      data: {...form}
    })
    if (res?.login?.token) {
      setToken(res?.login?.token)
      setToken(res?.login?.refreshtoken, 'refreshtoken')
      await Router.push('/m/home')
    }
  },
  goToSignin: async (value, option) => {
    await Router.push('/m/register')
  },
  goHome: async (value, option) => {
    await Router.push('/m/home/[appModule]', '/m/home/categorySelection')
  },
})
