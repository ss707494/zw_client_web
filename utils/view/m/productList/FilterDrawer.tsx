import React from 'react'
import {ButtonBase, ButtonBaseProps, Drawer} from '@material-ui/core'
import {useStoreModel} from '../../../ModelAction/useStore'
import {productListModel} from './[id]'
import styled from 'styled-components'
import {ls} from '../../../tools/dealKey'
import {grey} from '@material-ui/core/colors'

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

export const FilterDrawer = () => {

  const {actions: actionsProductList, state: stateProductList} = useStoreModel(productListModel)

  return <Drawer
      open={stateProductList.filterShow}
      onClose={actionsProductList.closeFilter}
      anchor={'right'}
  >
    <Contain>
      <header>{ls('筛选')}</header>
      <main>
        {ls('暂无数据')}
      </main>
    </Contain>
  </Drawer>
}
