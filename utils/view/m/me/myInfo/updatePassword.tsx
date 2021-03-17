import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {SigninInput} from '../../register'
import {ll} from '../../../../tools/dealKey'
import {mergeTwoModel, modelFactory} from '../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../tools/utils'
import styled from 'styled-components'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../graphqlTypes/doc'
import {showMessage} from '../../../../components/Message/Message'
import router from 'next/router'
import {setToken} from '../../../../tools/token'
import {setForm} from '../../../../tools/commonAction'
import {FormValideBaseModel} from '../../../../tools/formValide'

export const updatePasswordModel = mergeTwoModel(FormValideBaseModel, modelFactory('updatePasswordModel', {
  form: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
}, {
  setForm: setForm,
  clearForm: (value, option) => {
    option.setData(fpMergePre({
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }))
  },
  submit: async (value, option) => {
    const form = option.data.form
    if (!form.oldPassword || !form.newPassword) {
      return showMessage('请填写表单')
    }
    if (form.newPassword !== form.confirmPassword) {
      return showMessage('两次密码不一致')
    }
    const res = await option.mutate(doc.updatePassword, {
      data: form,
    })
    if (res?.updatePassword?.user?.id) {
      setToken(res.updatePassword?.authBody?.token)
      setToken(res.updatePassword?.authBody?.refreshtoken, 'refreshtoken')
      showMessage('操作成功')
    }
    return res
  },
}))

export const FieldContain = styled.div`
  padding: 0 22px;
  &&& {
    .MuiFormControl-root {
      margin-top: 10px;
    }
  }
`

export const useInitUpdatePasswordModel = () => {
  const { actions: actionsUpdatePasswordModel} = useStoreModel(updatePasswordModel)
  useEffect(() => {
    actionsUpdatePasswordModel.initFormValide({
      rules: [
        {
          key: 'oldPassword',
          name: '原始密码',
        },
        {
          key: 'newPassword',
          name: '新密码',
        },
        {
          key: 'confirmPassword',
          name: '确认密码',
        },
      ]
    })
  }, [actionsUpdatePasswordModel])
}

export const UpdatePassword = () => {
  const {state: stateUpdatePasswordModel, actions: actionsUpdatePasswordModel} = useStoreModel(updatePasswordModel)
  useInitUpdatePasswordModel()

  return <div>
    <HeaderTitle
        title={'修改密码'}
        backCall={actionsUpdatePasswordModel.clearForm}
    />
    <FieldContain>
      <SigninInput
          label={ll('原始密码')}
          type={'password'}
          value={stateUpdatePasswordModel.form.oldPassword}
          onChange={event => actionsUpdatePasswordModel.setForm(['oldPassword', event.target.value])}
          {...stateUpdatePasswordModel.formValideErrObj?.['oldPassword']}
      />
      <SigninInput
          label={ll('新密码')}
          type={'password'}
          value={stateUpdatePasswordModel.form.newPassword}
          onChange={event => actionsUpdatePasswordModel.setForm(['newPassword', event.target.value])}
          {...stateUpdatePasswordModel.formValideErrObj?.['newPassword']}
      />
      <SigninInput
          label={ll('确认密码')}
          type={'password'}
          value={stateUpdatePasswordModel.form.confirmPassword}
          onChange={event => actionsUpdatePasswordModel.setForm(['confirmPassword', event.target.value])}
          {...stateUpdatePasswordModel.formValideErrObj?.['confirmPassword']}
      />
      <ButtonLoad
          style={{marginTop: '20px'}}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={async () => {
            if (await actionsUpdatePasswordModel.formValide()) return
            const res = await actionsUpdatePasswordModel.submit()
            if (res?.updatePassword?.user?.id) {
              actionsUpdatePasswordModel.clearForm()
              router.back()
            }
          }}
      >{ll('保存')}</ButtonLoad>
    </FieldContain>
  </div>
}
