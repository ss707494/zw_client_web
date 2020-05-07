import {NextPage} from 'next'
import React, {useState} from 'react'
import {graphQLQuery} from '../../utils/client'
import {categoryList, getDataConfig, homeCarouselImgs} from '../../utils/graphqlTypes/doc'
import {Category, CategoryListInput, DataConfig, DataConfigItemInput} from '../../utils/graphqlTypes/types'
import {BorderedInputBase} from '../../utils/components/HeaderSearch/HeaderSearch'
import {grey} from '@material-ui/core/colors'
import {Button} from '@material-ui/core'
import CusCarousel from '../../utils/components/Swipe/Swipe'
import {HomeTabs} from '../../utils/components/home/Tabs/Tabs'
import {CategoryRootName, DictTypeEnum} from '../../utils/ss_common/enum'
import {BScroller} from '../../utils/components/BScroll/BScroller'

const Home: NextPage<{
  homeCarouselImgs: DataConfig,
  homeCategorySelection_listData: Category[]
}> = ({homeCarouselImgs, homeCategorySelection_listData}) => {
  const [num, setNum] = useState(1)

  return (
      <BScroller>
        <div className={'common_box'}>
          <header>
            <BorderedInputBase/>
          </header>
          <div className={'tip'}>
            <aside>热搜:</aside>
            {['薯条', '小龙虾'].map(value => <span key={`tip_${value}`}>{value}</span>)}
          </div>
          <div className={'cusCarousel'}>
            <CusCarousel
                dataList={homeCarouselImgs.value.list as []}
            />
          </div>
          <HomeTabs
              homeCategorySelection_listData={homeCategorySelection_listData}
          />
          <main>
            {num}
            <Button
                onClick={() => {
                  setNum(num + 1)
                }}
            >add</Button>
          </main>
          <main>
            {num}
            <Button
                onClick={() => {
                  setNum(num + 1)
                }}
            >add</Button>
          </main>
          <main>
            {num}
            <Button
                onClick={() => {
                  setNum(num + 1)
                }}
            >add</Button>
          </main>
          <main>
            {num}
            <Button
                onClick={() => {
                  setNum(num + 1)
                }}
            >add</Button>
          </main>
          <style jsx>{`
          .common_box {
            padding-top: 10px;
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
            max-height: 230px;
            border-radius: 10px;
            overflow: hidden;
          }
        `}</style>
        </div>
      </BScroller>
  )
}

export default Home

export const getStaticProps = async () => {
  const res2 = await graphQLQuery()(getDataConfig, {
    type: DictTypeEnum.HomeCarousel,
  } as DataConfigItemInput, {})
  const {__typename, ...rest} = res2?.data?.getDataConfig
  const homeCarouselDataComfig = await graphQLQuery()(homeCarouselImgs, {
    ...rest,
  } as DataConfigItemInput, {})

  const categoryRes = await graphQLQuery()(categoryList, {
    category: {
      parentCategory: {
        id: CategoryRootName,
      },
    },
  } as CategoryListInput)

  return {
    props: {
      homeCategorySelection_listData: categoryRes?.data?.categoryList?.list,
      ...homeCarouselDataComfig?.data,
    },
  }
}
