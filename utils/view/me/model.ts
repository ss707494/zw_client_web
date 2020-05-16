import Router from 'next/router'
import {User} from '../../graphqlTypes/types'
import {fpMergePre} from '../../tools/utils'
import {setToken} from '../../tools/token'
import {doc} from '../../graphqlTypes/doc'
import {modelFactory} from '../../ModelAction/modelUtil'

const toLogin = async () => {
  await Router.push('/login')
}
export const meModel = modelFactory('meModel', {
  user: {} as User,
}, {
  getLoginUser: async (value, option) => {
    const res = (await option.query(doc.oneUser))?.oneUser as User
    option.setData(fpMergePre({
      user: res,
    }))
  },
  logout: async (value, option) => {
    setToken('')
    setToken('', 'refreshtoken')
    await toLogin()
  },
  toLogin: value => {
    toLogin()
  }
})
