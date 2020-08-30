import React, {useCallback, useEffect} from 'react'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {SigninInput} from '../../register'
import {ls} from '../../../../tools/dealKey'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import router from 'next/router'
import {FieldContain} from './updatePassword'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {UserInfo} from '../../../../graphqlTypes/types'
import {setForm} from '../../../../tools/commonAction'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {fpSetPre} from '../../../../tools/utils'
import { doc } from '../../../../graphqlTypes/doc'
import {meModel} from '../model'

const initForm = {
  name: '',
  phone: '',
  email: '',
}
export const UpdateMyInfoModel = modelFactory('UpdateMyInfo', {
  form: initForm as UserInfo,
}, {
  setForm: setForm,
  initForm: (value: UserInfo, option) => {
    option.setData(fpSetPre('form', value))
  },
  clearForm: (value, option) => {
    option.setData(fpSetPre('form', initForm))
  },
  submit: async (value, option) => {
    return option.mutate(doc.updateUserInfo, {
      userInfo: option.data.form,
    })
  },
})

export const UpdateMyInfo = () => {
  const {actions: actionsUpdateMyInfoModel, state: stateUpdateMyInfoModel} = useStoreModel(UpdateMyInfoModel)
  const {actions: actionsMeModel, state: stateMeModel} = useStoreModel(meModel)
  const {actions: actionsMe} = useStoreModel(meModel)

  const init = useCallback(async () => {
    const res = await actionsMeModel.getLoginUser()
    actionsUpdateMyInfoModel.initForm(res?.userInfo ?? initForm)
  }, [])
  useEffect(() => {
    if (!stateMeModel.user.id) {
      init()
    } else {
      actionsUpdateMyInfoModel.initForm(stateMeModel.user?.userInfo ?? initForm)
    }
  }, [])

  return <div>
    <HeaderTitle
        title={'编辑个人信息'}
    />
    <FieldContain>
      <SigninInput
          label={ls('姓名')}
          value={stateUpdateMyInfoModel.form.name}
          onChange={event => actionsUpdateMyInfoModel.setForm(['name', event.target.value])}
      />
      <SigninInput
          label={ls('电话')}
          value={stateUpdateMyInfoModel.form.phone}
          onChange={event => actionsUpdateMyInfoModel.setForm(['phone', event.target.value])}
      />
      <SigninInput
          label={ls('邮箱')}
          value={stateUpdateMyInfoModel.form.email}
          onChange={event => actionsUpdateMyInfoModel.setForm(['email', event.target.value])}
      />
      <ButtonLoad
          style={{marginTop: '20px'}}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={async () => {
            const res = await actionsUpdateMyInfoModel.submit()
            if (res?.updateUserInfo?.id) {
              actionsUpdateMyInfoModel.clearForm()
              actionsMe.getLoginUser()
              router.back()
            }
          }}
      >{ls('保存')}</ButtonLoad>
    </FieldContain>
  </div>
}
