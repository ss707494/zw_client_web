import React, {useEffect} from 'react'
import Router, {useRouter} from 'next/router'
import {useStoreModel} from '../../ModelAction/useStore'
import {Category, CategoryItemInput, Product} from '../../graphqlTypes/types'
import {KeyboardArrowRight} from '@material-ui/icons'
import {ButtonBase, LinearProgress} from '@material-ui/core'
import {fpMergePre} from '../../tools/utils'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import {doc} from '../../graphqlTypes/doc'
import {BScroller} from '../../components/BScroll/BScroller'
import {modelFactory} from '../../ModelAction/modelUtil'
import styled from 'styled-components'
import {grey} from '@material-ui/core/colors'
import {dealImgUrl} from '../../tools/img'
import {ProductItem} from '../../components/ProductItem/ProductItem'
import {ls} from '../../tools/dealKey'
import {NoData} from '../../components/NoData/NoData'

export const CategoryPageModel = modelFactory('CategoryPage', {
  productList: [] as Product[],
  categoryList: [] as Category[],
}, {
  getProductList: async (value: CategoryItemInput, option) => {
    const res = await option.query(doc.productsInCategory, {data: value})
    option.setData(fpMergePre({
      productList: res?.productsInCategory ?? [],
      categoryList: [
        ...res?.categoryList?.list ?? [],
      ],
    }))
  },

})

const Box = styled('div')`
  padding: 0 20px;
  > header {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
`

const CategoryItemStyle = styled(ButtonBase)`
  &&& {
    width: 100%;
    height: 60px;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    background: ${grey[700]};
    > img {
      height: 100%;
      width: 70%;
    }
    > span {
      flex: 1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

const categoryItemModel = modelFactory('categoryItemModel', {
  test: '',
}, {
  getLevel: async (value: CategoryItemInput, option) => {
    return await option.query(doc.categoryLevel, {
      data: value,
    })
  },

})


const ListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  
`

export const CategoryPage = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {state: stateCPM, actions: actionsCPM, getLoad} = useStoreModel(CategoryPageModel)
  const {actions: actionsCI} = useStoreModel(categoryItemModel)

  const CategoryItem = (v: Category) => {
    return <CategoryItemStyle
        key={`CategoryItem_${v.id}`}
        onClick={async () => {
          if ((await actionsCI.getLevel({
            id: v.id,
          }))?.categoryLevel === 3) {
            await Router.push('/productList/[id]', `/productList/${v.id}`)
          } else {
            await Router.push('/category/[id]', `/category/${v.id}`)
          }
        }}
    >
      <img
          src={dealImgUrl(v.imgUrl)}
          alt=''
      />
      <span>{v.name}<KeyboardArrowRight/></span>
    </CategoryItemStyle>
  }

  useEffect(() => {
    if (id) {
      actionsCPM.getProductList({id})
    }
  }, [id])

  return <div>
    <HeaderTitle
        title={''}
    />
    {!!getLoad(doc.productsInCategory) && <LinearProgress/>}
    <BScroller boxHeight={'calc(100vh - 60px)'}>
      <Box>
        {((stateCPM.categoryList.length === 0 && stateCPM.productList.length === 0) && <NoData/>) ||
        (
            <>
              {stateCPM.categoryList.map(value => CategoryItem(value))}
              <header>{ls('热门推荐')}</header>
              {(stateCPM.productList.length === 0) && <NoData/>}
              <ListBox>
                {stateCPM.productList.map(value => <ProductItem
                    key={`ProductItem_${value.id}`}
                    product={value}/>)}
              </ListBox>
            </>
        )
        }

      </Box>
    </BScroller>
  </div>
}
