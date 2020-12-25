import React from 'react'
import {MeLayoutBox} from '../components/meLayoutBox'
import {styled} from '@material-ui/core/styles'
import {mpStyle} from '../../../../style/common'
import {Button} from '@material-ui/core'

const Box = styled('div')({
  '& .MuiButtonBase-root': {
    backgroundColor: mpStyle.red,
  },
}, {
  name: 'MyAddress',
})

export const MyAddress = () => {

  return <MeLayoutBox>
    <Box>
      <Button>ss</Button>
      eee
    </Box>
  </MeLayoutBox>
}
