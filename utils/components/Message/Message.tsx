import styled from 'styled-components'
import {Snackbar} from '@material-ui/core'
import {amber, blue, common, green, grey, red} from '@material-ui/core/colors'
import {SnackbarProps} from '@material-ui/core/Snackbar/Snackbar'
import {modelFactory} from '../../ModelAction/modelUtil'
import {originStore, useStoreModel} from '../../ModelAction/useStore'
import React from 'react'
import {fpMergePre} from '../../tools/utils'

const typeHelp = {
  default: `background: ${grey[700]};`,
  success: `background: ${green[600]};`,
  warning: `background: ${amber[700]};`,
  info: `background: ${blue[700]};`,
  error: `background: ${red[700]};`,
}
const getType = (type = 'default') => (typeHelp as any)[type]

const CusSnackbar = styled(Snackbar)<SnackbarProps & {msg_type: string}>`
  > div {
    color: ${common.white}
    ${({msg_type}) => getType(msg_type)}
  }
`

const messageModel = modelFactory('messageModel', {
  open: false,
  message: '',
  autoHideDuration: 2000,
  msg_type: 'default',
} as SnackbarProps & {msg_type: string}, {
  open:(value, option) => {
    if (typeof value === 'string') {
      option.setData(fpMergePre({
        message: value,
        open: true,
      }))
    }
  },
})

export const Message = () => {
  const {state: mState} = useStoreModel(messageModel)
  return <CusSnackbar
      open={mState.open}
      autoHideDuration={mState.autoHideDuration}
      message={mState.message}
      msg_type={mState.msg_type}
  />
}

export const showMessage = (option: string | any) => {
  if (typeof option === 'string') {
    originStore['messageModel'].actions.open(option)
    return
  }
  if (option?.message) {
    originStore['messageModel'].actions.open(option?.message)
    return
  }
}
