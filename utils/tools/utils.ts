import format from 'date-fns/format'
import set from 'lodash/set'
import {cloneDeep, PropertyPath, isFunction, get, isArray, mergeWith, isString} from 'lodash'
import {Maybe} from '../graphqlTypes/types'

export const getObjectURL = (file: any) => {
  // @ts-ignore
  return window?.createObjectURL?.(file)
      ?? window?.URL?.createObjectURL?.(file)
      ?? window?.webkitURL?.createObjectURL?.(file)
}

export const parseFloatForInput = (value: any) => {
  if (value === '-' || value === '') return value
  try {
    return parseFloat(value)
  } catch (e) {
    console.error(e)
  }
}

type SetData<S = any> = S | ((preData: S) => S)

export const fpSet = <E = any>(origin: any, path: any, value: SetData<E>) => {
  let newData = cloneDeep(origin)
  if (isFunction(value)) {
    const oldData = get(origin, path)
    set(newData, path, value(oldData))
  } else {
    set(newData, path, value)
  }
  return newData
}

export const delay = (time: number) => (new Promise(resolve => setTimeout(resolve, time)))

export const fpSetPre: <T extends object>(path: PropertyPath, newValue: SetData) => (origin: T) => T = (path: any, value) => (origin) => {
  let newData = cloneDeep(origin)
  if (isFunction(value)) {
    const oldData = get(origin, path)
    set(newData, path, value(oldData))
  } else {
    set(newData, path, value)
  }
  return newData
}

const customizer = (objValue: any, srcValue: any) => {
  if (isArray(srcValue)) {
    return srcValue
  }
}

export const fpMerge: <TObject, TSource1>(
    origin: TObject,
    newValue: TSource1,
) => TObject & TSource1 = (origin, newValue) => {
  return mergeWith({}, origin, newValue, customizer)
}

export const fpMergePre: <Pre, New extends Partial<Pre>>(newValue: New) => (origin: Pre) => Pre & New = (newValue) => (pre) => mergeWith({}, pre, newValue, customizer)

export const fpRemove = (arr: any, index: number) => {
  if (!arr) return []
  return [
    ...arr?.slice(0, index),
    ...arr?.slice(index + 1, arr?.length),
  ]
}

export const dealNumberZero = (length: number) => (num: number) => {
  const _s = `${num ?? ''}`
  return Array(length - _s.length).fill('0').join('') + _s
}

export const formatDate = (date: any = '', formatString = 'YYYY-MM-dd HH:mm:ss') => {
  if (!date) {
    return ''
  }
  if (isString(date)) {
    return format(new Date(date), formatString, {
      useAdditionalDayOfYearTokens: true,
      useAdditionalWeekYearTokens: true,
    })
  }
  return (isNaN(date)) ? '' : format(date, formatString, {
    useAdditionalDayOfYearTokens: true,
    useAdditionalWeekYearTokens: true,
  })
}

export const dealNonBooleanProps = (value: any) => !!value ? 1 : 0

export const formatMoney = (amount: any, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? "-" : ""

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    let j = (i.length > 3) ? i.length % 3 : 0

    // @ts-ignore
    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")
  } catch (e) {
    console.log(e)
  }
}

export const dealMoney = (amount: any, pre = '') => `${pre}$ ${formatMoney(amount)}`

export const dealMaybeNumber = (num: Maybe<number> | undefined) => num ?? 0

export const getLastNumber = (str: string, num: number) => str.slice(str.length - num)

export default {
  getObjectURL,
}

export const dealUrlQuery = (queryObj: any) => {
  return `?${Object.keys(queryObj).map(value => `${value}=${queryObj[value]}`).join('&')}`
}

export const isPc = () => {
  return /\/pc\//.test(location.href)
}

