import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import {ll} from '../../../tools/dealKey'
import React from 'react'
import {useStoreModel} from '../../../ModelAction/useStore'
import {groupProductModel} from './[id]'
import styled from 'styled-components'
import {mpStyle} from '../../../style/common'
import {grey} from '@material-ui/core/colors'

const GroupQueueListBox = styled.div<{select: boolean}>`
  margin-top: 16px;
  border-radius: 8px;
  background: ${prop => prop.select
    ? `linear-gradient(to right, ${mpStyle.red}, #FC7361)`
    : grey['200']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`

export const GroupQueueList = () => {
  const {state: stateGroupProduct} = useStoreModel(groupProductModel)
  const product = stateGroupProduct.product

  return <>
    {stateGroupProduct.groupQueueList.filter(v => (v.sumFillAmount ?? 0) < (product?.groupPrecision ?? 0)).map(groupQueue => {
      const select = groupQueue.id === stateGroupProduct.selectQueueId
      return <GroupQueueListBox
          select={select}
          key={`GroupQueueListBox${groupQueue.id}`}
          className={'GroupQueueListBox'}
      >
        <aside>
          {[...Array(product.groupPrecision)].map((v, i) => i).map(value => value + 1 > ((groupQueue.sumFillAmount ?? 0) + (select ? stateGroupProduct.selectNum : 0)) ?
              <StarBorderRoundedIcon
                  key={`clickStar${value}`}
                  fontSize={'large'}
                  // onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
                  style={{color: select ? '#fff' : '#000'}}
              /> : <StarRoundedIcon
                  key={`clickStar${value}`}
                  style={{color: '#FDD334'}}
                  fontSize={'large'}
                  // onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
              />)}
        </aside>
        <footer>{ll((groupQueue.sumFillAmount ?? 0) + (select ? stateGroupProduct.selectNum : 0) === product.groupPrecision ? '成团啦' : '未成团')}</footer>
      </GroupQueueListBox>
    })}
  </>
}
