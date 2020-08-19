import React from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {Box, IconButton} from '@material-ui/core'
import {ls} from '../../tools/dealKey'
import {useRouter} from 'next/router'
import {Maybe} from '../../graphqlTypes/types'
import {BoxProps} from '@material-ui/core/Box/Box'
import {ReactComponentLike} from 'prop-types'
import {ShoppingCartIconButton} from '../ShoppingCartIconButton/ShoppingCartIconButton'

const Contain = styled(Box)<BoxProps>`
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  justify-items: center;
  height: 60px;
  align-items: center;
`
export const HeaderTitle = ({title = '', backCall = () => {}, showCart = false, LeftIcon = ArrowBackIosIcon}: {title?: Maybe<string>, backCall?: Function, showCart?: boolean, LeftIcon?: ReactComponentLike}) => {
  const router = useRouter()

  return <Contain
      boxShadow={1}>
    <IconButton
        onClick={() => {
          if (!(backCall && backCall())) {
            router.back()
          }
        }}
    >
      <LeftIcon/>
    </IconButton>
    <main>
      {ls(title)}
    </main>
    {showCart && <ShoppingCartIconButton/>}
  </Contain>
}
