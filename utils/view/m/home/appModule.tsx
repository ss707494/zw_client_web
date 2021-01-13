/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {AppModuleTypeEnum, DictTypeEnum, RelatedObjTypeEnum} from '../../../ss_common/enum'
import {DataConfig, DataConfigItemInput} from '../../../graphqlTypes/types'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {HomeTabs, HomeTabsModel} from './components/Tabs/Tabs'
import CusCarousel from '../../../components/Swipe/Swipe'
import {HeaderSearch} from '../../../components/HeaderSearch/HeaderSearch'
import {FootBar} from '../../../components/FootBar/FootBar'
import {BScroller} from '../../../components/BScroll/BScroller'
import {useStoreModel} from '../../../ModelAction/useStore'
import {getDataConfig, homeCarouselImgs} from '../../../graphqlTypes/doc'
import {formatDate, fpMergePre} from '../../../tools/utils'
import styled from 'styled-components'
import {dealImgUrl} from '../../../tools/img'
import {Space} from '../../../components/Box/Box'

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
      } as DataConfigItemInput,
    }, {})
    const {__typename, ...rest} = res2?.getDataConfig || {}
    const homeCarouselDataComfig = await option.query(homeCarouselImgs, {
      data: {
        ...rest,
      } as DataConfigItemInput,
    }, {})
    option.setData(fpMergePre({
      homeCarouselImgs: homeCarouselDataComfig?.homeCarouselImgs,
    }))
  },
})

const CusSwipeImg = styled.div`
  > aside {
    background: rgb(164,164,164, .4);
    color: white;
    position: absolute;
    top: 4px;
    left: 4px;
    padding: 8px;
    border-radius: 4px;
    font-size: small;
    display: flex;
  }
`
const CommonBox = styled.div`
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
`

const CusCarouselBox = styled.div`
  border-radius: 10px;
  overflow: hidden;
`

export const HomeAppModule = (type?: string) => function () {
  const router = useRouter()
  useEffect(() => {
    if (router.query.appModule && !([AppModuleTypeEnum.limitTime, AppModuleTypeEnum.mayLike, AppModuleTypeEnum.salesRank, AppModuleTypeEnum.themeSelection, AppModuleTypeEnum.categorySelection, AppModuleTypeEnum.lineRanking, AppModuleTypeEnum.topRanking] as any[]).includes(router.query.appModule)
    ) {
      router.replace('/home/[appModule]', '/home/categorySelection', {})
    }
  })

  const {actions: actionsHomeCarouselModel, state: stateHomeCarouselModel} = useStoreModel(homeCarouselModel)
  const {actions: actionsHomeTabs, state: stateHomeTabsModel} = useStoreModel(HomeTabsModel)
  useEffect(() => {
    actionsHomeCarouselModel.getHomeCarousel()
    actionsHomeTabs.getData()
  }, [actionsHomeCarouselModel, actionsHomeTabs])
  useEffect(() => {
    actionsHomeTabs.setHomeType((type) ?? HomeType.home)
  }, [actionsHomeTabs])

  return (
      <div>
        <HeaderSearch homeType={type ?? HomeType.home}/>
        <BScroller boxHeight={'calc(100vh - 65px)'}>
          <CommonBox>
            <CusCarouselBox>
              {(() => {
                const filterList = stateHomeCarouselModel.homeCarouselImgs?.value?.list?.filter((v: any) => !v.isDisabled) ?? []
                return <CusCarousel
                    height={'160px'}
                    dataList={filterList as []}
                    renderItem={(item: any) => <CusSwipeImg
                        key={`Carousel_${item.id}`}
                    >
                      <img
                          style={{height: '160px'}}
                          src={dealImgUrl(item.imgUrl)}
                          alt=""/>
                      <aside>
                        <section>{item?.objData?.remark}</section>
                        <Space w={4}/>
                        {item?.objData?.effectiveDateStart &&
                        <main>[ {formatDate(item?.objData?.effectiveDateStart, 'YYYY/MM/dd')} - {formatDate(item?.objData?.effectiveDateEnd, 'YYYY/MM/dd')} ]</main>}
                        {item?.objData?.startTime &&
                        <main>[ {formatDate(item?.objData?.startTime, 'YYYY/MM/dd')} - {formatDate(item?.objData?.endTime, 'YYYY/MM/dd')} ]</main>}
                      </aside>
                    </CusSwipeImg>}
                    onClickItem={(index) => {
                      if (filterList?.[index]?.relatedObjType === RelatedObjTypeEnum.PromoCode) {
                        router.push('/m/card')
                      }
                      if (filterList?.[index]?.relatedObjType === RelatedObjTypeEnum.PromotionFlashSale
                          && stateHomeTabsModel?.appModuleConfig?.[AppModuleTypeEnum.limitTime]) {
                        router.push(`/m/home/[appModule]`, `/m/home/${AppModuleTypeEnum.limitTime}`)
                      }
                      if (filterList?.[index]?.relatedObjType === RelatedObjTypeEnum.PromotionThemeSelect
                          && stateHomeTabsModel?.appModuleConfig?.[AppModuleTypeEnum.themeSelection]) {
                        router.push(`/m/home/[appModule]`, `/m/home/${AppModuleTypeEnum.themeSelection}`)
                      }
                    }}
                />
              })()}
            </CusCarouselBox>
            <div>
              <HomeTabs homeType={type ?? HomeType.home}/>
            </div>
          </CommonBox>
        </BScroller>
        <FootBar/>
      </div>
  )
}
