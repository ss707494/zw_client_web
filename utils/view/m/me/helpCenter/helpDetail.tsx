import {dialogModelFactory} from '../../../../commonModel/dialog'
import React from 'react'
import {Button, Dialog, DialogContent} from '@material-ui/core'
import {useStoreModel} from '../../../../ModelAction/useStore'
import styled from 'styled-components'
import { ll } from '../../../../tools/dealKey'

export const HelpDetailModel = dialogModelFactory('HelpDetail', {
  problem: '',
  answer: '',
  id: '',
  sort: 0,
})
const Header = styled.div`
  font-size: large;
  font-weight: bold;
`
const Content = styled.div`
  padding: 16px 0 32px;
`
const Foot = styled.div`
`
export const HelpDetail = () => {
  const {actions: actionsHelpDetailModel, state: stateHelpDetailModel} = useStoreModel(HelpDetailModel)

  return <Dialog
      open={stateHelpDetailModel.open}
      onClose={actionsHelpDetailModel.onClose}
  >
    <DialogContent>
      <Header>{stateHelpDetailModel.dialogData?.problem}</Header>
      <Content>{stateHelpDetailModel.dialogData?.answer}</Content>
      <Foot>
        <Button
            variant={'contained'}
            fullWidth={true}
            color={'secondary'}
            onClick={() => {
              stateHelpDetailModel.openResolve({ss: 123})
              actionsHelpDetailModel.onClose()
            }}
        >{ll('知道了')}</Button>
      </Foot>
    </DialogContent>
  </Dialog>
}
