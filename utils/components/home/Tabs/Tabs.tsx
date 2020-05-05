import {Tab, Tabs} from '@material-ui/core'
import React from 'react'
import {AppModuleTypeEnum} from 'ss_common/enum'
import CategorySelection from '../CategorySelection/CategorySelection'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {fpMergePre} from '../../../tools/utils'
import {useStoreModel} from '../../../ModelAction/useStore'
import {ls} from '../../../tools/dealKey'


export const homeTabsModel = modelFactory('HomeTabs', {
  value: AppModuleTypeEnum.categorySelection,
}, {
  onChange: (value, option) => {
    option.setData(fpMergePre({
      value,
    }))
  },
})

export const HomeTabs = () => {
  const {state: homeTabsState, actions: homeTabsActions} = useStoreModel(homeTabsModel)

  return (
      <div>
        <Tabs
            variant={'fullWidth'}
            value={homeTabsState.value}
            onChange={(event, value) => homeTabsActions.onChange(value)}
        >
          <Tab
              value={AppModuleTypeEnum.categorySelection}
              label={ls('分类选择')}
          />
          <Tab value={AppModuleTypeEnum.limitTime}
               label={ls('限时选购')}
          />
        </Tabs>
        <main>
          {homeTabsState.value === AppModuleTypeEnum.categorySelection
          && <CategorySelection />}
        </main>
      </div>
  )
}

