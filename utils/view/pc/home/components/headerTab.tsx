import React from 'react'
import styled from 'styled-components'
import {ls} from '../../../../tools/dealKey'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'

const Box = styled.div`
  display: flex;
`
const CategoryBox = styled.div`
  ${mpStyle.fontType.xxl};
`
const PointBox = styled.div`
  ${mpStyle.fontType.xxl};
`
const spaceNum = 88

export const HeaderTab = () => {
  return <Box>
    <CategoryBox>
      {ls('分类选择')}
    </CategoryBox>
    <Space w={spaceNum}/>
    {[
      ['限时抢购'],
      ['热门排行'],
      ['品牌精选'],
      ['主题甄选'],
    ].map(v => <React.Fragment key={`PointBox${v[0]}`}>
      <PointBox>
        {ls(v[0])}
      </PointBox>
      <Space w={spaceNum}/>
    </React.Fragment>)}
  </Box>
}
