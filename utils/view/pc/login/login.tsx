import React from 'react'
import {jssStyled} from '../../../tools/jssStyled'
import {Login} from '../../m/login'

const FormBox = jssStyled('div')({
  maxWidth: 800,
  margin: '0 auto',
})

export const PcLogin = () => {

  return <FormBox>
    {Login()}
  </FormBox>
}
