import Register from '../../m/register'
import React from 'react'
import {jssStyled} from '../../../tools/jssStyled'

const Box = jssStyled('div')({
  maxWidth: 800,
  margin: '0 auto',
})

export const PcRegister = () => {

  return <Box>
    {Register()}
  </Box>
}
