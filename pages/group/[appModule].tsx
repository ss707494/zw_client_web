import React from 'react'
import {AppModuleTypeEnum} from '../../utils/ss_common/enum'
import {HomeAppModule, HomeType} from '../../utils/view/home/appModule'
import {init} from '../home/[appModule]'

export default HomeAppModule(HomeType.group)

export const getStaticPaths = () => {
  return {
    paths: [AppModuleTypeEnum.categorySelection, AppModuleTypeEnum.lineRanking, AppModuleTypeEnum.topRanking].map(v => ({
      params: {
        appModule: v,
      },
    })),
    fallback: true,
  }
}
export const getStaticProps = init
