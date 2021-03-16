import React, {useEffect} from 'react'
import {mergeTwoModel, modelFactory} from '../../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../../tools/utils'
import {SigninInput} from '../../../register'
import {FieldContain} from '../../myInfo/updatePassword'
import {HeaderTitle} from '../../../../../components/HeaderTitle/HeaderTitle'
import {UserAddressItemInput} from '../../../../../graphqlTypes/types'
import {setForm} from '../../../../../tools/commonAction'
import {ll} from '../../../../../tools/dealKey'
import {useRouter} from 'next/router'
import {ButtonLoad} from '../../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../../graphqlTypes/doc'
import {showMessage} from '../../../../../components/Message/Message'
import {MenuItem, TextField} from '@material-ui/core'
import {ProvinceData} from '../../../../../ss_common/enum'
import {FormValideBaseModel} from '../../../../../tools/formValide'

export const myAddressEditModel = mergeTwoModel(FormValideBaseModel, modelFactory('myAddressEditModel', {
  form: {
    name: '',
    address: '',
    zip: '',
    province: '',
    city: '',
    district: '',
    contactInformation: '',
  } as UserAddressItemInput,
}, {
  setForm: setForm,
  clearForm: (value, option) => option.setData(fpMergePre({
    form: {
      name: '',
      address: '',
      province: '',
      zip: '',
      city: '',
      district: '',
      contactInformation: '',
    },
  })),
  submit: (value, option) => {
    const {id, ...form} = option.data.form
    return option.mutate(doc.saveUserAddress, {
      data: {
        ...form,
        ...(id ? {
          id,
        } : {}),
      },
    })
  },
  getOne: async (value: UserAddressItemInput, option) => {
    const res = await option.query(doc.userAddress, {
      data: {
        ...value,
      },
    })
    option.setData(fpMergePre({
      form: {
        ...res?.userAddress ?? {},
      },
    }))
  },
}))

export const MyAddressEdit = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''

  const {state: stateMAEM, actions: actionsMAEM} = useStoreModel(myAddressEditModel)
  useEffect(() => {
    if (id && id !== '0') {
      actionsMAEM.getOne({
        id,
      })
    } else {
      actionsMAEM.setForm(['id', ''])
    }
  }, [actionsMAEM, id])
  useEffect(() => {
    actionsMAEM.initFormValide({
      rules: [
        {
          key: 'name',
          name: '姓名',
        },
        {
          key: 'address',
          name: '详细地址',
        },
        {
          key: 'district',
          name: '地区',
        },
        {
          key: 'city',
          name: '城市',
        },
        {
          key: 'province',
          name: '州',
        },
        {
          key: 'zip',
          name: '邮政编码',
        },
        {
          key: 'contactInformation',
          name: '联系方式',
        },
      ],
    })
  }, [actionsMAEM])

  return <div>
    <HeaderTitle
        title={`${id === '0' ? '新增' : '编辑'}地址`}
        backCall={actionsMAEM.clearForm}
    />
    <FieldContain>
      {[
        ['姓名', 'name'],
        ['详细地址', 'address'],
        ['地区', 'district'],
        ['城市', 'city'],
        ['州', 'province',
          <TextField
              key={'myAddressEdit_province'}
              style={{marginTop: '10px'}}
              select
              fullWidth
              label={'州'}
              value={stateMAEM.form.province ?? ''}
              onChange={e => actionsMAEM.setForm(['province', e.target.value])}
              {...stateMAEM.formValideErrObj?.['province']}
          >
            {ProvinceData.map(item => <MenuItem
                key={`provinceData_${item[0]}`}
                value={item[1]}>
              {item[1]}
            </MenuItem>)}
          </TextField>,
        ],
        ['邮政编码', 'zip'],
        ['联系方式', 'contactInformation'],
      ].map(v => (v[2] && v[2]) || <SigninInput
          key={`myAddressEdit_${v[1]}`}
          label={ll(v[0] as string)}
          value={stateMAEM.form[v[1] as keyof UserAddressItemInput] ?? ''}
          onChange={event => actionsMAEM.setForm([v[1], event.target.value])}
          {...stateMAEM.formValideErrObj?.[v[1] as string]}
      />)}
      <section style={{width: '100%', height: '20px'}}/>
      <ButtonLoad
          fullWidth
          variant={'contained'}
          color={'secondary'}
          onClick={async () => {
            if (await actionsMAEM.formValide()) return
            if ((await actionsMAEM.submit())?.saveUserAddress?.id) {
              showMessage('操作成功')
              router.back()
              actionsMAEM.clearForm()
            }
          }}
      >
        保存
      </ButtonLoad>
    </FieldContain>
  </div>
}
