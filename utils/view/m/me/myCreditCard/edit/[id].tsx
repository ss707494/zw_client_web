import React, {useEffect} from 'react'
import {modelFactory} from '../../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../../tools/utils'
import {HeaderTitle} from '../../../../../components/HeaderTitle/HeaderTitle'
import {UserAddress, UserPayCard, UserPayCardItemInput} from '../../../../../graphqlTypes/types'
import {setForm} from '../../../../../tools/commonAction'
import {useRouter} from 'next/router'
import {doc} from '../../../../../graphqlTypes/doc'
import {CreditAddressInputTypeEnum} from '../../../../../ss_common/enum'
import {myAddressModel} from '../../myAddress/list'
import {CardFieldContain} from './fieldContain'

export const MyCreditCardEditModel = modelFactory('myCreditCardEditModel', {
  selectId: '',
  form: {
    number: '',
    code: '',
    name: '',
    userName: '',
    addressDetail: '',
    zipCode: '',
    city: '',
    zip: '',
    province: '',
    district: '',
    address: '',
    contact: '',
    expirationTime: null,
    creditAddressInputType: CreditAddressInputTypeEnum.Input,
  } as UserPayCard,
  isEditNumber: true,
}, {
  setForm: setForm,
  clearForm: (value, option) => option.setData(fpMergePre({
    form: {
      number: '',
      code: '',
      name: '',
      userName: '',
      addressDetail: '',
      zipCode: '',
      city: '',
      zip: '',
      province: '',
      district: '',
      address: '',
      contact: '',
      expirationTime: null,
      creditAddressInputType: CreditAddressInputTypeEnum.Input,
    },
  })),
  changeSelectId: (value: UserAddress, option) => option.setData(fpMergePre({
    selectId: `${value.id}`,
    form: {
      zip: value.zip,
      province: value.province,
      city: value.city,
      district: value.district,
      address: value.address,
      contact: value.contactInformation,
    },
  })),
  submit: (value, option) => {
    const {id, ...form} = option.data.form
    return option.mutate(doc.saveUserPayCard, {
      data: {
        ...form,
        ...(id ? {
          id,
        } : {}),
      },
    })
  },
  getOne: async (value: UserPayCardItemInput, option) => {
    const res = await option.query(doc.userPayCard, {
      data: {
        ...value,
      },
    })
    option.setData(fpMergePre({
      isEditNumber: false,
      form: {
        ...res?.userPayCard ?? {},
      },
    }))
  },
  numberFocus: (value, option) => {
    if (!option.data.isEditNumber) {
      option.setData(fpMergePre({
        isEditNumber: true,
        form: {
          number: '',
        },
      }))
    }
  },
})

export const MyCreditCardEdit = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''

  const {actions: actionsMyAddressModel} = useStoreModel(myAddressModel)
  const {actions: actionsMyCreditCardEditModel} = useStoreModel(MyCreditCardEditModel)
  useEffect(() => {
    if (id && id !== '0') {
      actionsMyCreditCardEditModel.getOne({
        id,
      })
    } else {
      actionsMyCreditCardEditModel.setForm(['id', ''])
    }
  }, [actionsMyCreditCardEditModel, id])
  useEffect(() => {
    actionsMyAddressModel.getList()
  }, [])

  return <div>
    <HeaderTitle
        title={`${id === '0' ? '新增' : '编辑'}信用卡`}
        backCall={actionsMyCreditCardEditModel.clearForm}
    />
    <CardFieldContain
        finallyAction={() => {
          router.back()
        }}
    />
  </div>
}
