import React, {useEffect} from 'react'
import {homeTabsModel} from '../Tabs/Tabs'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {ssLog} from '../../../tools/global'
import {useStoreModel} from '../../../ModelAction/useStore'
import {AppModuleTypeEnum} from '../../../ss_common/enum'

export const homeCategorySelectionModel = modelFactory('HomeCategorySelection', {
  listData: [],
}, {
  getList: (value, option) => {
    ssLog(value)
    ssLog('getList')
  },

})

export const CategorySelection = () => {
  const {state: homeTabsState, actions: homeTabsActions} = useStoreModel(homeTabsModel)
  const {state: homeCategorySelectionState, actions: homeCategorySelectionActions} = useStoreModel(homeCategorySelectionModel)
  useEffect(() => {
    if (homeTabsState.value === AppModuleTypeEnum.categorySelection && homeCategorySelectionState.listData.length === 0) {
      homeCategorySelectionActions.getList(11)
    }
  }, [homeTabsState.value])

  return (
      <div>
        CategorySelection
      </div>
  )
}

export default CategorySelection
