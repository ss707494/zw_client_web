import {Tab, Tabs} from '@material-ui/core'
import React from 'react'
import {modelFactory} from '../../../../utils/ModelAction/modelUtil'
import {useStoreModel} from '../../../../utils/ModelAction/useStore'
import {AppModuleTypeEnum} from 'ss_common/enum'
import {ls} from '../../../../utils/tools/dealKey'
import {fpMergePre} from '../../../../utils/tools/utils'

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
  const {state, actions} = useStoreModel(homeTabsModel)

  return (
      <Tabs
          variant={'fullWidth'}
          value={state.value}
          onChange={(event, value) => actions.onChange(value)}
      >
        <Tab
            value={AppModuleTypeEnum.categorySelection}
            label={ls('分类选择')}
        />
        <Tab value={AppModuleTypeEnum.limitTime}
             label={ls('限时选购')}
        />
      </Tabs>
  )
}
