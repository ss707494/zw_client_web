import {blue, blueGrey} from '@material-ui/core/colors'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {InputBaseProps} from '@material-ui/core/InputBase/InputBase'
import {IconButton, InputBase} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import {mpStyle} from '../../style/common'
import {ll} from '../../tools/dealKey'
import { ShoppingCartIconButton } from '../ShoppingCartIconButton/ShoppingCartIconButton'
import {useRouter} from 'next/router'
import {HomeType} from '../../view/m/home/appModule'

export const borderedInputBaseStyles = ({palette}: any) => ({
  root: {
    width: '100%',
    borderRadius: '14px',
    border: '2px solid',
    borderColor: blueGrey[200],
    '&:hover:not($disabled)': {
      borderColor: blueGrey[500],
    },
    '& > svg': {
      color: blueGrey[300],
    },
  },
  adornedStart: {
    paddingLeft: '0.5rem',
  },
  adornedEnd: {
    paddingRight: '0.5rem',
  },
  focused: {
    borderColor: blue[700],
    '&:hover:not($disabled)': {
      borderColor: blue[700],
    },
  },
  error: {
    borderColor: palette.error.main,
    '&:hover:not($disabled)': {
      borderColor: palette.error.main,
    },
  },
  input: {
    padding: '0.625rem 0.5rem',
  },
  disabled: {
    borderColor: blueGrey[300],
    backgroundColor: blueGrey[100],
  },
})

export const useBorderedInputBaseStyles = makeStyles(borderedInputBaseStyles, {
  name: 'BorderedInputBase',
})

export const BorderedInputBase: (props: InputBaseProps) => JSX.Element = () => {
  const styles = useBorderedInputBaseStyles()
  return <InputBase
      classes={styles}
      placeholder={''}
      startAdornment={<Search/>}
  />
}

const Box = styled.div`
  height: 45px;
  box-shadow: ${mpStyle.shadow['1']};
  display: grid;
  grid-template-columns: 96px 1fr 96px;
  align-items: center;
`
const Logo = styled.div`
  > img {
    display: none;
    width: 20px;
    height: 35px;
  }
`
const Title = styled.div`
  justify-self: center;
`
const Action = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
export const HeaderSearch = ({homeType}: {homeType?: string}) => {
  const router = useRouter()
  return <Box>
    <Logo>
      <img
          src={'/img/home/logo.png'}
          alt=''
      />
    </Logo>
    <Title>{ll(homeType === HomeType.group ? '拼团' : '逛店')}</Title>
    <Action>
      {homeType === HomeType.home && <ShoppingCartIconButton/>}
      <IconButton
          onClick={() => {
            router.push('/m/searchPage')
          }}
      >
        <Search />
      </IconButton>
    </Action>
  </Box>
}
