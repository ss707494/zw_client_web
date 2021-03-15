import * as React from 'react'
import {InputProps as StandardInputProps} from '@material-ui/core/Input/Input'
import {fpMergePre} from './utils'
import {modelFactory} from '../ModelAction/modelUtil'

export type FormValideErrObj = {
  error?: boolean,
  helperText?: React.ReactNode,
  onBlur?: StandardInputProps['onBlur'];
}

export type formValideValue = {
  key?: string
}

export type formValideRule = {
  key?: string,
  name?: string,
  msg?: string,
  customCall?: (o: {
    value: any,
  }) => undefined | string
}

export const FormValideEnum = 'formValide'
export const FormValideErrObjEnum = 'formValideErrObj'

export const initFormValide = ({keys}: { keys: string[] }) => async (value: any, option: any) => {
  if (option.actions?.[FormValideEnum]) {
    option.setData(fpMergePre({
      formValideErrObj: keys.reduce((previousValue, currentValue) => {
        return {
          ...previousValue,
          [currentValue]: {
            onBlur: () => option.actions?.[FormValideEnum]({
              key: currentValue,
            }),
          },
        }
      }, {}),
    }))
  }
}

export const setFormErrorMsg = ({key, err, clear}: { key: string, err?: string, clear?: boolean }, option: any) => {
  option.setData(fpMergePre({
    [FormValideErrObjEnum]: {
      [key]: {
        error: !clear,
        helperText: clear ? '' : err,
      },
    },
  }))
}

export const dealFormValide = ({rules}: {
  rules: formValideRule[]
}) => async (value: formValideValue, option: any) => {
  console.log(rules)
  return (await rules.reduce<Promise<{
    flag?: boolean,
    option?: any,
    key?: string,
  }>>(async (previousValue, currentValue) => {
    const pre = await previousValue
    if (pre?.flag) {
      return pre
    }
    const key = pre.key
    const setFormErrorMsg = pre?.option?.actions?.setFormErrorMsg
    if (!key || key === currentValue.key) {
      // @ts-ignore
      const value = option.data.form[currentValue.key]
      if (!value) {
        setFormErrorMsg({
          key,
          err: `请输入${currentValue.name}`,
        })
        return {
          ...pre,
          flag: true,
        }
      } else if (currentValue.customCall) {
        const msg = await currentValue.customCall({value})
        if (msg) {
          setFormErrorMsg({
            key,
            err: `${msg}`,
          })
          return {
            ...pre,
            flag: true,
          }
        }
      } else {
        setFormErrorMsg({
          key,
          clear: true,
        })
        return {
          ...pre,
          flag: false,
        }
      }
    }
    setFormErrorMsg({
      key,
      clear: true,
    })
    return pre
  }, Promise.resolve({
    flag: false,
    option: option,
    key: value?.key,
  }))).flag
}

export const FormValideBaseModel = modelFactory('FormValideBaseModel', {
  formValideErrObj: {} as HelpObj<FormValideErrObj>,
  formValideRules: [] as formValideRule[],
}, {
  setFormErrorMsg: setFormErrorMsg,
  initFormValide: async (value: { rules: formValideRule[] }, option) => {
    await initFormValide({keys: value.rules.map(v => v.key ?? '')})(value, option)
    option.setData(fpMergePre({
      formValideRules: value.rules,
    }))
  },
  formValide: async (value, option) => dealFormValide({rules: option.data.formValideRules})(value, option),
})
