import {fpSetPre} from './utils'

export const setForm: ModelAction = ([path, value], option) => {
  option.setData(fpSetPre(`form.${path}`, value))
}
