import React from 'react'
import {PcHeader} from '../pcComponents/header/header'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from './components/headerTab'
import styled from 'styled-components'
import {Space} from '../../../components/Box/Box'
import {LimitTime} from './components/limitTime'
import {SalesRank} from './components/salesRank'
import {Divider} from '@material-ui/core'
import {ThemeSelection} from './components/themeSelection'
import {mpStyle} from '../../../style/common'
import {Carousel} from './components/carousel'

const Box = styled.div`
  width: 1600px;
  margin: 0 auto;
`
const TwoSide = styled.div`
  display: flex;
  > section {
    flex-grow: 1;
  }
  > aside {
    flex-basis: 20vw;
  }
`

export const PcHome = () => {

  return <div>
    <PcHeader/>
    <Box>
      <TopAction/>
      <HeaderTab/>
      <Space h={16}/>
      <Carousel/>
      <Space h={24}/>
      <TwoSide>
        <section>
          <LimitTime/>
          <Space h={mpStyle.space.l}/>
          <ThemeSelection/>
        </section>
        <Space w={mpStyle.space.n}/>
        <Divider
            flexItem={true}
            orientation={'vertical'}/>
        <Space w={mpStyle.space.n}/>
        <aside>
          <SalesRank/>
        </aside>
      </TwoSide>
    </Box>
    <Space h={120}/>
  </div>
}
