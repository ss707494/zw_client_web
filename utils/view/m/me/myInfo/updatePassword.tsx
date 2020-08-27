import React from 'react'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {SigninInput} from '../../register'
import {ls} from '../../../../tools/dealKey'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../tools/utils'
import styled from 'styled-components'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../graphqlTypes/doc'
import {showMessage} from '../../../../components/Message/Message'
import router from 'next/router'
import {setToken} from '../../../../tools/token'
import {setForm} from '../../../../tools/commonAction'

const updatePasswordModel = modelFactory('updatePasswordModel', {
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

})

export const FieldContain = styled.div`
  padding: 0 22px;
  ${SigninInput} {
    margin-top: 10px;
  }
`

export const UpdatePassword = () => {
  const {state: stateUPM, actions: actionsUPM} = useStoreModel(updatePasswordModel)

  return <div>
    <HeaderTitle
        title={'修改密码'}
        backCall={actionsUPM.clearForm}
    />
    <FieldContain>
      <SigninInput
          label={ls('原始密码')}
          type={'password'}
          value={stateUPM.form.oldPassword}
          onChange={event => actionsUPM.setForm(['oldPassword', event.target.value])}
      />
      <SigninInput
          label={ls('新密码')}
          type={'password'}
          value={stateUPM.form.newPassword}
          onChange={event => actionsUPM.setForm(['newPassword', event.target.value])}
      />
      <SigninInput
          label={ls('确认密码')}
          type={'password'}
          value={stateUPM.form.confirmPassword}
          onChange={event => actionsUPM.setForm(['confirmPassword', event.target.value])}
      />
      <ButtonLoad
          style={{marginTop: '20px'}}
          variant={'contained'}
          color={'secondary'}
          fullWidth
          onClick={async () => {
            const res = await actionsUPM.submit()
            if (res?.updatePassword?.user?.id) {
              actionsUPM.clearForm()
              router.back()
            }
          }}
      >{ls('保存')}</ButtonLoad>
    </FieldContain>
  </div>
}
