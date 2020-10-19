import React from 'react'
import styled from 'styled-components'
import {ls} from '../../../../tools/dealKey'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'
import {CategorySelection, CategorySelectionModel} from './categorySelection'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {fpMergePre} from '../../../../tools/utils'
import {useStoreModel} from '../../../../ModelAction/useStore'

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
  ${mpStyle.fontType.xxl};
  position: relative;
  > span {
    cursor: pointer;
    ${prop => prop.isAct ? `
      color: ${mpStyle.red};
    ` : ''};
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
  ${mpStyle.fontType.xxl};
  color: #222;
  text-decoration: none;
`
const spaceNum = 88

export const HeaderTab = () => {
  const {actions: actionsHeaderTabModel, state: stateHeaderTabModel} = useStoreModel(HeaderTabModel)
  const {actions: actionsCategorySelectionModel, state: stateCategorySelectionModel} = useStoreModel(CategorySelectionModel)

  return <Box>
    <CategoryBox
        isAct={stateHeaderTabModel.isCategory ? 1 : 0}
    >
      <span
          onClick={() => {
            actionsCategorySelectionModel.switchIsShow(true)
          }}
      >
        {ls('分类选择')}
      </span>
      <CategorySelectionBox/>
    </CategoryBox>
    <Space w={spaceNum}/>
    {[
      ['限时抢购', 'LimitTime'],
      ['热门排行', 'SalesRank'],
      ['主题甄选', 'ThemeSelection'],
    ].map(v => <React.Fragment key={`PointBox${v[0]}`}>
      <PointBox
          href={stateHeaderTabModel.isCategory ? `/pc/home#${v[1]}` : `#${v[1]}`}
      >
        {ls(v[0])}
      </PointBox>
      <Space w={spaceNum}/>
    </React.Fragment>)}
  </Box>
}
