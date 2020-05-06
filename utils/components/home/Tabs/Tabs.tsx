import {Tab, Tabs} from '@material-ui/core'
import React from 'react'
import CategorySelection from '../CategorySelection/CategorySelection'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {fpMergePre} from '../../../tools/utils'
import {useStoreModel} from '../../../ModelAction/useStore'
import {ls} from '../../../tools/dealKey'
import {AppModuleTypeEnum} from '../../../ss_common/enum'
import {Category} from '../../../graphqlTypes/types'


export const homeTabsModel = modelFactory('HomeTabs', {
  value: AppModuleTypeEnum.categorySelection,
}, {
  onChange: (value, option) => {
    option.setData(fpMergePre({
      value,
    }))
  },
})

export const HomeTabs = ({homeCategorySelection_listData}: {homeCategorySelection_listData?: Category[]}) => {
  const {state: homeTabsState, actions: homeTabsActions} = useStoreModel(homeTabsModel)

  return (
      <div
          style={{marginTop: '10px'}}
      >
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
        <main
            style={{marginTop: '10px'}}
        >
          {homeTabsState.value === AppModuleTypeEnum.categorySelection
          && <CategorySelection
              homeCategorySelection_listData={homeCategorySelection_listData}
          />}
        </main>
      </div>
  )
}

