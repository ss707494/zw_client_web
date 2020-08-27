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
import {Search} from '@material-ui/icons'

const Contain = styled(Box)<BoxProps>`
  display: grid;
  grid-template-columns: 96px 1fr 96px;
  justify-items: center;
  height: 60px;
  align-items: center;
`
const LeftIconButton = styled(IconButton)`
  justify-self: start;
`
const Action = styled.div`
  justify-self: end;
  display: flex;
  
`
export const HeaderTitle = ({title = '', backCall = () => {}, showCart = false, LeftIcon = ArrowBackIosIcon, hideLeft = false, showSearch = false}: {title?: Maybe<string>, backCall?: Function, showCart?: boolean, showSearch?: boolean, LeftIcon?: ReactComponentLike, hideLeft?: boolean}) => {
  const router = useRouter()

  return <Contain
      boxShadow={1}>
    <LeftIconButton
        style={hideLeft && {
          visibility: 'hidden',
        } || {}}
        onClick={() => {
          if (!(backCall && backCall())) {
            router.back()
          }
        }}
    >
      <LeftIcon/>
    </LeftIconButton>
    <main>
      {ls(title)}
    </main>
    <Action>
      {showSearch && <IconButton
          onClick={() => {
            router.push('/m/searchPage')
          }}
      >
        <Search />
      </IconButton>}
      {showCart && <ShoppingCartIconButton/>}
    </Action>
  </Contain>
}
