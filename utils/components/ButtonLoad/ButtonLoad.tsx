import {Button, ButtonProps, CircularProgress} from '@material-ui/core'
import React from 'react'

declare interface ButtonLoadProps extends ButtonProps {
  loading?: boolean | number
}

export const ButtonLoad = (props: ButtonLoadProps) => {

  return <Button
      {...props}
      disabled={!!props.loading || props.disabled}
  >
    {props.children}
    {!!props.loading && <CircularProgress
        color="inherit"
        size={26}
    />}
  </Button>
}
