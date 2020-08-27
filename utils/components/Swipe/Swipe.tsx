import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {dealImgUrl} from '../../tools/img'

const CusCarousel = ({dataList, onClickItem, height, renderItem}: { height?: string, dataList: any[], onClickItem?: (index: number, item: React.ReactNode) => void, renderItem?: (item: any) => React.ReactChild }) => (
    <Carousel
        autoPlay={true}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
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
