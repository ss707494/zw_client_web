import {dialogModelFactory} from '../../../../commonModel/dialog'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Button, Dialog, DialogContent, TextField} from '@material-ui/core'
import React from 'react'
import {ls} from '../../../../tools/dealKey'
import {mergeTwoModel, modelFactory} from '../../../../ModelAction/modelUtil'
import {setForm} from '../../../../tools/commonAction'
import styled from 'styled-components'
import {showMessage} from '../../../../components/Message/Message'

export const inputPromoCodeModel = mergeTwoModel(dialogModelFactory('inputPromoCodeModel', (() => {}) as Function), modelFactory('input', {
  form: {
    promoCode: '',
  },
}, {
  setForm: setForm,
}))

const Footer = styled.div`
  padding-top: 8px;
  text-align: right;
`
export const InputPromoCodeDialog = () => {
  const {actions: actionsInputPromoCodeModel, state: stateInputPromoCodeModel} = useStoreModel(inputPromoCodeModel)
  return <Dialog
      open={stateInputPromoCodeModel.open}
      onClose={actionsInputPromoCodeModel.onClose}
  >
    <DialogContent>
      <TextField
          label={ls('请输入验证码')}
          value={stateInputPromoCodeModel.form.promoCode}
          onChange={event => actionsInputPromoCodeModel.setForm(['promoCode', event.target.value])}
      />
      <Footer>
        <Button
            variant={'contained'}
            color={'secondary'}
            onClick={async () => {
              const testRes = await stateInputPromoCodeModel.dialogData(stateInputPromoCodeModel.form.promoCode)
              if (testRes) {
                showMessage(testRes)
              } else {
                actionsInputPromoCodeModel.onClose()
                actionsInputPromoCodeModel.setForm(['promoCode', ''])
              }
            }}
        >{ls('确定')}</Button>
      </Footer>
    </DialogContent>
  </Dialog>
}
