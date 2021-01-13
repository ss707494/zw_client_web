import React, {useEffect} from 'react'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {homeCarouselModel} from '../../../m/home/appModule'
import CusCarousel from '../../../../components/Swipe/Swipe'
import {dealImgUrl} from '../../../../tools/img'
import {Space} from '../../../../components/Box/Box'
import {formatDate} from '../../../../tools/utils'
import styled from 'styled-components'
import {HomeTabsModel} from '../../../m/home/components/Tabs/Tabs'

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

export const Carousel = () => {
  const {actions: actionsHomeCarouselModel, state: stateHomeCarouselModel} = useStoreModel(homeCarouselModel)
  const {actions: actionsHomeTabs} = useStoreModel(HomeTabsModel)
  useEffect(() => {
    actionsHomeTabs.getData()
    actionsHomeCarouselModel.getHomeCarousel()
  }, [actionsHomeCarouselModel, actionsHomeTabs])

  return <div>
    {(() => {
      const filterList = stateHomeCarouselModel.homeCarouselImgs?.value?.list?.filter((v: any) => !v.isDisabled) ?? []
      return <CusCarousel
          showArrows={true}
          showIndicators={false}
          height={'400px'}
          dataList={filterList as []}
          onClickItem={(index) => {
            return
          }}
      />
    })()}
  </div>
}
