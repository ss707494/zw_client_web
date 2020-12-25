import React from 'react'
import styled from 'styled-components'
import {ll} from '../../../../tools/dealKey'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'
import {CategorySelection, CategorySelectionModel} from './categorySelection'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { Button } from '@material-ui/core'

export const HeaderTabModel = modelFactory('HeaderTabModel', {
  isCategory: false,
}, {
  switchIsCategory: async (value: boolean, option) => {
    option.setData(fpMergePre({
      isCategory: value,
    }))
  },
})

const Box = styled.div`
  display: flex;
`
const CategorySelectionBox = styled(CategorySelection)`
`
const CategoryBox = styled.div<{ isAct?: number }>`
  position: relative;
  &&& {
    ${mpStyle.fontType.xxl};
    .MuiButton-label {
      ${mpStyle.fontType.l};
      color: ${mpStyle.black};
      ${prop => prop.isAct ? `
        color: ${mpStyle.red};
      ` : ''};
    }
  }
  ${CategorySelectionBox} {
    position: absolute;
    background: white;
    top: 40px;
    width: 800px;
    height: 25vw;
    z-index: 9;
    box-shadow: ${mpStyle.shadow['1']};
  }
`
const PointBox = styled.a<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>`
  ${mpStyle.fontType.l};
  color: ${mpStyle.black};
  text-decoration: none;
  height: 43px;
  display: grid;
  align-items: center;
`
const spaceNum = 60

export const HeaderTab = () => {
  const {state: stateHeaderTabModel} = useStoreModel(HeaderTabModel)
  const {actions: actionsCategorySelectionModel, state: stateCategorySelectionModel} = useStoreModel(CategorySelectionModel)


  return <Box>
    <CategoryBox
        isAct={(stateHeaderTabModel.isCategory || stateCategorySelectionModel.isShow) ? 1 : 0}
    >
      <Button
          onClick={() => {
            actionsCategorySelectionModel.switchIsShow(true)
          }}
      >
        {ll('分类选择')}
        <KeyboardArrowDownIcon
            style={stateCategorySelectionModel.isShow ? {transform: 'rotate(180deg)'} : {}}
        />
      </Button>
      <CategorySelectionBox/>
    </CategoryBox>
    <Space w={spaceNum}/>
    {[
      ['限时抢购', 'LimitTime'],
      ['热门排行', 'SalesRank'],
      ['主题甄选', 'ThemeSelection'],
    ].map(v => <React.Fragment key={`PointBox${v[0]}`}>
      <PointBox
          href={`/pc/home#${v[1]}`}
      >
        {ll(v[0])}
      </PointBox>
      <Space w={spaceNum}/>
    </React.Fragment>)}
  </Box>
}
