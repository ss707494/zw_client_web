import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {dealImgUrl} from '../../tools/img'

const CusCarousel = ({dataList, onClickItem}: { dataList: any[], onClickItem?: (index: number, item: React.ReactNode) => void }) => (
    <Carousel
        autoPlay={true}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        infiniteLoop={true}
        onClickItem={onClickItem}
    >
      {dataList?.map((item) => (
          <div
              key={`Carousel_${item.id}`}
          >
            <img
                src={dealImgUrl(item.imgUrl)}
                alt=""/>
          </div>
      ))}
    </Carousel>
)

export default CusCarousel
