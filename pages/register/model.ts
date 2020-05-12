import {modelFactory} from '../../utils/ModelAction/modelUtil'
import {User} from '../../utils/graphqlTypes/types'
import {fpMergePre, fpSetPre} from '../../utils/tools/utils'
import {originStore} from '../../utils/ModelAction/useStore'

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
      console.log(option.store)
      console.log(originStore)
      option.store['messageModel'].actions.open('sd')
      return
    }
  },
})
