import React from 'react'
import styled from 'styled-components'
import {Snackbar} from '@material-ui/core'
import {amber, blue, common, green, grey, red} from '@material-ui/core/colors'
import {SnackbarProps} from '@material-ui/core/Snackbar/Snackbar'
import {originStore, useStoreModel} from '../../ModelAction/useStore'
import {fpMergePre} from '../../tools/utils'
import {modelFactory} from '../../ModelAction/modelUtil'

const typeHelp = {
  default: `background: ${grey[700]};`,
  success: `background: ${green[600]};`,
  warning: `background: ${amber[700]};`,
  info: `background: ${blue[700]};`,
  error: `background: ${red[700]};`,
}
const getType = (type = 'default') => (typeHelp as any)[type]

type MessageProps = Partial<SnackbarProps & {
  msg_type: 'default' | 'success' | 'info' | 'warning' | 'error' | string
}>

const CusSnackbar = styled(Snackbar)<MessageProps>`
  &&& > div {
    color: ${common.white};
    ${({msg_type}) => getType(msg_type)}
  }
`

const messageModel = modelFactory('messageModel', {
  open: false,
  message: '',
  autoHideDuration: 2000,
  msg_type: 'default',
} as MessageProps, {
  open: (value: string | MessageProps, option) => {
    if (typeof value === 'string') {
      option.setData(fpMergePre({
        message: value,
        open: true,
      }))
    } else {
      option.setData(fpMergePre({
        ...value,
        open: true,
      }))
    }
  },
  onClose: (value, option) => option.setData(fpMergePre({
    open: false,
  })),
})

export const Message = () => {
  const {state: mState, actions} = useStoreModel(messageModel)
  return <CusSnackbar
      open={mState.open}
      autoHideDuration={mState.autoHideDuration}
      message={mState.message}
      msg_type={mState.msg_type}
      onClose={() => actions.onClose()}
  />
}

export const showMessage = (option: string | MessageProps) => {
  originStore['messageModel'].actions.open(option)
  return
}
