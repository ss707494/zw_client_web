import React, {useEffect} from 'react'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {homeCarouselModel} from '../../../m/home/appModule'
import CusCarousel from '../../../../components/Swipe/Swipe'
import {dealImgUrl} from '../../../../tools/img'
import {Space} from '../../../../components/Box/Box'
import {formatDate} from '../../../../tools/utils'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import {homeTabsModel} from '../../../m/home/components/Tabs/Tabs'

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
  const router = useRouter()
  const {actions: actionsHomeCarouselModel, state: stateHomeCarouselModel} = useStoreModel(homeCarouselModel)
  const {actions: actionsHomeTabs, state: stateHomeTabsModel} = useStoreModel(homeTabsModel)
  useEffect(() => {
    actionsHomeTabs.getData()
    actionsHomeCarouselModel.getHomeCarousel()
  }, [])

  return <div>
    {(() => {
      const filterList = stateHomeCarouselModel.homeCarouselImgs?.value?.list?.filter((v: any) => !v.isDisabled) ?? []
      return <CusCarousel
          showArrows={true}
          showIndicators={false}
          height={'25vw'}
          dataList={filterList as []}
          renderItem={item => <CusSwipeImg
              key={`Carousel_${item.id}`}
          >
            <img
                style={{height: '25vw'}}
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
            return
          }}
      />
    })()}
  </div>
}
