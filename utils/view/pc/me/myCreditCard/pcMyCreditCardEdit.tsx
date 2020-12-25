import React from 'react'
import {Button} from '@material-ui/core'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {PCMyCreditCardModel} from './myCreditCardModel'
import { ll } from '../../../../tools/dealKey'
import {styled} from '@material-ui/styles'
import {CardFieldContain} from '../../../m/me/myCreditCard/edit/fieldContain'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import {showMessage} from '../../../../components/Message/Message'
import {MyCreditCardEditModel} from '../../../m/me/myCreditCard/edit/[id]'
import {mpStyle} from '../../../../style/common'
import { Space } from '../../../../components/Box/Box'

const Box = styled('div')({})
const Footer = styled('div')({
  marginTop: 92,
  '& .MuiButtonBase-root': {
    width: 215,
  }
})

export const PcMyCreditCardEdit = () => {
  const {actions: actionsPCMyCreditCardModel, state: statePCMyCreditCardModel} = useStoreModel(PCMyCreditCardModel)
  const {state: stateMyCreditCardEditModel, actions: actionsMyCreditCardEditModel} = useStoreModel(MyCreditCardEditModel)

  return <Box>
    <CardFieldContain
        finallyAction={() => {}}
        variant={'outlined'}
        footerBox={<Footer>
          <ButtonLoad
              variant={'contained'}
              color={'secondary'}
              onClick={async () => {
                if ((await actionsMyCreditCardEditModel.submit())?.saveUserPayCard?.id) {
                  showMessage('操作成功')
                  actionsMyCreditCardEditModel.clearForm()
                  actionsPCMyCreditCardModel.closeEdit()
                }
              }}
          >
            保存
          </ButtonLoad>
          <Space w={26}/>
          <Button
              variant={'outlined'}
              onClick={() => {
                actionsPCMyCreditCardModel.closeEdit()
              }}
          >{ll('取消')}</Button>
        </Footer>}
    />
    <Space h={mpStyle.space.xxl}/>
  </Box>
}
