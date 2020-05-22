import React, {useEffect} from 'react'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../tools/utils'
import {SigninInput} from '../../../register'
import {FieldContain} from '../../myInfo/updatePassword'
import {HeaderTitle} from '../../../../components/HeaderTitle/HeaderTitle'
import {UserPayCard, UserPayCardItemInput} from '../../../../graphqlTypes/types'
import {setForm} from '../../../../tools/commonAction'
import {ls} from '../../../../tools/dealKey'
import {useRouter} from 'next/router'
import {ButtonLoad} from '../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../graphqlTypes/doc'
import {showMessage} from '../../../../components/Message/Message'

export const myCreditCardEditModel = modelFactory('myCreditCardEditModel', {
  form: {
    number: '123',
    code: '4321',
    name: 'ss',
    userName: 'ss',
    addressDetail: '地址...',
    zipCode: 'code',
    city: 'city',
    contact: 'user',
  } as UserPayCard,
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
      contact: '',
    },
  })),
  submit: (value, option) => {
    const form = option.data.form
    return option.mutate(doc.saveUserPayCard, {
      data: {
        ...form,
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
      form: {
        ...res?.userPayCard ?? {},
      },
    }))
  },
})

export const MyCreditCardEdit = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''

  const {state: stateMCCE, actions: actionsMCCE} = useStoreModel(myCreditCardEditModel)
  useEffect(() => {
    if (id && id !== '0') {
      actionsMCCE.getOne({
        id,
      })
    }
  }, [id])

  return <div>
    <HeaderTitle
        title={`${id === '0' ? '新增' : '编辑'}信用卡`}
        backCall={actionsMCCE.clearForm}
    />
    <FieldContain>
      {[
        ['信用卡号', 'number'],
        ['四位号码', 'code'],
        ['姓名', 'userName'],
        ['详细地址', 'addressDetail'],
        ['邮政编码', 'zipCode'],
        ['城市', 'city'],
        ['联系方式', 'contact'],
      ].map(v => <SigninInput
          key={`MyCreditCardEdit_${v[1]}`}
          label={ls(v[0])}
          value={stateMCCE.form[v[1] as keyof UserPayCard] ?? ''}
          onChange={event => actionsMCCE.setForm([v[1], event.target.value])}
      />)}
      <section style={{width: '100%', height: '20px'}}/>
      <ButtonLoad
          fullWidth
          variant={'contained'}
          color={'secondary'}
          onClick={async () => {
            if ((await actionsMCCE.submit())?.saveUserPayCard?.id) {
              showMessage('操作成功')
              actionsMCCE.clearForm()
              router.back()
            }
          }}
      >
        保存
      </ButtonLoad>
    </FieldContain>
  </div>
}
