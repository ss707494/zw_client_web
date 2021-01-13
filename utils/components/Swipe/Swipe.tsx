import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {dealImgUrl} from '../../tools/img'
import {DefaultTheme, styled} from '@material-ui/styles'
import {Props} from 'react-responsive-carousel/lib/ts/components/Carousel'
import {mpStyle} from '../../style/common'

type CarouselProps = Partial<{
  height?: string,
  dataList: any[],
  renderItem?: (item: any) => React.ReactChild,
  onClickItem?: (index: number, item: React.ReactNode) => void,
  showArrows?: boolean,
  showIndicators?: boolean,
  showThumbs?: boolean,
  isAct?: boolean,
} & Props>

const CarouselBox = styled(Carousel)<DefaultTheme, CarouselProps>({
  '& .slide img': {
    height: props => props.height,
  },
  '& .thumbs-wrapper': {
    margin: '30px 0',
  },
  '& .thumb': {
    border: 'none',
    padding: 0,
    '&.selected': {
      border: `1px solid ${mpStyle.black}`,
    },
    '&:hover': {
      border: `1px solid ${mpStyle.black}`,
    },
  },
})

const CusCarousel = (
    {
      dataList,
      onClickItem,
      height,
      renderItem,
      showArrows = false,
      showIndicators = true,
      showThumbs = false,
    }: CarouselProps) => {
  return (
      <CarouselBox
          isAct={true}
          height={height}
          autoPlay={true}
          showThumbs={showThumbs}
          showArrows={showArrows}
          showStatus={false}
          showIndicators={showIndicators}
          infiniteLoop={true}
          onClickItem={onClickItem}
      >
        {dataList?.map(renderItem ? (item) => renderItem(item)
            : (item) => (
                <div
                    key={`Carousel_${item.id}`}
                >
                  <img
                      src={dealImgUrl(item.imgUrl)}
                      alt=""/>
                </div>
            ))}
      </CarouselBox>
  )
}

export default CusCarousel
