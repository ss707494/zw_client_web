import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {dealImgUrl} from '../../tools/img'

const CusCarousel = ({dataList, onClickItem, height, renderItem, showArrows = false, showIndicators = true}: { height?: string, dataList: any[], onClickItem?: (index: number, item: React.ReactNode) => void, renderItem?: (item: any) => React.ReactChild, showArrows?: boolean, showIndicators?: boolean }) => (
    <Carousel
        autoPlay={true}
        showThumbs={false}
        showArrows={showArrows}
        showStatus={false}
        showIndicators={showIndicators}
        infiniteLoop={true}
        onClickItem={onClickItem}
    >
      {renderItem ? dataList?.map((item) => renderItem(item))
          : dataList?.map((item) => (
              <div
                  key={`Carousel_${item.id}`}
              >
                <img
                    style={{height: height}}
                    src={dealImgUrl(item.imgUrl)}
                    alt=""/>
              </div>
          ))}
    </Carousel>
)

export default CusCarousel
