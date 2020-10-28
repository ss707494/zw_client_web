import React from 'react'
import {MainBox} from '../../pcComponents/mainBox/mainBox'
import {PcHeader} from '../../pcComponents/header/header'
import {PcContentBox} from '../../home/pcHome'
import {TopAction} from '../../pcComponents/topAction/topAction'
import {HeaderTab} from '../../home/components/headerTab'
import {Space} from '../../../../components/Box/Box'
import {mpStyle, RedBox} from '../../../../style/common'
import styled from 'styled-components'

const TopTitle = styled(RedBox)`
  ${mpStyle.fontType.l};
`

export const PcMyInfo = () => {

  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Space h={mpStyle.space.n}/>
      <TopTitle>我的账户</TopTitle>
    </PcContentBox>
  </MainBox>
}
