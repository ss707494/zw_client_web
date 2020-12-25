import {modelFactory} from '../../../../ModelAction/modelUtil'
import {fpMergePre} from '../../../../tools/utils'

export const PCMyCreditCardModel = modelFactory('PCMyCreditCardModel', {
  isEdit: false,
}, {
  editData: async (value, option) => {
    option.setData(fpMergePre({
      isEdit: true,
    }))
  },
  closeEdit: async (value, option) => option.setData(fpMergePre({isEdit: false})),
})
