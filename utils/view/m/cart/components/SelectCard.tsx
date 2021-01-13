import {Dialog, DialogTitle, DialogContent, Radio, Button} from '@material-ui/core'
import React from 'react'
import {dialogModelFactory} from '../../../../commonModel/dialog'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {ll} from '../../../../tools/dealKey'
import {ShopCartModel} from '../index'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import {dealLastNumber} from '../../../../tools/utils'

export const selectCardModel = dialogModelFactory('selectCardModel', {})

const CardBox = styled.div`
  display: grid;
  grid-template-columns: minmax(60vw, 1fr) min-content;
  grid-template-rows: repeat(2, fr);
  grid-row-gap: 8px;
  margin-bottom: 16px;
  > header {
    font-size: 16px;
    font-weight: bold;
  }
  > aside {
    grid-area: 1/2/3/3;
  }
`
const Footer = styled.div`

`

export const SelectCard = () => {
  const router = useRouter()
  const {state: stateSelectCard, actions: actionsSelectCard} = useStoreModel(selectCardModel)
  const {state: stateShopCartModel, actions: actionsShopCartModel} = useStoreModel(ShopCartModel)

  return <Dialog
      open={stateSelectCard.open}
      onClose={actionsSelectCard.onClose}
  >
    <DialogTitle>{ll('选择信用卡')}</DialogTitle>
    <DialogContent>
      {stateShopCartModel.payCardList.map(v => <CardBox key={`DialogTitleAddressBox_${v.id}`}>
        <header>{v.name}</header>
        <footer>{`${dealLastNumber(v.number)}`}</footer>
        <aside>
          <Radio
              onChange={() => {
                stateSelectCard.openResolve(v.id)
                actionsSelectCard.onClose()
              }}
              checked={v.id === stateShopCartModel.form.paymentMethodCardId}
          />
        </aside>
      </CardBox>)}
      <Footer>
        <Button
            fullWidth={true}
            variant={'contained'}
            color={'secondary'}
            onClick={() => {
              router.push('/m/me/myCreditCard/edit/[id]', '/m/me/myCreditCard/edit/0')
            }}
        >{ll('添加新方式')}</Button>
      </Footer>
    </DialogContent>
  </Dialog>
}
