import {NextPage} from 'next'
import React from 'react'
import {graphQLQuery} from '../../utils/client'
import {categoryList, getDataConfig, homeCarouselImgs} from '../../utils/graphqlTypes/doc'
import {Category, CategoryListInput, DataConfig, DataConfigItemInput} from '../../utils/graphqlTypes/types'
import {BorderedInputBase} from '../../utils/components/HeaderSearch/HeaderSearch'
import {grey} from '@material-ui/core/colors'
import CusCarousel from '../../utils/components/Swipe/Swipe'
import {HomeTabs, homeTabsModel} from '../../utils/components/home/Tabs/Tabs'
import {CategoryRootName, DictTypeEnum} from '../../utils/ss_common/enum'
import {BScroller} from '../../utils/components/BScroll/BScroller'
import {homeCategorySelectionModel} from '../../utils/components/home/CategorySelection/CategorySelection'
import {initModel} from '../../utils/ModelAction/modelUtil'
import {FootBar} from '../../utils/components/FootBar/FootBar'

const Home: NextPage<{
  homeCarouselImgs: DataConfig,
  appModuleConfig: DataConfig,
  homeCategorySelection_listData: Category[]
}> = ({homeCarouselImgs, homeCategorySelection_listData, appModuleConfig}) => {

  initModel(homeTabsModel, {
    appModuleConfig: appModuleConfig?.value,
  })
  initModel(homeCategorySelectionModel, {
    listData: homeCategorySelection_listData,
  })

  return (
      <div>
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
            <div>
              <HomeTabs/>
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
            max-height: 230px;
            border-radius: 10px;
            overflow: hidden;
          }
          .footer {
            height: 200px;
          }
        `}</style>
        </BScroller>
        <FootBar />
      </div>
  )
}

export default Home

const init = async () => {
  const appModuleConfig = await graphQLQuery()(getDataConfig, {
    type: DictTypeEnum.AppModule,
  } as DataConfigItemInput, {})

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
      appModuleConfig: appModuleConfig?.data?.getDataConfig,
    },
  }
}

export const getServerSideProps = init
// export const getStaticProps = async () => {
//   return await init()
// }
