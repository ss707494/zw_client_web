import React from 'react'
import {mpStyle} from '../../../../style/common'
import styled from 'styled-components'
import {MeLayoutBox} from '../components/meLayoutBox'
import {Button, Divider} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import {ls} from '../../../../tools/dealKey'
import {BaseField} from '../components/BaseField'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {UpdateMyInfoModel, useUpdateMyInfoInit} from '../../../m/me/myInfo/updateMyInfo'
import {fpMergePre} from '../../../../tools/utils'
import {meModel} from '../../../m/me/model'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../graphqlTypes/doc'
import {updatePasswordModel} from '../../../m/me/myInfo/updatePassword'

const TopTitle = styled('div')`
  ${mpStyle.fontType.l};
`
const FormBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 240px);
  grid-column-gap: 60px;
  grid-row-gap: 24px;
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

  return <MeLayoutBox>
    <TopTitle>{ls('个人资料')}</TopTitle>
    <Space h={mpStyle.space.s}/>
    <Divider/>
    <Space h={mpStyle.space.s}/>
    <FormBox>
      <BaseField
          readonly={!statePcMyInfoModel.isEditInfo}
          label={ls('姓名')}
          value={stateUpdateMyInfoModel.form.name}
          onChange={event => actionsUpdateMyInfoModel.setForm(['name', event.target.value])}
      />
      <BaseField
          readonly={!statePcMyInfoModel.isEditInfo}
          label={ls('电话')}
          value={stateUpdateMyInfoModel.form.phone}
          onChange={event => actionsUpdateMyInfoModel.setForm(['phone', event.target.value])}
      />
      <BaseField
          readonly={!statePcMyInfoModel.isEditInfo}
          label={ls('邮箱')}
          value={stateUpdateMyInfoModel.form.email}
          onChange={event => actionsUpdateMyInfoModel.setForm(['email', event.target.value])}
      />
      <div>
        {(statePcMyInfoModel.isEditInfo && <>
          <ButtonLoad
              variant={'outlined'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={() => {
                actionsPcMyInfoModel.setEditInfo(false)
                initForm()
              }}
          >{ls('取消')}</ButtonLoad>
          <Space w={mpStyle.space.s}/>
          <ButtonLoad
              variant={'contained'}
              color={'secondary'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={async () => {
                const res = await actionsUpdateMyInfoModel.submit()
                if (res?.updateUserInfo?.id) {
                  actionsMe.getLoginUser()
                  actionsPcMyInfoModel.setEditInfo(false)
                }
              }}
          >{ls('保存')}</ButtonLoad>
        </>)
        || <Button
            variant={'outlined'}
            onClick={() => actionsPcMyInfoModel.setEditInfo(true)}
        >{ls('编辑')}</Button>
        }
      </div>
    </FormBox>
    <Space h={mpStyle.space.s}/>
    <TopTitle>{ls('账户资料')}</TopTitle>
    <Space h={mpStyle.space.s}/>
    <Divider/>
    <Space h={mpStyle.space.s}/>
    <FormBox>
      {(!statePcMyInfoModel.isEditPass && <>
        <BaseField
            readonly={true}
            label={ls('达人账号名')}
            value={stateMeModel.user.name}
        />
        <BaseField
            readonly={true}
            label={ls('密码')}
            value={'*******'}
        />
        <div/>
        <Button
            variant={'outlined'}
            onClick={() => actionsPcMyInfoModel.setEditPass(true)}
        >{ls('编辑')}</Button>
      </>)
      || <>
        <BaseField
            readonly={true}
            label={ls('达人账号名')}
            value={stateMeModel.user.name}
        />
        <div/>
        <div/>
        <BaseField
            label={ls('原始密码')}
            type={'password'}
            value={stateUpdatePasswordModel.form.oldPassword}
            onChange={event => actionsUpdatePasswordModel.setForm(['oldPassword', event.target.value])}
        />
        <div/>
        <div/>
        <BaseField
            label={ls('新密码')}
            type={'password'}
            value={stateUpdatePasswordModel.form.newPassword}
            onChange={event => actionsUpdatePasswordModel.setForm(['newPassword', event.target.value])}
        />
        <BaseField
            label={ls('确认密码')}
            type={'password'}
            value={stateUpdatePasswordModel.form.confirmPassword}
            onChange={event => actionsUpdatePasswordModel.setForm(['confirmPassword', event.target.value])}
        />
        <div/>
        <div>
          <ButtonLoad
              variant={'outlined'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={() => {
                actionsPcMyInfoModel.setEditPass(false)
                actionsUpdatePasswordModel.clearForm()
              }}
          >{ls('取消')}</ButtonLoad>
          <Space w={mpStyle.space.s}/>
          <ButtonLoad
              variant={'contained'}
              color={'secondary'}
              loading={getLoad(doc.updateUserInfo)}
              onClick={async () => {
                const res = await actionsUpdatePasswordModel.submit()
                if (res?.updatePassword?.id) {
                  actionsMe.getLoginUser()
                  actionsPcMyInfoModel.setEditPass(false)
                }
              }}
          >{ls('保存')}</ButtonLoad>
        </div>
      </>
      }
    </FormBox>

  </MeLayoutBox>
}
