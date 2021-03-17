import styled from 'styled-components'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'
import {InputProps, TextField} from '@material-ui/core'
import React from 'react'
import {TextFieldProps} from '@material-ui/core/TextField/TextField'

const Label = styled.div`
  ${mpStyle.fontType.n};
`
type BaseFieldProps = {
  label?: string,
  readonly?: boolean,
  value?: string | null | undefined,
  onChange?: InputProps['onChange'],
} & TextFieldProps
export const BaseField = ({type, label, readonly = false, value = '', onChange, onBlur, error, helperText}: BaseFieldProps) => {

  return <div>
    <Label>{label}</Label>
    <Space h={mpStyle.space.xs}/>
    {(readonly && <Label>{value}</Label>)
    || <TextField
        variant={'outlined'}
        fullWidth={true}
        size={'small'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        type={type}
    />
    }
  </div>
}
