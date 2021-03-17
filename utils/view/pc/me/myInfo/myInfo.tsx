import React from 'react'
import {mpStyle} from '../../../../style/common'
import styled from 'styled-components'
import {MeLayoutBox} from '../components/meLayoutBox'
import {Button, Divider} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import {ll} from '../../../../tools/dealKey'
import {BaseField} from '../components/BaseField'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {UpdateMyInfoModel, useUpdateMyInfoInit} from '../../../m/me/myInfo/updateMyInfo'
import {fpMergePre} from '../../../../tools/utils'
import {meModel} from '../../../m/me/model'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../graphqlTypes/doc'
import {updatePasswordModel, useInitUpdatePasswordModel} from '../../../m/me/myInfo/updatePassword'
import {FormValideErrObjEnum} from '../../../../tools/formValide'

const TopTitle = styled('div')`
  ${mpStyle.fontType.l};
  display: grid;
  grid-template-columns: 1fr max-content;

  &&& {
    .MuiButton-root {
      width: 95px;
      height: 27px;
      border-radius: 19px;
      color: ${mpStyle.red};
      border: 1px solid ${mpStyle.red};
    }
  }
`
const FormBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 240px);
  grid-column-gap: 60px;
  grid-row-gap: 24px;
`
const SubmitButtons = styled.div`
  &&& {
    .MuiButton-root {
      width: 215px;
      height: 50px;
      border-radius: 8px;
    }
  }
`

export const PcMyInfoModel = modelFactory('PcMyInfoModel', {
  isEditInfo: false,
  isEditPass: false,
}, {
  setEditInfo: async (value: boolean, option) => option.setData(fpMergePre({isEditInfo: value})),
  setEditPass: async (value: boolean, option) => option.setData(fpMergePre({isEditPass: value})),
})

export const PcMyInfo = () => {
  const {actions: actionsPcMyInfoModel, state: statePcMyInfoModel} = useStoreModel(PcMyInfoModel)
  const {actions: actionsUpdateMyInfoModel, state: stateUpdateMyInfoModel, getLoad} = useStoreModel(UpdateMyInfoModel)
  const {state: stateUpdatePasswordModel, actions: actionsUpdatePasswordModel} = useStoreModel(updatePasswordModel)
  const {actions: actionsMe, state: stateMeModel} = useStoreModel(meModel)
  const {initForm} = useUpdateMyInfoInit()
  useInitUpdatePasswordModel()

  console.log(stateUpdatePasswordModel.formValideErrObj?.['newPassword'])

  return <MeLayoutBox>
    <TopTitle>
      {ll('个人资料')}
      {!statePcMyInfoModel.isEditInfo && <Button
          variant={'outlined'}
          onClick={() => actionsPcMyInfoModel.setEditInfo(true)}
      >{ll('编辑')}</Button>}
    </TopTitle>
    <Space h={mpStyle.space.xs}/>
    <Divider/>
    <Space h={mpStyle.space.s}/>
    <FormBox>
      <BaseField
          readonly={!statePcMyInfoModel.isEditInfo}
          label={ll('姓名')}
          value={stateUpdateMyInfoModel.form.name}
          onChange={event => actionsUpdateMyInfoModel.setForm(['name', event.target.value])}
          {...stateUpdateMyInfoModel[FormValideErrObjEnum].name}
      />
      <BaseField
          readonly={!statePcMyInfoModel.isEditInfo}
          label={ll('电话')}
          value={stateUpdateMyInfoModel.form.phone}
          onChange={event => actionsUpdateMyInfoModel.setForm(['phone', event.target.value])}
          {...stateUpdateMyInfoModel[FormValideErrObjEnum].phone}
      />
      <BaseField
          readonly={!statePcMyInfoModel.isEditInfo}
          label={ll('邮箱')}
          value={stateUpdateMyInfoModel.form.email}
          onChange={event => actionsUpdateMyInfoModel.setForm(['email', event.target.value])}
          {...stateUpdateMyInfoModel[FormValideErrObjEnum].email}
      />
      <SubmitButtons
          style={{gridArea: '2/1/3/3', alignSelf: 'start'}}
      >
        {(statePcMyInfoModel.isEditInfo && <>
          <ButtonLoad
              variant={'outlined'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={() => {
                actionsPcMyInfoModel.setEditInfo(false)
                initForm()
              }}
          >{ll('取消')}</ButtonLoad>
          <Space w={mpStyle.space.s}/>
          <ButtonLoad
              variant={'contained'}
              color={'secondary'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={async () => {
                if (await actionsUpdateMyInfoModel.formValide()) return
                const res = await actionsUpdateMyInfoModel.submit()
                if (res?.updateUserInfo?.id) {
                  actionsMe.getLoginUser()
                  actionsPcMyInfoModel.setEditInfo(false)
                }
              }}
          >{ll('保存')}</ButtonLoad>
        </>)
        }
      </SubmitButtons>
    </FormBox>
    <Space h={mpStyle.space.s}/>
    <TopTitle>
      {ll('账户资料')}
      {!statePcMyInfoModel.isEditPass && <Button
          variant={'outlined'}
          onClick={() => actionsPcMyInfoModel.setEditPass(true)}
      >{ll('编辑')}</Button>}
    </TopTitle>
    <Space h={mpStyle.space.xs}/>
    <Divider/>
    <Space h={mpStyle.space.s}/>
    <FormBox>
      {(!statePcMyInfoModel.isEditPass && <>
        <BaseField
            readonly={true}
            label={ll('达人账号名')}
            value={stateMeModel.user.name}
        />
        <BaseField
            readonly={true}
            label={ll('密码')}
            value={'*******'}
        />
        <div/>
      </>)
      || <>
        <BaseField
            readonly={true}
            label={ll('达人账号名')}
            value={stateMeModel.user.name}
        />
        <div/>
        <div/>
        <BaseField
            label={ll('原始密码')}
            type={'password'}
            value={stateUpdatePasswordModel.form.oldPassword}
            onChange={event => actionsUpdatePasswordModel.setForm(['oldPassword', event.target.value])}
            {...stateUpdatePasswordModel.formValideErrObj?.['oldPassword']}
        />
        <div/>
        <div/>
        <BaseField
            label={ll('新密码')}
            type={'password'}
            value={stateUpdatePasswordModel.form.newPassword}
            onChange={event => actionsUpdatePasswordModel.setForm(['newPassword', event.target.value])}
            {...stateUpdatePasswordModel.formValideErrObj?.['newPassword']}
        />
        <BaseField
            label={ll('确认密码')}
            type={'password'}
            value={stateUpdatePasswordModel.form.confirmPassword}
            onChange={event => actionsUpdatePasswordModel.setForm(['confirmPassword', event.target.value])}
            {...stateUpdatePasswordModel.formValideErrObj?.['confirmPassword']}
        />
        <div/>
        <SubmitButtons
            style={{gridArea: '4/1/5/3', alignSelf: 'start'}}
        >
          <ButtonLoad
              variant={'outlined'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={() => {
                actionsPcMyInfoModel.setEditPass(false)
                actionsUpdatePasswordModel.clearForm()
              }}
          >{ll('取消')}</ButtonLoad>
          <Space w={mpStyle.space.s}/>
          <ButtonLoad
              variant={'contained'}
              color={'secondary'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={async () => {
                if (await actionsUpdatePasswordModel.formValide()) return
                const res = await actionsUpdatePasswordModel.submit()
                if (res?.updatePassword?.id) {
                  actionsMe.getLoginUser()
                  actionsPcMyInfoModel.setEditPass(false)
                }
              }}
          >{ll('保存')}</ButtonLoad>
        </SubmitButtons>
      </>
      }
    </FormBox>

  </MeLayoutBox>
}
