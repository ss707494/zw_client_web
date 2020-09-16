import {dialogModelFactory} from '../../../../commonModel/dialog'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Dialog, DialogContent} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import {User} from '../../../../graphqlTypes/types'
import { ls } from '../../../../tools/dealKey'

export const CoinDetailDialogModel = dialogModelFactory('CoinDetailDialog', {} as User)

const ItemBox = styled.div`
  display: flex;
  margin-bottom: 16px;
  > aside {
    margin-right: 8px;
  }
`

export const CoinDetailDialog = () => {
  const {actions: actionsCoinDetailDialogModel, state: stateCoinDetailDialogModel} = useStoreModel(CoinDetailDialogModel)

  console.log(stateCoinDetailDialogModel.dialogData)
  return <Dialog
      open={stateCoinDetailDialogModel.open}
      onClose={actionsCoinDetailDialogModel.onClose}
  >
    <DialogContent>
      <ItemBox>
        <aside>{ls('上月消费积攒')}</aside>
        <main>{stateCoinDetailDialogModel.dialogData.orderCoinLastMonthGet}</main>
      </ItemBox>
      <ItemBox>
        <aside>{ls('本月消费抵扣')}</aside>
        <main>{stateCoinDetailDialogModel.dialogData.orderCoinCurrentMonthCost}</main>
      </ItemBox>
      <ItemBox>
        <aside>{ls('本月可用余额')}</aside>
        <main>{stateCoinDetailDialogModel.dialogData.orderCoinCurrentMonth}</main>
      </ItemBox>
    </DialogContent>
  </Dialog>
}
