import React, {useEffect} from 'react'
import {modelFactory} from '../../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {fpMergePre} from '../../../../../tools/utils'
import {SigninInput} from '../../../register'
import {FieldContain} from '../../myInfo/updatePassword'
import {HeaderTitle} from '../../../../../components/HeaderTitle/HeaderTitle'
import {UserAddress, UserPayCard, UserPayCardItemInput} from '../../../../../graphqlTypes/types'
import {setForm} from '../../../../../tools/commonAction'
import {ls} from '../../../../../tools/dealKey'
import {useRouter} from 'next/router'
import {ButtonLoad} from '../../../../../components/ButtonLoad/ButtonLoad'
import {doc} from '../../../../../graphqlTypes/doc'
import {showMessage} from '../../../../../components/Message/Message'
import {DatePicker} from '@material-ui/pickers'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  RadioGroupProps,
  TextField,
} from '@material-ui/core'
import {Space} from '../../../../../components/Box/Box'
import {CreditAddressInputTypeEnum, ProvinceData} from '../../../../../ss_common/enum'
import styled from 'styled-components'
import {myAddressModel} from '../../myAddress/list'

export const myCreditCardEditModel = modelFactory('myCreditCardEditModel', {
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
    creditAddressInputType: CreditAddressInputTypeEnum.Select,
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
  changeSelectId: (value: UserAddress, option) => option.setData(fpMergePre({
    selectId: `${value.id}`,
    form: {
      zip: value.zip,
      province: value.province,
      city: value.city,
      district: value.district,
      address: value.address,
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

const RadioGroupBox = styled(RadioGroup)<RadioGroupProps>`
  &&& {
    display: flex;
    flex-direction: row;
  }
`

export const MyCreditCardEdit = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''

  const {actions: actionsMyAddressModel, state: stateMyAddressModel} = useStoreModel(myAddressModel)
  const {state: stateMCCE, actions: actionsMCCE} = useStoreModel(myCreditCardEditModel)
  useEffect(() => {
    if (id && id !== '0') {
      actionsMCCE.getOne({
        id,
      })
    }
  }, [id])
  useEffect(() => {
    actionsMyAddressModel.getList()
  }, [])

  return <div>
    <HeaderTitle
        title={`${id === '0' ? '新增' : '编辑'}信用卡`}
        backCall={actionsMCCE.clearForm}
    />
    <FieldContain>
      {[
        ['信用卡号', 'number'],
        ['过期日', 'expirationTime', () => <FormControl
            key={`expirationTime`}
            fullWidth={true}
            size={'small'}
        >
          <Space h={4}/>
          <FormLabel>
            {ls('过期日')}
          </FormLabel>
          <DatePicker
              format={'MM/yy'}
              value={stateMCCE.form.expirationTime || null}
              onChange={(date) => {
                actionsMCCE.setForm(['expirationTime', date])
              }}
          />
        </FormControl>],
        ['验证码', 'code'],
        ['持卡人姓名', 'userName'],
        ['详细地址', 'addressDetail', () => <React.Fragment
            key={`addressDetail__box`}
        >
          <FormControl
              key={`addressDetail`}
              fullWidth={true}
              size={'small'}
          >
            <Space h={10}/>
            <FormLabel style={{fontSize: 'small'}}>
              {ls('账单地址')}
            </FormLabel>
            <RadioGroupBox
                value={stateMCCE.form.creditAddressInputType}
                onChange={((event, value) => actionsMCCE.setForm(['creditAddressInputType', value]))}
            >
              <FormControlLabel
                  label={ls('收货地址中选择')}
                  value={CreditAddressInputTypeEnum.Select}
                  control={<Radio/>}
              />
              <FormControlLabel
                  value={CreditAddressInputTypeEnum.Input}
                  label={ls('新地址手动输入')}
                  control={<Radio/>}
              />
            </RadioGroupBox>
          </FormControl>
          {stateMCCE.form.creditAddressInputType === CreditAddressInputTypeEnum.Select && <TextField
              key={'creditAddressInputType_select'}
              style={{marginTop: '10px'}}
              select
              fullWidth
              value={'##'}
              onChange={e => actionsMCCE.changeSelectId(stateMyAddressModel.list.find(v => v.id === e.target.value))}
          >
            <MenuItem
                value={'##'}
                disabled={true}
            >
              {ls('选择地址')}
            </MenuItem>
            {stateMyAddressModel.list.map(item => <MenuItem
                key={`addressSelect_${item.id}`}
                value={`${item.id}`}>
              {item.name}
            </MenuItem>)}
          </TextField>}
          {[
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
                  value={stateMCCE.form.province ?? ''}
                  onChange={e => actionsMCCE.setForm(['province', e.target.value])}
                  disabled={stateMCCE.form.creditAddressInputType === CreditAddressInputTypeEnum.Select}
              >
                {ProvinceData.map(item => <MenuItem
                    key={`provinceData_${item[0]}`}
                    value={item[1]}>
                  {item[1]}
                </MenuItem>)}
              </TextField>,
            ],
            ['邮政编码', 'zip'],
          ].map(v => (v[2] && v[2]) || <SigninInput
              key={`myAddressEdit_${v[1]}`}
              label={ls(v[0] as string)}
              value={stateMCCE.form[v[1] as keyof UserPayCard] ?? ''}
              onChange={event => actionsMCCE.setForm([v[1], event.target.value])}
              disabled={stateMCCE.form.creditAddressInputType === CreditAddressInputTypeEnum.Select}
          />)}
        </React.Fragment>],
        // ['邮政编码', 'zipCode'],
        // ['城市', 'city'],
        ['联系方式', 'contact'],
      ].map(v => v[2] && (v[2] as Function)() || <SigninInput
          key={`MyCreditCardEdit_${v[1]}`}
          label={ls(v[0] as string)}
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
