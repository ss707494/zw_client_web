import {Tab, Tabs} from '@material-ui/core'
import React from 'react'
import CategorySelection from '../CategorySelection/CategorySelection'
import Router, {useRouter} from 'next/router'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {AppModuleTypeEnum} from '../../../../ss_common/enum'
import {ls} from '../../../../tools/dealKey'
import {PromotionFlashSale} from '../PromotionFlashSale/PromotionFlashSale'

export const homeTabsModel = modelFactory('HomeTabs', {
  appModuleConfig: {} as any,
}, {
  onChange: (value, option) => {
    // @ts-ignore
    Router.push(`/home/[appModule]`, `/home/${value}`, {shallow: true})
    // option.setData(fpMergePre({
    //   value,
    // }))
  },
})

export const HomeTabs = () => {
  const router = useRouter()
  const {state: homeTabsState, actions: homeTabsActions} = useStoreModel(homeTabsModel)

  return (
      <div
          style={{marginTop: '10px'}}
      >
        <Tabs
            variant={'fullWidth'}
            value={router.query.appModule}
            onChange={(event, value) => homeTabsActions.onChange(value)}
        >
          <Tab
              value={AppModuleTypeEnum.categorySelection}
              label={ls('分类选择')}
          />
          {[
            [AppModuleTypeEnum.limitTime, '限时选购'],
            [AppModuleTypeEnum.mayLike, '猜你喜欢'],
            [AppModuleTypeEnum.salesRank, '热销排行'],
            [AppModuleTypeEnum.themeSelection, '主题甄选'],
          ].filter(v => (homeTabsState?.appModuleConfig?.[v[0]])).map(v => <Tab
              key={`AppModuleTypeEnum_${v[0]}`}
              value={v[0]}
              label={ls(v[1])}
          />)}
        </Tabs>
        <main
            style={{marginTop: '10px'}}
        >
          {router.query.appModule === AppModuleTypeEnum.categorySelection
          && <CategorySelection/>}
          {router.query.appModule === AppModuleTypeEnum.limitTime
          && <PromotionFlashSale/>}
        </main>
        <style jsx>{`
          div :global(.MuiButtonBase-root) {
            padding: 0;
          }
        `}</style>
      </div>
  )
}

