import React from 'react'
import {PcHeader} from '../pcComponents/header/header'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from './components/headerTab'
import styled from 'styled-components'
import {Space} from '../../../components/Box/Box'
import {LimitTime} from './components/limitTime'
import {SalesRank} from './components/salesRank'
import {ThemeSelection} from './components/themeSelection'
import {Carousel} from './components/carousel'
import {MainBox} from '../pcComponents/mainBox/mainBox'

export const PcContentBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const TwoSide = styled.div`
  display: flex;
  > section {
    flex-grow: 1;
  }
  > aside {
    flex-basis: 210px;
  }
`

export const PcHome = () => {

  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Carousel/>
      <Space h={50}/>
      <TwoSide>
        <section>
          <LimitTime/>
          <ThemeSelection/>
        </section>
        <aside>
          <SalesRank/>
        </aside>
      </TwoSide>
    </PcContentBox>
    <Space h={120}/>
  </MainBox>
}
