import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {AppModuleTypeEnum, DictTypeEnum} from '../../ss_common/enum'
import {Category, DataConfig, DataConfigItemInput} from '../../graphqlTypes/types'
import {modelFactory} from '../../ModelAction/modelUtil'
import {HomeTabs, homeTabsModel} from './components/Tabs/Tabs'
import CusCarousel from '../../components/Swipe/Swipe'
import {HeaderSearch} from '../../components/HeaderSearch/HeaderSearch'
import {FootBar} from '../../components/FootBar/FootBar'
import {BScroller} from '../../components/BScroll/BScroller'
import {grey} from '@material-ui/core/colors'
import {useStoreModel} from '../../ModelAction/useStore'
import {getDataConfig, homeCarouselImgs} from '../../graphqlTypes/doc'
import {fpMergePre} from '../../tools/utils'

export const HomeType = {
  home: 'home',
  group: 'group',
}

export const homeCarouselModel = modelFactory('homeCarouselModel', {
  homeCarouselImgs: [] as DataConfig,
}, {
  getHomeCarousel: async (value, option) => {
    const res2 = await option.query(getDataConfig, {
      data: {
        type: DictTypeEnum.HomeCarousel,
      } as DataConfigItemInput
    }, {})
    const {__typename, ...rest} = res2?.getDataConfig
    const homeCarouselDataComfig = await option.query(homeCarouselImgs, {
      data: {
        ...rest,
      } as DataConfigItemInput
    }, {})
    option.setData(fpMergePre({
      homeCarouselImgs: homeCarouselDataComfig.homeCarouselImgs,
    }))
  },
})

export const HomeAppModule = (type?: string) => function ({
                                         homeCarouselImgs,
                                         homeCategorySelection_listData,
                                         appModuleConfig,
                                       }: {
  homeCarouselImgs: DataConfig,
  appModuleConfig: DataConfig,
  homeCategorySelection_listData: Category[]
}) {
  const router = useRouter()
  useEffect(() => {
    if (router.query.appModule && !([AppModuleTypeEnum.limitTime, AppModuleTypeEnum.mayLike, AppModuleTypeEnum.salesRank, AppModuleTypeEnum.themeSelection, AppModuleTypeEnum.categorySelection, AppModuleTypeEnum.lineRanking, AppModuleTypeEnum.topRanking] as any[]).includes(router.query.appModule)
    ) {
      router.replace('/home/[appModule]', '/home/categorySelection', {})
    }
  })

  const {actions: actionsHomeCarouselModel, state: stateHomeCarouselModel} = useStoreModel(homeCarouselModel)
  const {actions: actionsHomeTabs} = useStoreModel(homeTabsModel)
  useEffect(() => {
    actionsHomeCarouselModel.getHomeCarousel()
    actionsHomeTabs.getData()
  }, [])
  useEffect(() => {
    actionsHomeTabs.setHomeType((type) ?? HomeType.home)
  }, [type])

  return (
      <div>
        <HeaderSearch/>
        <BScroller>
          <div className={'common_box'}>
            {/*<header>*/}
            {/*  <BorderedInputBase/>*/}
            {/*</header>*/}
            <div className={'tip'}>
              <aside>热搜:</aside>
              {['薯条', '小龙虾'].map(value => <span key={`tip_${value}`}>{value}</span>)}
            </div>
            <div className={'cusCarousel'}>
              <CusCarousel
                  height={'160px'}
                  dataList={stateHomeCarouselModel.homeCarouselImgs?.value?.list as []}
              />
            </div>
            <div>
              <HomeTabs homeType={type ?? HomeType.home}/>
            </div>
          </div>
          <style jsx>{`
          .common_box {
            padding-top: 10px;
            padding-bottom: 120px;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-shrink: 1;
            overflow: auto;
            > * {
              margin-left: 10px;
              margin-right: 10px;
            }
          }
          .tip {
            display: flex;
            color: ${grey[600]};
            padding: 8px 0;
            > span {
              margin: 0 10px;
            }
          }
          .cusCarousel {
            border-radius: 10px;
            overflow: hidden;
          }
          .footer {
            height: 200px;
          }
        `}</style>
        </BScroller>
        <FootBar/>
      </div>
  )
}
