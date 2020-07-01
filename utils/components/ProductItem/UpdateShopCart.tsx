import {Button, Dialog, DialogContent, DialogTitle, TextField} from '@material-ui/core'
import React from 'react'
import {ls} from '../../tools/dealKey'
import {dialogModelFactory} from '../../commonModel/dialog'
import {useStoreModel} from '../../ModelAction/useStore'
import {mergeTwoModel, modelFactory} from '../../ModelAction/modelUtil'
import {setForm} from '../../tools/commonAction'
import styled from 'styled-components'

export const updateShopCartModel = mergeTwoModel(dialogModelFactory('UpdateShopCartModel', {}), modelFactory('update', {
  form: {
    num: 1,
  },
}, {
  setForm: setForm,
}))

const Footer = styled.div`
  padding-top: 8px;
  text-align: right;
`

export const UpdateShopCart = () => {
  const {actions: actionsUpdateShopCartModel, state: stateUpdateShopCartModel} = useStoreModel(updateShopCartModel)
  return <Dialog
      open={stateUpdateShopCartModel.open}
      onClose={actionsUpdateShopCartModel.onClose}
  >
    <DialogTitle>{ls('添加数量')}</DialogTitle>
    <DialogContent>
      <TextField
          type={'number'}
          value={stateUpdateShopCartModel.form.num}
          onChange={event => actionsUpdateShopCartModel.setForm(['num', event.target.value])}
      />
      <Footer>
        <Button
            variant={'contained'}
            color={'secondary'}
            onClick={() => {
              stateUpdateShopCartModel.openResolve({
                num: stateUpdateShopCartModel.form.num,
              })
              actionsUpdateShopCartModel.onClose()
            }}
        >{ls('确定')}</Button>
      </Footer>
    </DialogContent>
  </Dialog>
}
