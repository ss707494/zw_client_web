import React from 'react'
import {serverQuery} from '../../utils/client'
import {categoryList, getDataConfig, homeCarouselImgs} from '../../utils/graphqlTypes/doc'
import {CategoryListInput, DataConfigItemInput} from '../../utils/graphqlTypes/types'
import {CategoryRootName, DictTypeEnum} from '../../utils/ss_common/enum'
import {HomeAppModule} from '../../utils/view/home/appModule'

export default HomeAppModule

const init = async () => {
  const appModuleConfig = await serverQuery(getDataConfig, {
    data: {
      type: DictTypeEnum.AppModule,
    } as DataConfigItemInput
  }, {})

  const res2 = await serverQuery(getDataConfig, {
    data: {
      type: DictTypeEnum.HomeCarousel,
    } as DataConfigItemInput
  }, {})
  const {__typename, ...rest} = res2?.getDataConfig
  const homeCarouselDataComfig = await serverQuery(homeCarouselImgs, {
    data: {
      ...rest,
    } as DataConfigItemInput
  }, {})

  const categoryRes = await serverQuery(categoryList, {
    data: {
      CategoryFields: {
        parentCategory: {
          id: CategoryRootName,
        },
      },
    } as CategoryListInput
  })

  return {
    props: {
      homeCategorySelection_listData: categoryRes?.categoryList?.list,
      ...homeCarouselDataComfig,
      appModuleConfig: appModuleConfig?.getDataConfig,
    },
  }
}

export const getStaticPaths = () => {
  return {
    paths: [{
      params: {
        appModule: 'categorySelection',
      },
    }],
    fallback: true,
  }
}
export const getStaticProps = init
