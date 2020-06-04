import {modelFactory} from '../ModelAction/modelUtil'
import {fpMerge, fpSet} from '../tools/utils'

export interface DialogModel<T> {
  open: boolean
  dialogData: T
}

export type ResolverFun = (value?: any) => any

export const dialogModelFactory = <T>(name: string, initData: T) => modelFactory(`${name}_dialogModelFactory`, {
  dialogData: initData,
  open: false,
  isEdit: -1,
  openResolve: (() => {
  }) as ResolverFun,
}, {
  openClick: (value, {setData}) => {
    return new Promise(resolve => {
      setData(preData => fpMerge(preData, {
        open: true,
        dialogData: value,
        isEdit: -1,
        openResolve: resolve,
      }))
    })
  },
  openEditClick: (value: { data: any; index: number }, {setData}) => setData(pre => fpMerge(pre, {
    open: true,
    dialogData: value.data,
    isEdit: value.index,
  })),
  onClose: (value, {data, setData}) => {
    data.openResolve(false)
    setData(pre => fpMerge(fpSet(pre, 'dialogData', {}), {
      dialogData: initData,
      open: false,
    }))
  },
  setdialog: (value: T | any, {setData}) => setData(data => fpMerge(data, {
    dialogData: value,
  })),
})
