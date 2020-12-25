import {SigninInput} from '../../../register'
import {ll} from '../../../../../tools/dealKey'
import {dealLastNumber} from '../../../../../tools/utils'
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
import {DatePicker} from '@material-ui/pickers'
import React, {ReactNode} from 'react'
import {CreditAddressInputTypeEnum, ProvinceData} from '../../../../../ss_common/enum'
import {UserPayCard} from '../../../../../graphqlTypes/types'
import {ButtonLoad} from '../../../../../components/ButtonLoad/ButtonLoad'
import {showMessage} from '../../../../../components/Message/Message'
import {FieldContain} from '../../myInfo/updatePassword'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {MyCreditCardEditModel} from './[id]'
import {styled} from '@material-ui/styles'
import {myAddressModel} from '../../myAddress/list'

const RadioGroupBox = styled(RadioGroup)<RadioGroupProps>({
  display: 'flex',
  flexDirection: 'row',
})

export const CardFieldContain = ({footerBox, finallyAction = () => {}, variant = 'standard'}: { finallyAction: Function, variant?: 'standard'|'filled'|'outlined', footerBox?: ReactNode }) => {
  const {state: stateMyCreditCardEditModel, actions: actionsMyCreditCardEditModel} = useStoreModel(MyCreditCardEditModel)
  const {state: stateMyAddressModel} = useStoreModel(myAddressModel)

  return <FieldContain>
    {[
      ['信用卡号', 'number', () => <SigninInput
          key={`numberKey`}
          variant={variant}
          label={ll('信用卡号')}
          value={stateMyCreditCardEditModel.isEditNumber ? stateMyCreditCardEditModel.form['number'] : dealLastNumber(stateMyCreditCardEditModel.form['number']) ?? ''}
          onChange={event => actionsMyCreditCardEditModel.setForm(['number', event.target.value])}
          onFocus={() => actionsMyCreditCardEditModel.numberFocus()}
      />],
      ['过期日', 'expirationTime', () => <DatePicker
          key={`expirationTime`}
          fullWidth={true}
          label={ll('过期日')}
          inputVariant={variant}
          format={'MM/yy'}
          value={stateMyCreditCardEditModel.form.expirationTime || null}
          onChange={(date) => {
            actionsMyCreditCardEditModel.setForm(['expirationTime', date])
          }}
      />],
      ['验证码', 'code', () => <SigninInput
          key={`codeKey`}
          variant={variant}
          type="password"
          label={ll('验证码')}
          value={stateMyCreditCardEditModel.form['code'] ?? ''}
          onChange={event => actionsMyCreditCardEditModel.setForm(['code', event.target.value])}
      />],
      ['持卡人姓名', 'userName'],
      ['详细地址', 'addressDetail', () => <React.Fragment
          key={`addressDetail__box`}
      >
        <FormControl
            key={`addressDetail`}
            fullWidth={true}
            size={'small'}
            variant={variant}
        >
          <Space h={10}/>
          <FormLabel style={{fontSize: 'small'}}>
            {ll('账单地址')}
          </FormLabel>
          <RadioGroupBox
              value={stateMyCreditCardEditModel.form.creditAddressInputType}
              onChange={((event, value) => actionsMyCreditCardEditModel.setForm(['creditAddressInputType', value]))}
          >
            <FormControlLabel
                label={ll('收货地址中选择')}
                value={CreditAddressInputTypeEnum.Select}
                control={<Radio/>}
            />
            <FormControlLabel
                value={CreditAddressInputTypeEnum.Input}
                label={ll('新地址手动输入')}
                control={<Radio/>}
            />
          </RadioGroupBox>
        </FormControl>
        {stateMyCreditCardEditModel.form.creditAddressInputType === CreditAddressInputTypeEnum.Select && <TextField
            key={'creditAddressInputType_select'}
            variant={variant}
            style={{marginTop: '10px'}}
            select
            fullWidth
            value={'##'}
            onChange={e => actionsMyCreditCardEditModel.changeSelectId(stateMyAddressModel.list.find(v => v.id === e.target.value))}
        >
          <MenuItem
              value={'##'}
              disabled={true}
          >
            {ll('选择地址')}
          </MenuItem>
          {stateMyAddressModel.list.map(item => <MenuItem
              key={`addressSelect_${item.id}`}
              value={`${item.id}`}>
            {item.name}, {item.address}
          </MenuItem>)}
        </TextField>}
        {[
          ['详细地址', 'address'],
          ['地区', 'district'],
          ['城市', 'city'],
          ['州', 'province',
            <TextField
                key={'myAddressEdit_province'}
                variant={variant}
                style={{marginTop: '10px'}}
                select
                fullWidth
                label={'州'}
                value={stateMyCreditCardEditModel.form.province ?? ''}
                onChange={e => actionsMyCreditCardEditModel.setForm(['province', e.target.value])}
                disabled={stateMyCreditCardEditModel.form.creditAddressInputType === CreditAddressInputTypeEnum.Select}
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
            variant={variant}
            label={ll(v[0] as string)}
            value={stateMyCreditCardEditModel.form[v[1] as keyof UserPayCard] ?? ''}
            onChange={event => actionsMyCreditCardEditModel.setForm([v[1], event.target.value])}
            disabled={stateMyCreditCardEditModel.form.creditAddressInputType === CreditAddressInputTypeEnum.Select}
        />)}
      </React.Fragment>],
      // ['邮政编码', 'zipCode'],
      // ['城市', 'city'],
      ['联系方式', 'contact'],
    ].map(v => (v[2] && (v[2] as Function)()) || <SigninInput
        key={`MyCreditCardEdit_${v[1]}`}
        variant={variant}
        label={ll(v[0] as string)}
        value={stateMyCreditCardEditModel.form[v[1] as keyof UserPayCard] ?? ''}
        onChange={event => actionsMyCreditCardEditModel.setForm([v[1], event.target.value])}
        disabled={stateMyCreditCardEditModel.form.creditAddressInputType === CreditAddressInputTypeEnum.Select}
    />)}
    {(footerBox && footerBox) || <>
      <section style={{width: '100%', height: '20px'}}/>
      <ButtonLoad
          fullWidth
          variant={'contained'}
          color={'secondary'}
          onClick={async () => {
            if ((await actionsMyCreditCardEditModel.submit())?.saveUserPayCard?.id) {
              showMessage('操作成功')
              actionsMyCreditCardEditModel.clearForm()
              finallyAction()
            }
          }}
      >
        保存
      </ButtonLoad>
    </>}
  </FieldContain>
}
