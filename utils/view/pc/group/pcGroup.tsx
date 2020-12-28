import {MainBox} from '../pcComponents/mainBox/mainBox'
import {PcHeader} from '../pcComponents/header/header'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab} from '../home/components/headerTab'
import {Carousel} from '../home/components/carousel'
import {Space} from '../../../components/Box/Box'
import {LimitTime} from '../home/components/limitTime'
import {ThemeSelection} from '../home/components/themeSelection'
import {SalesRank} from '../home/components/salesRank'
import React, {useEffect} from 'react'
import {PcContentBox, TwoSide} from '../home/pcHome'
import {useStoreModel} from '../../../ModelAction/useStore'
import {homeTabsModel} from '../../m/home/components/Tabs/Tabs'
import {HomeType} from '../../m/home/appModule'

export const PcHomeGroup = () => {
  const {actions: actionsHomeTabs} = useStoreModel(homeTabsModel)
  useEffect(() => {
    actionsHomeTabs.setHomeType(HomeType.group)
  }, [actionsHomeTabs])

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
