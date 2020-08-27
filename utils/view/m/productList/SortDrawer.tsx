import React from 'react'
import {ButtonBase, ButtonBaseProps, Drawer, Radio} from '@material-ui/core'
import {useStoreModel} from '../../../ModelAction/useStore'
import {sortTypeEnum, sortTypeLabel, productListModel} from './[id]'
import styled from 'styled-components'
import { ls } from '../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {useRouter} from 'next/router'

const Contain = styled.div`
  width: 70vw;
  > header {
    padding: 30px 20px 20px;
    border-bottom: 1px solid ${grey[200]};
  }
  
`
const Item = styled(ButtonBase)<ButtonBaseProps>`
  &&& {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }
`

export const SortDrawer = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''

  const {actions: actionsProductList, state: stateProductList} = useStoreModel(productListModel)

  return <Drawer
      open={stateProductList.sortShow}
      onClose={actionsProductList.closeSort}
  >
    <Contain>
      <header>{ls('排序')}</header>
      <main>
        {Object.keys(sortTypeEnum).map(v => <Item
            key={`orderTypeEnum_${v}`}
            onClick={() => {
              actionsProductList.changeSort(v)
              actionsProductList.closeSort()
            }}
        >
          <header>
            {sortTypeLabel[v]}
          </header>
          <footer>
            <Radio checked={v === stateProductList.params.sortType} />
          </footer>
        </Item>)}
      </main>
    </Contain>
  </Drawer>
}
