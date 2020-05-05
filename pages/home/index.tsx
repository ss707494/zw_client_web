import {NextPage} from 'next'
import React, {useState} from 'react'
import {graphQLQuery} from '../../utils/client'
import {getDataConfig, getUserListDoc, homeCarouselImgs} from '../../utils/graphqlTypes/doc'
import {DataConfig, DataConfigItemInput, UserPage} from '../../utils/graphqlTypes/types'
import {BorderedInputBase} from '../../utils/components/HeaderSearch/HeaderSearch'
import {grey} from '@material-ui/core/colors'
import {Button} from '@material-ui/core'
import CusCarousel from '../../utils/components/Swipe/Swipe'
import { HomeTabs } from '../../utils/components/home/Tabs/Tabs'
import { DictTypeEnum } from '../../utils/ss_common/enum'

const Home: NextPage<{ userList: UserPage, homeCarouselImgs: DataConfig }> = ({userList, homeCarouselImgs}) => {
  const [num, setNum] = useState(1)

  console.log(homeCarouselImgs)
  return (
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
        <HomeTabs />
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
            margin-top: 10px;
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
          }
        `}</style>
      </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const res = await graphQLQuery()(getUserListDoc, {}, {})
  const res2 = await graphQLQuery()(getDataConfig, {
    type: DictTypeEnum.HomeCarousel,
  } as DataConfigItemInput, {})
  const {__typename, ...rest} = res2?.data?.getDataConfig
  const homeCarouselDataComfig = await graphQLQuery()(homeCarouselImgs, {
    ...rest,
  } as DataConfigItemInput, {})

  return {
    props: {
      ...res?.data,
      ...homeCarouselDataComfig?.data,
    },
  }
}
