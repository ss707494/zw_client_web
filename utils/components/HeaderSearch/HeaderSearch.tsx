import {blue, blueGrey} from '@material-ui/core/colors'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {InputBaseProps} from '@material-ui/core/InputBase/InputBase'
import {InputBase} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import React from 'react'

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
  name: "BorderedInputBase",
})

export const BorderedInputBase: (props: InputBaseProps) => JSX.Element = () => {
  const styles = useBorderedInputBaseStyles()
  return <InputBase
      classes={styles}
      placeholder={'Placeholder'}
      startAdornment={<Search/>}
  />
}
