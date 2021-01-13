import {Tab, Tabs} from '@material-ui/core'
import React from 'react'
import CategorySelection from '../CategorySelection/CategorySelection'
import Router, {useRouter} from 'next/router'
import {modelFactory} from '../../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {AppModuleTypeEnum, DictTypeEnum} from '../../../../../ss_common/enum'
import {ll} from '../../../../../tools/dealKey'
import {PromotionFlashSale} from '../PromotionFlashSale/PromotionFlashSale'
import {ThemeSelection} from '../ThemeSelection/ThemeSelection'
import {HomeType} from '../../appModule'
import {fpMergePre} from '../../../../../tools/utils'
import {getDataConfig} from '../../../../../graphqlTypes/doc'
import {DataConfigItemInput} from '../../../../../graphqlTypes/types'
import {SalesRank} from '../SalesRank/SalesRank'
import {UpdateShopCart} from '../../../../../components/ProductItem/UpdateShopCart'
import {isEmpty} from 'lodash'
import {LineRanking} from '../LineRanking/LineRanking'
import styled from 'styled-components'

export const HomeTabsModel = modelFactory('HomeTabs', {
  homeType: '',
  appModuleConfig: {} as any,
}, {
  setHomeType: (value: string, option) => {
    option.setData(fpMergePre({
      homeType: value,
    }))
  },
  onChange: ([name, type], option) => {
    // @ts-ignore
    Router.push(`/m/${type}/[appModule]`, `/m/${type}/${name}`, {shallow: true})
    // option.setData(fpMergePre({
    //   value,
    // }))
  },
  getData: async (value, option) => {
    const appModuleConfig = await option.query(getDataConfig, {
      data: {
        type: DictTypeEnum.AppModule,
      } as DataConfigItemInput,
    }, {})
    option.setData(fpMergePre({
      appModuleConfig: appModuleConfig?.getDataConfig?.value ?? {},
    }))
  },
})

const Box = styled.div`
  margin-top: 10px;
  &&& {
    .MuiButtonBase-root {
      padding: 0;
    }
  }
`

export const HomeTabs = ({homeType}: { homeType: string }) => {
  const router = useRouter()
  const {state: homeTabsState, actions: homeTabsActions} = useStoreModel(HomeTabsModel)

  return (
      <Box>
        {!isEmpty(homeTabsState?.appModuleConfig) && <Tabs
            variant={'fullWidth'}
            value={router.query.appModule ?? AppModuleTypeEnum.categorySelection}
            onChange={(event, value) => homeTabsActions.onChange([value, homeType])}
        >
          <Tab
              value={AppModuleTypeEnum.categorySelection}
              label={ll(homeType === HomeType.group ? '分类拼团' : '分类选择')}
          />
          {((homeType === HomeType.home && [
            [AppModuleTypeEnum.limitTime, '限时选购'],
            [AppModuleTypeEnum.salesRank, '热销排行'],
            [AppModuleTypeEnum.themeSelection, '主题甄选'],
            [AppModuleTypeEnum.mayLike, '猜你喜欢'],
          ]) || (homeType === HomeType.group && [
            [AppModuleTypeEnum.salesRank, '热门排行'],
            [AppModuleTypeEnum.lineRanking, '冲线排行'],
          ]) || []).filter(v => (homeTabsState?.appModuleConfig?.[v[0]])).map(v => <Tab
              key={`AppModuleTypeEnum_${v[0]}`}
              value={v[0]}
              label={ll(v[1])}
          />)}
        </Tabs>}
        <main
            style={{marginTop: '10px'}}
        >
          {router.query.appModule === AppModuleTypeEnum.categorySelection
          && <CategorySelection/>}
          {router.query.appModule === AppModuleTypeEnum.limitTime
          && <PromotionFlashSale/>}
          {router.query.appModule === AppModuleTypeEnum.themeSelection
          && <ThemeSelection/>}
          {router.query.appModule === AppModuleTypeEnum.salesRank
          && <SalesRank/>}
          {router.query.appModule === AppModuleTypeEnum.lineRanking
          && <LineRanking/>}
        </main>
        <UpdateShopCart/>
      </Box>
  )
}

